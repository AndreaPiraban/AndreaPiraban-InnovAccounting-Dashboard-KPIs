package main

// Importar paquetes necesarios

import (
	"log"
	"time"

	"github.com/Innovaccounting/Registro/Handler"
	"github.com/Innovaccounting/Registro/funciones"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// inicializar la base de datos
	if err := funciones.InicializarDB(); err != nil {
		log.Fatalf("Error inicializando la base de datos: %v", err)
	}

	r := gin.Default()

	// Configuración CORS explícita
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:80", "http://48.195.192.189"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	Handler.RutasAuth(r)

	r.Run(":8005")
}
