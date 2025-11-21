package funciones

import (
	"crypto/rand"
	"errors"
	"fmt"
	"io"
	"log"
	"math/big"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/glebarez/sqlite"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// --- Estructuras de datos ---

// Usuario para almacenamiento en SQLite usando GORM
type Usuario struct {
	// ID de tipo uint es el valor por defecto para claves primarias en GORM
	ID       uint   `gorm:"primaryKey"`
	Name     string `gorm:"not null"`
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
}

// VerificacionCorreo para almacenamiento en SQLite usando GORM
type VerificacionCorreo struct {
	ID       uint   `gorm:"primaryKey"`
	Email    string `gorm:"unique;not null"`
	Codigo   string `gorm:"not null"`
	ExpiraEn int64  `gorm:"not null"` // Timestamp Unix
}

// --- Variables Globales ---

var DB *gorm.DB

// --- Funciones de Inicialización y Utilidad ---

// InicializarDB conecta a la base de datos SQLite y realiza las migraciones.
func InicializarDB() error {
	var err error

	// Usamos un path relativo si es necesario, o el que provees
	DB, err = gorm.Open(sqlite.Open("/app/data/usuarios.db"), &gorm.Config{})

	if err != nil {
		return fmt.Errorf("fallo al conectar a la base de datos: %w", err)
	}

	// Realizar migraciones automáticas
	return DB.AutoMigrate(&Usuario{}, &VerificacionCorreo{})
}

// CargarApi carga una clave de un archivo .env.
func CargarApi(api string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Printf("Advertencia: No se pudo cargar el archivo .env: %v", err)
		// No se usa Fatalln para permitir que la aplicación continúe si no es crítica
	}

	clave_api := os.Getenv(api)

	return clave_api
}

// IsRecordNotFoundError ayuda a detectar si el error es de tipo "registro no encontrado".
func IsRecordNotFoundError(err error) bool {
	return errors.Is(err, gorm.ErrRecordNotFound)
}

// --- Funciones de Usuarios (Creación y Búsqueda) ---

// CrearUsuario registra un nuevo usuario en la base de datos después de hashear la contraseña.
func CrearUsuario(name, email, password string) error {

	if name == "" || email == "" || password == "" {
		return errors.New("todos los campos son obligatorios")
	}

	// Verificar que el email no exista
	var existe Usuario
	result := DB.Where("email = ?", email).First(&existe)

	if result.Error == nil {
		return errors.New("el correo ya está registrado")
	}

	if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return result.Error // Otro error de DB
	}

	// Hashear contraseña
	PassHashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("error al hashear contraseña: %w", err)
	}

	// Organizar estructura para guardar los datos
	NuevoUsuario := Usuario{
		Name:     name,
		Email:    email,
		Password: string(PassHashed),
	}

	// guardar en la base de datos
	if err := DB.Create(&NuevoUsuario).Error; err != nil {
		return fmt.Errorf("error al crear el usuario: %w", err)
	}

	return nil
}

// BuscarUsuarioEmail busca un usuario por su correo electrónico.
func BuscarUsuarioEmail(email string) (Usuario, error) {

	var user Usuario

	err := DB.Where("email = ?", email).First(&user).Error

	return user, err
}

// --- Funciones de Verificación de Correo ---

// generarCodigo crea un código numérico aleatorio de 6 dígitos.
func generarCodigo() string {
	// Generar un número aleatorio entre 0 y 999999
	n, err := rand.Int(rand.Reader, big.NewInt(1000000))
	if err != nil {
		// Fallback en caso de error
		return "000000"
	}
	// Formatear a 6 dígitos con ceros iniciales
	return fmt.Sprintf("%06d", n.Int64())
}

// CrearCodigoVerificacion genera y guarda un nuevo código para un email.
func CrearCodigoVerificacion(email string, duracion int) (string, error) {
	if email == "" {
		return "", errors.New("el email es obligatorio")
	}

	codigo := generarCodigo()
	// Calcular el tiempo de expiración en formato Unix
	expira := time.Now().Add(time.Duration(duracion) * time.Minute).Unix()

	var registro VerificacionCorreo
	result := DB.Where("email = ?", email).First(&registro)

	if result.Error == nil {
		// El registro existe, actualizar
		registro.Codigo = codigo
		registro.ExpiraEn = expira
		if err := DB.Save(&registro).Error; err != nil {
			return "", fmt.Errorf("error al actualizar el código: %w", err)
		}
	} else if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		// El registro no existe, crear uno nuevo
		registro = VerificacionCorreo{
			Email:    email,
			Codigo:   codigo,
			ExpiraEn: expira,
		}
		if err := DB.Create(&registro).Error; err != nil {
			return "", fmt.Errorf("error al crear el código: %w", err)
		}
	} else {
		// Otro error de DB
		return "", result.Error
	}

	return codigo, nil
}

