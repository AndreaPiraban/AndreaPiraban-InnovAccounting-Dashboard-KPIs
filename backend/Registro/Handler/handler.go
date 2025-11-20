package Handler

import (
	"net/http"

	"github.com/Innovaccounting/Registro/funciones"
	"github.com/gin-gonic/gin"
)

// Registra las rutas relacionadas
func RutasAuth(r *gin.Engine) {
	r.POST("/registro/precheck", Precheck) // valida y envía código si el email no existe
	r.POST("/registro/crear", CrearCuenta) // valida código y crea usuario (transaccional)
}

// Precheck: recibe name,email,password.
// - Verifica que el email NO exista.
// - Si está libre, crea/actualiza código y lo envía por correo.
func Precheck(c *gin.Context) {
	var datos struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	// 1) Revisar si el usuario ya existe
	if _, err := funciones.BuscarUsuarioEmail(datos.Email); err == nil {
		// usuario ya existe
		c.JSON(http.StatusBadRequest, gin.H{"error": "El correo ya está registrado"})
		return
	} else {
		// si hubo otro error distinto a record not found, devolverlo
		if !funciones.IsRecordNotFoundError(err) {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// 2) Crear o actualizar código de verificación (por ejemplo 10 minutos)
	codigo, err := funciones.CrearCodigoVerificacion(datos.Email, 10)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo generar el código: " + err.Error()})
		return
	}

	// 3) Enviar correo con el código
	if err := funciones.EnviarCodigoCorreo(datos.Email, codigo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error enviando el correo: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Código enviado. Complete la verificación para crear la cuenta."})
}

// CrearCuenta: recibe name,email,password,codigo.
// Hace validación del código y creación del usuario en una transacción para evitar race conditions.
func CrearCuenta(c *gin.Context) {
	var datos struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Codigo   string `json:"codigo"`
	}

	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	// Llamar a una función que haga la verificación + creación de forma atómica
	if err := funciones.RegistrarUsuarioVerificadoTransaccional(datos.Name, datos.Email, datos.Password, datos.Codigo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Cuenta creada correctamente"})
}
