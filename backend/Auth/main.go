package main

import (
	"log"
	"time"

	handler "github.com/Innovaccounting/auth/Handler"
	"github.com/Innovaccounting/auth/funciones"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	//apimail := funciones.CargarApi("api_mail")

	// Inicializar DB compartida
	if err := funciones.InicializarDB(); err != nil {
		log.Fatalf("Error inicializando la base de datos: %v", err)
	}

	r := gin.Default()

	// Configuración CORS para permitir frontend Next.js
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Registrar rutas de autenticación
	handler.RutasAuth(r)

	// Levantar servidor
	log.Println("Servidor Auth escuchando en :8080")
	r.Run(":8080")
}
