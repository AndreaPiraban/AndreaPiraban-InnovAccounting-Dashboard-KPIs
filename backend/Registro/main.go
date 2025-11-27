package main

// Importar paquetes necesarios

import (
	"log"

	"github.com/Innovaccounting/Registro/Handler"
	"github.com/Innovaccounting/Registro/funciones"
	"github.com/gin-gonic/gin"
)

func main() {

	// inicializar la base de datos
	if err := funciones.InicializarDB(); err != nil {
		log.Fatalf("Error inicializando la base de datos: %v", err)
	}

	r := gin.Default()

	// Configuración CORS explícita
	r.Use(funciones.CorsMiddleware())

	Handler.RutasAuth(r)

	r.Run(":8080")
}
