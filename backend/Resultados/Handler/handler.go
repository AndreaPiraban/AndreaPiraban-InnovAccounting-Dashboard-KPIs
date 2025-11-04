package handler

import (
	"fmt"
	"net/http"

	"github.com/Innovaccounting/Resultados/funciones"
	"github.com/xuri/excelize/v2"

	"github.com/gin-gonic/gin"
)

// SerieContableHandler responde con la serie contable en formato JSON
func SerieContableHandler(c *gin.Context) {
	serie := funciones.GenerarSerieContable()
	c.JSON(http.StatusOK, gin.H{
		"mensaje": "Serie contable generada exitosamente",
		"data":    serie,
	})
}

// DescargarExcelHandler genera y descarga la serie contable en un archivo Excel
func DescargarExcelHandler(c *gin.Context) {
	// Obtener la misma serie contable
	serie := funciones.GenerarSerieContable()

	// Crear nuevo archivo Excel
	f := excelize.NewFile()
	sheet := "SerieContable"
	f.SetSheetName("Sheet1", sheet)

	// Encabezados
	headers := []string{"Año", "Activo (millones)", "Pasivo (millones)", "Patrimonio (millones)"}
	for i, h := range headers {
		col := string(rune('A' + i))
		f.SetCellValue(sheet, col+"1", h)
	}

	// Escribir datos fila por fila
	for i, r := range serie {
		row := i + 2
		f.SetCellValue(sheet, "A"+itoa(row), r.Año)
		f.SetCellValue(sheet, "B"+itoa(row), r.Activo)
		f.SetCellValue(sheet, "C"+itoa(row), r.Pasivo)
		f.SetCellValue(sheet, "D"+itoa(row), r.Patrimonio)
	}

	// Establecer encabezados HTTP
	c.Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	c.Header("Content-Disposition", "attachment; filename=serie_contable.xlsx")
	c.Header("Content-Transfer-Encoding", "binary")

	// Enviar el archivo al cliente
	if err := f.Write(c.Writer); err != nil {
		c.String(http.StatusInternalServerError, "Error al generar el archivo Excel")
	}
}

// itoa convierte un int en string (sin importar strconv)
func itoa(i int) string {
	return fmt.Sprintf("%d", i)
}
