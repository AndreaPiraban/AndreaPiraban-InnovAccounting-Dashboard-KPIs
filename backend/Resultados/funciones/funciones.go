package funciones

import (
	"math/rand"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type RegistroContable struct {
	Año        int     `json:"año"`
	Activo     float64 `json:"activo"`
	Pasivo     float64 `json:"pasivo"`
	Patrimonio float64 `json:"patrimonio"`
}

// GenerarSerieContable genera una serie de 10 años con tendencia creciente
func GenerarSerieContable() []RegistroContable {
	rand.Seed(time.Now().UnixNano())

	anioInicio := time.Now().Year() - 9
	var serie []RegistroContable

	// Valores base iniciales (en millones de pesos)
	activoBase := 100_000.0
	pasivoBase := 60_000.0

	for i := 0; i < 10; i++ {
		año := anioInicio + i

		// Crecimiento anual aleatorio entre 3% y 8%
		crecimientoActivo := 1 + (rand.Float64()*(0.08-0.03) + 0.03)
		crecimientoPasivo := 1 + (rand.Float64()*(0.06-0.02) + 0.02)

		if i > 0 {
			activoBase *= crecimientoActivo
			pasivoBase *= crecimientoPasivo
		}

		// Patrimonio = Activo - Pasivo
		patrimonio := activoBase - pasivoBase

		serie = append(serie, RegistroContable{
			Año:        año,
			Activo:     activoBase,
			Pasivo:     pasivoBase,
			Patrimonio: patrimonio,
		})
	}

	return serie
}

// Lista global de rutas permitidas
var AllowedOrigins = []string{
	"http://localhost:3001", // Landing
	"http://localhost:3000", // Dashboard

	"http://4.154.231.178", // Ip publica dashboard
}

// Configuración global de CORS
func CorsMiddleware() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     AllowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	})
}
