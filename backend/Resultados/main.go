package main

import (
	handler "github.com/Innovaccounting/Resultados/Handler"
	"github.com/Innovaccounting/Resultados/funciones"
	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()

	// Configuración CORS explícita
	r.Use(funciones.CorsMiddleware())

	r.GET("/serie-resultados", handler.SerieContableHandler)
	r.GET("/descargar-excel", handler.DescargarExcelHandler)
	r.Run(":8080")

}
