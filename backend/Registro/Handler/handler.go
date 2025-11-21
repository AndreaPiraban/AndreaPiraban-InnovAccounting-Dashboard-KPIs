// handler.go
package Handler

import (
	"net/http"

	"github.com/Innovaccounting/Registro/funciones"
	"github.com/gin-gonic/gin"
)

// --- Definición de Rutas ---

// Registra las rutas relacionadas con la autenticación en el motor Gin.
func RutasAuth(r *gin.Engine) {
	// POST /registro/precheck: valida que el email esté libre y envía el código de verificación.
	r.POST("/registro/precheck", Precheck)

	// POST /registro/crear: valida el código y crea el usuario en una transacción.
	r.POST("/registro/crear", CrearCuenta)
}

// --- Handlers de Rutas ---

// Precheck: Handler para /registro/precheck.
// Recibe name, email, password.
// 1. Verifica que el email NO exista.
// 2. Si está libre, crea/actualiza el registro de verificación y envía el código por correo.
func Precheck(c *gin.Context) {
	var datos struct {
		Name     string `json:"name"` // Corregido: añadido backtick y etiqueta "json"
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	// 1) Bind JSON y validación básica
	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos en la solicitud"})
		return

	}

	// Verificar que los campos no esten vacios
	if datos.Name == "" || datos.Email == "" || datos.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Todos los campos (name, email, password) son obligatorios."})
		return
	}

	// 2) Revisar si el usuario ya existe
	if _, err := funciones.BuscarUsuarioEmail(datos.Email); err == nil {
		// Usuario ya existe
		c.JSON(http.StatusBadRequest, gin.H{"error": "El correo ya está registrado"})
		return
	} else {
		// Si hubo otro error distinto a "record not found", devolverlo
		if !funciones.IsRecordNotFoundError(err) {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error interno al buscar usuario: " + err.Error()})
			return
		}
	}

	// 3) Crear o actualizar código de verificación (válido por 10 minutos)
	// Se recomienda usar un valor en las variables de entorno para la duración
	const DuracionMinutos = 10
	codigo, err := funciones.CrearCodigoVerificacion(datos.Email, DuracionMinutos)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo generar el código: " + err.Error()})
		return
	}

	// 4) Enviar correo con el código
	if err := funciones.EnviarCodigoCorreo(datos.Email, codigo); err != nil {
		// Loguear el error, pero dar un mensaje genérico al usuario si es posible
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error enviando el correo. Revise su dirección: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Código enviado. Complete la verificación para crear la cuenta."})
}

// CrearCuenta: Handler para /registro/crear.
// Recibe name, email, password, codigo.
// Utiliza la función transaccional para validar el código y crear el usuario de forma atómica.
func CrearCuenta(c *gin.Context) {
	var datos struct {
		Name     string `json:"name"` // Corregido: añadido backtick y etiqueta "json"
		Email    string `json:"email"`
		Password string `json:"password"`
		Codigo   string `json:"codigo"`
	}

	// 1) Bind JSON y validación básica
	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos en la solicitud"})
		return
	}

	// 2) Llamar a la función transaccional:
	// - Verifica el código
	// - Crea el usuario
	// - Elimina el código de verificación
	if err := funciones.RegistrarUsuarioVerificadoTransaccional(datos.Name, datos.Email, datos.Password, datos.Codigo); err != nil {
		// Los errores de esta función ya están diseñados para ser informativos (código expirado, incorrecto, usuario existente)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Cuenta creada correctamente"})
}
