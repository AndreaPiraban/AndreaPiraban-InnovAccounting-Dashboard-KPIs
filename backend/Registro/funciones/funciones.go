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

type Usuario struct {
	gorm.Model

	Name     string `gorm:"not null"`
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"`
}

var DB *gorm.DB

func InicializarDB() error {
	var err error

	DB, err = gorm.Open(sqlite.Open("/app/data/usuarios.db"), &gorm.Config{})

	if err != nil {
		return err
	}

	// devolver la base de datos abierta
	return DB.AutoMigrate(&Usuario{}, &VerificacionCorreo{})
}

func CrearUsuario(name, email, password string) error {

	if name == "" || email == "" || password == "" {
		return errors.New("todos los campos son obligatorios")
	}

	// Verificar que el email no exista

	var existe Usuario

	// Consultar si el usuario existe
	result := DB.Where("email = ?", email).First(&existe)

	// 1. Verificar Si hay un registro encontrado

	if result.Error == nil {
		return errors.New("el correo ya está registrado")
	}

	// 2. verificar Si es un error de registro ya encontrado
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		// El usuario no existe continua el codigo
	} else if result.Error != nil {
		return result.Error
	}

	// hashear contraseña

	PassHashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	// Organizar estructura para guardar los datos
	NuevoUsuario := Usuario{
		Name:     name,
		Email:    email,
		Password: string(PassHashed),
	}

	// guardar en la base de datos

	if err := DB.Create(&NuevoUsuario).Error; err != nil {
		return err
	}

	return nil

}

// función para buscar email

func BuscarUsuarioEmail(email string) (Usuario, error) {

	var user Usuario

	err := DB.Where("email = ?", email).First(&user).Error

	return user, err

}

// Cargar api

func CargarApi(api string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error cargando el archivo .env: %v", err)
	}

	clave_api := os.Getenv(api)

	return clave_api
}

// Autenticar que el correo sea valido con el Correo enviado

type VerificacionCorreo struct {
	gorm.Model
	Email    string `gorm:"uniqueIndex;not null"`
	Codigo   string `gorm:"not null"`
	ExpiraEn int64  `gorm:"not null"`
}

func generarCodigo() string {
	n, err := rand.Int(rand.Reader, big.NewInt(999999))
	if err != nil {
		return "000000"
	}
	return fmt.Sprintf("%06d", n.Int64())
}

func CrearCodigoVerificacion(email string, duracion int) (string, error) {
	if email == "" {
		return "", errors.New("el email es obligatorio")
	}

	codigo := generarCodigo()
	expira := time.Now().Add(time.Duration(duracion) * time.Minute).Unix()

	var registro VerificacionCorreo
	result := DB.Where("email = ?", email).First(&registro)

	if result.Error == nil {
		registro.Codigo = codigo
		registro.ExpiraEn = expira
		if err := DB.Save(&registro).Error; err != nil {
			return "", err
		}
	} else if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		registro = VerificacionCorreo{
			Email:    email,
			Codigo:   codigo,
			ExpiraEn: expira,
		}
		if err := DB.Create(&registro).Error; err != nil {
			return "", err
		}
	} else {
		return "", result.Error
	}

	return codigo, nil
}

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

	if tiempoActual := time.Now().Unix(); tiempoActual > registro.ExpiraEn {
		return errors.New("el código ha expirado")
	}

	if registro.Codigo != codigo {
		return errors.New("el código ingresado es incorrecto")
	}

	// eliminar el código para evitar reuso
	DB.Delete(&registro)

	return nil
}

func RegistrarUsuarioVerificado(name, email, password, codigo string) error {
	// Validar código primero
	if err := VerificarCodigo(email, codigo); err != nil {
		return err
	}

	// Crear usuario real
	return CrearUsuario(name, email, password)
}

func EnviarCodigoCorreo(email, codigo string) error {
	apiKey := CargarApi("api_mail")
	if apiKey == "" {
		return errors.New("no se encontró la API KEY para Mailtrap (api_mail)")
	}

	url := "https://send.api.mailtrap.io/api/send"

	// Construcción del cuerpo JSON según la plantilla de Mailtrap
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
		return err
	}

	req.Header.Add("Authorization", "Bearer "+apiKey)
	req.Header.Add("Content-Type", "application/json")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		return err
	}

	if res.StatusCode < 200 || res.StatusCode >= 300 {
		return fmt.Errorf("error enviando correo (%d): %s", res.StatusCode, string(resBody))
	}

	return nil
}

// IsRecordNotFoundError ayuda a detectar not found
func IsRecordNotFoundError(err error) bool {
	return errors.Is(err, gorm.ErrRecordNotFound)
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
			// el usuario ya fue creado por otro proceso -> evitar duplicado
			return errors.New("el correo ya está registrado")
		} else if !IsRecordNotFoundError(err) {
			// otro error al consultar
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
