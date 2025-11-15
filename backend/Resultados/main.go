package main

import (
	"time"

	handler "github.com/Innovaccounting/Resultados/Handler"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()

	// Configuración CORS explícita
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:80", "http://192.168.1.7:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/serie-resultados", handler.SerieContableHandler)
	r.GET("/descargar-excel", handler.DescargarExcelHandler)
	r.Run(":8080")

}
