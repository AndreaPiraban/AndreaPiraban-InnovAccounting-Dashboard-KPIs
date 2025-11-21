package handler

import (
	"net/http"

	"github.com/Innovaccounting/auth/funciones"
	"github.com/gin-gonic/gin"
)

func RutasAuth(r *gin.Engine) {
	r.POST("/signin", Signin)
	r.POST("/verificar-codigo", VerificarCodigo)
}

// ---------------------------------------------
// PRIMER PASO: EMAIL + PASSWORD
// ---------------------------------------------

func Signin(c *gin.Context) {
	var datos struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	user, err := funciones.VerificarCredenciales(datos.Email, datos.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// Si ya está verificado → login normal
	if user.LoginVerificado {
		jwt, _ := funciones.CrearJWT(user.Email)
		c.JSON(http.StatusOK, gin.H{
			"message": "Login exitoso",
			"jwt":     jwt,
		})
		return
	}

	// Generar código
	codigo, err := funciones.CrearCodigoLogin(user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generando código"})
		return
	}

	// Enviar email
	funciones.EnviarCodigoCorreo(user.Email, codigo)

	c.JSON(http.StatusOK, gin.H{
		"message":         "Se requiere verificación de código",
		"requiere_codigo": true,
	})
}

// ---------------------------------------------
// SEGUNDO PASO: VERIFICAR CÓDIGO
// ---------------------------------------------

func VerificarCodigo(c *gin.Context) {
	var datos struct {
		Email  string `json:"email"`
		Codigo string `json:"codigo"`
	}

	if err := c.BindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	err := funciones.VerificarCodigoLogin(datos.Email, datos.Codigo)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	jwt, _ := funciones.CrearJWT(datos.Email)

	c.JSON(http.StatusOK, gin.H{
		"message": "Código verificado",
		"jwt":     jwt,
	})
}
