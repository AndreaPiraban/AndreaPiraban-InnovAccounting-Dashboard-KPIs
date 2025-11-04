package funciones

import (
	"strconv"

	"github.com/xuri/excelize/v2"
)

type Venta struct {
	Dia                  int     `json:"dia"`
	MesActual            float64 `json:"mes_actual"`
	MesAnterior          float64 `json:"mes_anterior"`
	DiferenciaAbsoluta   float64 `json:"diferencia_absoluta"`
	DiferenciaPorcentual float64 `json:"diferencia_porcentual"`
}

type VentasResponse struct {
	TotalMesActual   float64 `json:"total_mes_actual"`
	TotalMesAnterior float64 `json:"total_mes_anterior"`
	Ventas           []Venta `json:"ventas"`
}

// LeerExcel abre el archivo y devuelve un slice de Ventas
func LeerExcel(path string) ([]Venta, error) {
	f, err := excelize.OpenFile(path)
	if err != nil {
		return nil, err
	}

	rows, err := f.GetRows("Hoja1")
	if err != nil {
		return nil, err
	}

	var ventas []Venta
	for i, row := range rows {
		if i == 0 {
			continue // saltar encabezados
		}
		if len(row) < 5 {
			continue
		}

		dia, _ := strconv.Atoi(row[0])
		mesActual, _ := strconv.ParseFloat(row[1], 64)
		mesAnterior, _ := strconv.ParseFloat(row[2], 64)
		diffAbs, _ := strconv.ParseFloat(row[3], 64)
		diffPct, _ := strconv.ParseFloat(row[4], 64)

		venta := Venta{
			Dia:                  dia,
			MesActual:            mesActual,
			MesAnterior:          mesAnterior,
			DiferenciaAbsoluta:   diffAbs,
			DiferenciaPorcentual: diffPct,
		}
		ventas = append(ventas, venta)
	}

	return ventas, nil
}

// CalcularTotales calcula los totales de MesActual y MesAnterior
func CalcularTotales(ventas []Venta) VentasResponse {
	var totalMesActual, totalMesAnterior float64
	for _, v := range ventas {
		totalMesActual += v.MesActual
		totalMesAnterior += v.MesAnterior
	}

	return VentasResponse{
		TotalMesActual:   totalMesActual,
		TotalMesAnterior: totalMesAnterior,
		Ventas:           ventas,
	}
}
