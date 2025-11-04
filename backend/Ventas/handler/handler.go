package handler

import (
	"net/http"

	"github.com/Innovaccounting/ventas/funciones"
	"github.com/gin-gonic/gin"
)

func ObtenerVentas(c *gin.Context) {
	ventas, err := funciones.LeerExcel("Ventas.xlsx")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	resp := funciones.CalcularTotales(ventas)
	c.JSON(http.StatusOK, resp)
}
