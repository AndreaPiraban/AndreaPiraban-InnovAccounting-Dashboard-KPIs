package main

import (
	"log"

	"github.com/Innovaccounting/auth/funciones"
	"github.com/Innovaccounting/auth/handler"

	"github.com/gin-gonic/gin"
	// cors
)

func main() {

	// Inicializar base de datos existente usuarios.db
	if err := funciones.InicializarDB(); err != nil {
		log.Fatalf("Error inicializando la base de datos: %v", err)
	}

	r := gin.Default()

	// CORS
	r.Use(funciones.CorsMiddleware())

	// Registrar rutas de autenticación
	handler.RutasAuth(r)

	// Ejecutar en puerto 8005 (como usas en el frontend)
	r.Run(":8080")
}
