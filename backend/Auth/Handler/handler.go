package handler

import (
	"net/http"

	"github.com/Innovaccounting/auth/funciones"
	"github.com/gin-gonic/gin"
)

func RutasAuth(r *gin.Engine) {
	r.POST("/signin", Signin)
}

func Signin(c *gin.Context) {
	var datos struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	if err := funciones.VerificarCredenciales(datos.Email, datos.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Credenciales correctas, acceso concedido"})
}
