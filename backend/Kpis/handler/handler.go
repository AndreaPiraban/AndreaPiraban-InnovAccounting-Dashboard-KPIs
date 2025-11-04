package handlers

import (
	"net/http"

	"github.com/Innovaccounting/kpis/funciones"

	"github.com/gin-gonic/gin"
)

// Estructura para recibir los datos desde el frontend
type DatosEntrada struct {
	ActivoCorriente   float64 `json:"activo_corriente"`
	PasivoCorriente   float64 `json:"pasivo_corriente"`
	Ventas            float64 `json:"ventas"`
	UtilidadNeta      float64 `json:"utilidad_neta"`
	ActivoTotal       float64 `json:"activo_total"`
	Patrimonio        float64 `json:"patrimonio"`
	Inventarios       float64 `json:"inventarios"`
	UtilidadOperativa float64 `json:"utilidad_operativa"`
	GastosFinancieros float64 `json:"gastos_financieros"`
	VentasT           float64 `json:"ventas_t"`
	VentasT1          float64 `json:"ventas_t1"`
	Empleados         float64 `json:"empleados"`
	Produccion        float64 `json:"produccion"`
}

// Estructura de salida (respuesta JSON)
type ResultadosKPI struct {
	RazonCorriente       float64 `json:"razon_corriente"`
	PruebaAcida          float64 `json:"prueba_acida"`
	ROA                  float64 `json:"roa"`
	ROE                  float64 `json:"roe"`
	MargenNeto           float64 `json:"margen_neto"`
	CrecimientoVentas    float64 `json:"crecimiento_ventas"`
	ProductividadLaboral float64 `json:"productividad_laboral"`
}

func CalcularKPIs(c *gin.Context) {
	var datos DatosEntrada
	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := ResultadosKPI{
		RazonCorriente:       funciones.RazonCorriente(datos.ActivoCorriente, datos.PasivoCorriente),
		PruebaAcida:          funciones.PruebaAcida(datos.ActivoCorriente, datos.Inventarios, datos.PasivoCorriente),
		ROA:                  funciones.ROA(datos.UtilidadNeta, datos.ActivoTotal),
		ROE:                  funciones.ROE(datos.UtilidadNeta, datos.Patrimonio),
		MargenNeto:           funciones.MargenNeto(datos.UtilidadNeta, datos.Ventas),
		CrecimientoVentas:    funciones.CrecimientoVentas(datos.VentasT, datos.VentasT1),
		ProductividadLaboral: funciones.ProductividadLaboral(datos.Produccion, datos.Empleados),
	}

	c.JSON(http.StatusOK, result)
}
