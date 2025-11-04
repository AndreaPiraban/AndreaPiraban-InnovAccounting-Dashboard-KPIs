async function cargarKPIs() {
  const response = await fetch("http://localhost:8080/Calcular-kpis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      activo_corriente: 50000,
      pasivo_corriente: 25000,
      ventas: 120000,
      utilidad_neta: 15000,
      activo_total: 80000,
      patrimonio: 50000,
      inventarios: 10000,
      utilidad_operativa: 20000,
      gastos_financieros: 4000,
      ventas_t: 120000,
      ventas_t1: 100000,
      empleados: 20,
      produccion: 80000
    })
  });

  const data = await response.json();

  document.getElementById("razon-corriente").textContent = data.razon_corriente.toFixed(2);
  document.getElementById("margen-neto").textContent = data.margen_neto.toFixed(2) + " %";
  document.getElementById("roa").textContent = data.roa.toFixed(2) + " %";
}

cargarKPIs();
