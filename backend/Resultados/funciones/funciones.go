package funciones

import (
	"math/rand"
	"time"
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