// VerificarCodigo valida si el código para un email es correcto y no ha expirado.
func VerificarCodigo(email, codigo string) error {
	if email == "" || codigo == "" {
		return errors.New("email y código son obligatorios")
	}

	var registro VerificacionCorreo
	err := DB.Where("email = ?", email).First(&registro).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("no existe una solicitud de verificación para este correo")
		}
		return err
	}

	// Validar expiración
	if tiempoActual := time.Now().Unix(); tiempoActual > registro.ExpiraEn {
		return errors.New("el código ha expirado")
	}

	// Validar código
	if registro.Codigo != codigo {
		return errors.New("el código ingresado es incorrecto")
	}

	// Opcional: eliminar el código para evitar reuso (se hace en la versión transaccional)
	// DB.Delete(&registro)

	return nil
}

// RegistrarUsuarioVerificado realiza la verificación y la creación del usuario (sin transacción).
// Esta función es menos robusta que la versión transaccional.
func RegistrarUsuarioVerificado(name, email, password, codigo string) error {
	// Validar código primero
	if err := VerificarCodigo(email, codigo); err != nil {
		return err
	}

	// Crear usuario real
	return CrearUsuario(name, email, password)
}

// EnviarCodigoCorreo usa la API de Mailtrap (u otra compatible) para enviar el código.
func EnviarCodigoCorreo(email, codigo string) error {
	apiKey := CargarApi("api_mail")
	if apiKey == "" {
		return errors.New("no se encontró la API KEY para el servicio de correo (api_mail)")
	}

	url := "https://send.api.mailtrap.io/api/send"

	// Construcción del cuerpo JSON
	// Nota: He corregido la sintaxis de fmt.Sprintf para JSON, usando `\n` y escape de comillas si fuera necesario,
	// pero en este caso es más legible usar un `strings.NewReader` con un JSON bien formado.
	// La estructura original de tu payload era incorrecta y ha sido ajustada:

	payload := fmt.Sprintf(`{
		"from": {
			"email": "hello@innovaccounting.com.co",
			"name": "InnovAccounting"
		},
		"to": [{
			"email": "%s"
		}],
		"subject": "Código de verificación",
		"text": "Su código de verificación es: %s",
		"category": "Registro"
	}`, email, codigo)

	req, err := http.NewRequest("POST", url, strings.NewReader(payload))
	if err != nil {
		return fmt.Errorf("error al crear la solicitud HTTP: %w", err)
	}

	req.Header.Add("Authorization", "Bearer "+apiKey)
	req.Header.Add("Content-Type", "application/json")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error al realizar la solicitud HTTP: %w", err)
	}
	defer res.Body.Close()

	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		return fmt.Errorf("error al leer la respuesta del servidor: %w", err)
	}

	if res.StatusCode < 200 || res.StatusCode >= 300 {
		return fmt.Errorf("error enviando correo (HTTP %d): %s", res.StatusCode, string(resBody))
	}

	return nil
}

// RegistrarUsuarioVerificadoTransaccional realiza verificación del código y creación en una transacción.
func RegistrarUsuarioVerificadoTransaccional(name, email, password, codigo string) error {
	if email == "" || codigo == "" || name == "" || password == "" {
		return errors.New("todos los campos son obligatorios")
	}

	// Ejecutar todo en una transacción para evitar condiciones de carrera
	return DB.Transaction(func(tx *gorm.DB) error {
		var registro VerificacionCorreo
		// 1) Buscar el registro de verificación dentro de la transacción
		if err := tx.Where("email = ?", email).First(&registro).Error; err != nil {
			if IsRecordNotFoundError(err) {
				return errors.New("no existe una solicitud de verificación para este correo")
			}
			return err
		}

		// 2) Validar expiración
		if time.Now().Unix() > registro.ExpiraEn {
			return errors.New("el código ha expirado")
		}

		// 3) Validar código
		if registro.Codigo != codigo {
			return errors.New("el código ingresado es incorrecto")
		}

		// 4) Revisar que el usuario no exista (usando la misma tx)
		var u Usuario
		if err := tx.Where("email = ?", email).First(&u).Error; err == nil {
			// El usuario ya fue creado por otro proceso -> evitar duplicado
			return errors.New("el correo ya está registrado")
		} else if !IsRecordNotFoundError(err) {
			// Otro error al consultar
			return err
		}

		// 5) Hashear la contraseña
		passHashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}

		// 6) Crear el usuario (en la misma tx)
		nuevo := Usuario{
			Name:     name,
			Email:    email,
			Password: string(passHashed),
		}
		if err := tx.Create(&nuevo).Error; err != nil {
			return err
		}

		// 7) Eliminar el registro de verificación (evita reuso)
		if err := tx.Delete(&registro).Error; err != nil {
			return err
		}

		// Si todo OK, la transacción hace commit
		return nil
	})
}
