package funciones

// --- Indicadores Financieros ---
func RazonCorriente(activoCorriente, pasivoCorriente float64) float64 {
	return activoCorriente / pasivoCorriente
}

func PruebaAcida(activoCorriente, inventarios, pasivoCorriente float64) float64 {
	return (activoCorriente - inventarios) / pasivoCorriente
}

func CapitalTrabajo(activoCorriente, pasivoCorriente float64) float64 {
	return activoCorriente - pasivoCorriente
}

func EndeudamientoTotal(pasivoTotal, activoTotal float64) float64 {
	return (pasivoTotal / activoTotal) * 100
}

func CoberturaIntereses(utilidadOperativa, gastosFinancieros float64) float64 {
	return utilidadOperativa / gastosFinancieros
}

func MargenBruto(utilidadBruta, ventas float64) float64 {
	return (utilidadBruta / ventas) * 100
}

func MargenOperativo(utilidadOperativa, ventas float64) float64 {
	return (utilidadOperativa / ventas) * 100
}

func MargenNeto(utilidadNeta, ventas float64) float64 {
	return (utilidadNeta / ventas) * 100
}

func ROA(utilidadNeta, activoTotal float64) float64 {
	return (utilidadNeta / activoTotal) * 100
}

func ROE(utilidadNeta, patrimonio float64) float64 {
	return (utilidadNeta / patrimonio) * 100
}

func RotacionActivos(ventasNetas, activoTotal float64) float64 {
	return ventasNetas / activoTotal
}

func CoberturaFlujoOperativo(flujoOperativo, pasivoCorriente float64) float64 {
	return flujoOperativo / pasivoCorriente
}

func CicloConversionEfectivo(diasInv, diasCartera, diasProveedores float64) float64 {
	return diasInv + diasCartera - diasProveedores
}

func CrecimientoVentas(ventasT, ventasT1 float64) float64 {
	return ((ventasT - ventasT1) / ventasT1) * 100
}

func CrecimientoUtilidadNeta(utilidadT, utilidadT1 float64) float64 {
	return ((utilidadT - utilidadT1) / utilidadT1) * 100
}

func EVA(roa, wacc, activos float64) float64 {
	return (roa - wacc) * activos
}

// --- Indicadores Operativos ---
func ProductividadLaboral(produccion, empleados float64) float64 {
	return produccion / empleados
}

func EficienciaMaquinaria(horasEfectivas, horasDisponibles float64) float64 {
	return (horasEfectivas / horasDisponibles) * 100
}

func IndiceDesperdicio(desperdicio, produccion float64) float64 {
	return (desperdicio / produccion) * 100
}

func CumplimientoEntregas(pedidosATiempo, totales float64) float64 {
	return (pedidosATiempo / totales) * 100
}

func CostoLogisticoSobreVentas(transporte, almacenamiento, ventas float64) float64 {
	return ((transporte + almacenamiento) / ventas) * 100
}

func RoturaStock(faltantes, referencias float64) float64 {
	return (faltantes / referencias) * 100
}

func CoberturaInventario(inventarioFinal, costoVentasDiario float64) float64 {
	return inventarioFinal / costoVentasDiario
}

func TasaReclamosResueltos(reclamosResueltos, totales float64) float64 {
	return (reclamosResueltos / totales) * 100
}

func IndiceDevoluciones(productosDevueltos, ventas float64) float64 {
	return (productosDevueltos / ventas) * 100
}

// --- Indicadores de Talento Humano ---
func RotacionPersonal(salidas, empleados float64) float64 {
	return (salidas / empleados) * 100
}

func AbsentismoLaboral(horasAusentes, horasLaborables float64) float64 {
	return (horasAusentes / horasLaborables) * 100
}

func ProductividadPorEmpleado(ingresos, empleados float64) float64 {
	return ingresos / empleados
}

// --- Indicadores de Gestión ---
func CumplimientoPresupuestal(gastoReal, presupuesto float64) float64 {
	return (gastoReal / presupuesto) * 100
}

func CumplimientoMetas(metasCumplidas, planeadas float64) float64 {
	return (metasCumplidas / planeadas) * 100
}

func TiempoPromedioRespuesta(horasPromedio, solicitudes float64) float64 {
	return horasPromedio / solicitudes
}

func HallazgosCorregidos(correctivos, hallazgos float64) float64 {
	return (correctivos / hallazgos) * 100
}

func ProcesosCumplimiento(procesosCumplidos, totales float64) float64 {
	return (procesosCumplidos / totales) * 100
}

func CumplimientoPlanEstrategico(objetivosAlcanzados, establecidos float64) float64 {
	return (objetivosAlcanzados / establecidos) * 100
}

func HuellaCarbono(tonCO2e float64) float64 {
	return tonCO2e
}

func CumplimientoTributario(declaracionesEnTiempo, totales float64) float64 {
	return (declaracionesEnTiempo / totales) * 100
}

func RiesgoResidual(riesgoResidual, riesgoInicial float64) float64 {
	return (riesgoResidual / riesgoInicial) * 100
}

func RetencionClientes(clientesRecurrentes, totales float64) float64 {
	return (clientesRecurrentes / totales) * 100
}

func ProcesosDigitalizados(digitalizados, totales float64) float64 {
	return (digitalizados / totales) * 100
}

func ROIMarketing(beneficio, inversion float64) float64 {
	return ((beneficio - inversion) / inversion) * 100
}
