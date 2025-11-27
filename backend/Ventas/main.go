package main

import (
	"github.com/Innovaccounting/ventas/funciones"
	"github.com/Innovaccounting/ventas/handler"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Configuración CORS explícita
	r.Use(funciones.CorsMiddleware())

	r.GET("/Obtener_ventas", handler.ObtenerVentas)

	r.Run(":8080")
}
