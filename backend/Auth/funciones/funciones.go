package funciones

import (
	"errors"
	"log"
	"os"

	"github.com/glebarez/sqlite"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Cargar api

func CargarApi(api string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error cargando el archivo .env: %v", err)
	}

	clave_api := os.Getenv(api)

	return clave_api
}

// Iniciarlizar Base de datos

var DB *gorm.DB

func InicializarDB() error {
	var err error

	// Abrir base de datos

	DB, err = gorm.Open(sqlite.Open("/app/data/usuarios.db"), &gorm.Config{})

	if err != nil {
		return err
	}

	return nil
}

// Verificar credenciales

type Usuario struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string
}

func VerificarCredenciales(email, password string) error {
	var User Usuario

	// Buscar correo
	result := DB.Where("email = ?", email).First(&User)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return errors.New("correo no registrado")
	}

	if result.Error != nil {
		return result.Error

	}

	// comparar el hashed

	err := bcrypt.CompareHashAndPassword([]byte(User.Password), []byte(password))

	if err != nil {
		return errors.New("contraseña incorrecta")
	}

	return nil
}
