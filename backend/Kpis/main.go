package main

import (
	"github.com/gin-gonic/gin"

	"github.com/Innovaccounting/kpis/funciones"
	handlers "github.com/Innovaccounting/kpis/handler"
)

func main() {
	r := gin.Default()

	// Configuración CORS explícita
	r.Use(funciones.CorsMiddleware())

	r.POST("/Calcular-kpis", handlers.CalcularKPIs)

	r.Run(":8080")
}
