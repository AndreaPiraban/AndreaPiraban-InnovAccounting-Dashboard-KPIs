package funciones

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/glebarez/sqlite"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// ---------------------------------------------
// VARIABLES GLOBALES
// ---------------------------------------------

var DB *gorm.DB
var jwtSecret []byte

// ---------------------------------------------
// ESTRUCTURAS
// ---------------------------------------------

type Usuario struct {
	gorm.Model
	Name            string
	Email           string `gorm:"uniqueIndex"`
	Password        string
	LoginVerificado bool `gorm:"default:false"`
}

type VerificacionLogin struct {
	ID        uint   `gorm:"primaryKey"`
	Email     string `gorm:"uniqueIndex"`
	Codigo    string
	ExpiraEn  int64
	CreatedAt time.Time
}

// ---------------------------------------------
// CARGAR .ENV
// ---------------------------------------------

func CargarApi(api string) string {
	_ = godotenv.Load(".env")
	return os.Getenv(api)
}

func InicializarDB() error {
	var err error

	DB, err = gorm.Open(sqlite.Open("/app/data/usuarios.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	// NO hacer AutoMigrate porque ya tienes la BD existente
	// Pero sí migramos la tabla auxiliar
	DB.AutoMigrate(&VerificacionLogin{})

	jwtSecret = []byte(os.Getenv("JWT_SECRET"))

	return nil
}

// ---------------------------------------------
// LOGIN NORMAL
// ---------------------------------------------

func VerificarCredenciales(email, password string) (*Usuario, error) {
	var u Usuario

	result := DB.Where("email = ?", email).First(&u)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, errors.New("correo no registrado")
	}
	if result.Error != nil {
		return nil, result.Error
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		return nil, errors.New("contraseña incorrecta")
	}

	return &u, nil
}

// ---------------------------------------------
// GENERAR CÓDIGO DE 6 DÍGITOS
// ---------------------------------------------

func GenerarCodigo() string {
	return fmt.Sprintf("%06d", time.Now().UnixNano()%1000000)
}

// ---------------------------------------------
// ENVIAR CORREO
// ---------------------------------------------

func EnviarCodigoCorreo(email, codigo string) error {
	apiKey := CargarApi("api_mail")
	if apiKey == "" {
		return errors.New("no se encontró la API KEY para Mailtrap (api_mail)")
	}

	url := "https://send.api.mailtrap.io/api/send"

	payload := fmt.Sprintf(`{
		"from": {
			"email": "hello@innovaccounting.com.co",
			"name": "InnovAccounting"
		},
		"to": [{
			"email": "%s"
		}],
		"subject": "Código de verificación de inicio de sesión",
		"text": "Tu código de acceso es: %s",
		"category": "Login"
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

	respBody, _ := io.ReadAll(res.Body)

	if res.StatusCode < 200 || res.StatusCode >= 300 {
		return fmt.Errorf("error enviando correo (%d): %s", res.StatusCode, string(respBody))
	}

	return nil
}

// ---------------------------------------------
// CREAR O REEMPLAZAR CÓDIGO
// ---------------------------------------------

func CrearCodigoLogin(email string) (string, error) {
	codigo := GenerarCodigo()
	expira := time.Now().Add(24 * time.Hour).Unix()

	registro := VerificacionLogin{
		Email:    email,
		Codigo:   codigo,
		ExpiraEn: expira,
	}

	// upsert
	err := DB.Where("email = ?", email).Delete(&VerificacionLogin{}).Error
	if err != nil {
		return "", err
	}

	if err := DB.Create(&registro).Error; err != nil {
		return "", err
	}

	return codigo, nil
}

// ---------------------------------------------
// VALIDAR CÓDIGO
// ---------------------------------------------

func VerificarCodigoLogin(email, codigo string) error {
	var reg VerificacionLogin

	result := DB.Where("email = ?", email).First(&reg)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return errors.New("no existe código activo para este correo")
	}
	if result.Error != nil {
		return result.Error
	}

	if time.Now().Unix() > reg.ExpiraEn {
		return errors.New("el código ha expirado")
	}

	if reg.Codigo != codigo {
		return errors.New("código incorrecto")
	}

	// Borrar luego de validarlo
	DB.Delete(&reg)

	// Marcar al usuario como verificado para futuros logins
	DB.Model(&Usuario{}).Where("email = ?", email).Update("login_verificado", true)

	return nil
}

// ---------------------------------------------
// CREACIÓN DE JWT
// ---------------------------------------------

func CrearJWT(email string) (string, error) {
	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(72 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
