package main

import (
	"log"
	"time"

	"github.com/Innovaccounting/auth/funciones"
	"github.com/Innovaccounting/auth/handler"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// Inicializar base de datos existente usuarios.db
	if err := funciones.InicializarDB(); err != nil {
		log.Fatalf("Error inicializando la base de datos: %v", err)
	}

	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:80", "http://192.168.1.7:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Registrar rutas de autenticación
	handler.RutasAuth(r)

	// Ejecutar en puerto 8005 (como usas en el frontend)
	r.Run(":8080")
}
