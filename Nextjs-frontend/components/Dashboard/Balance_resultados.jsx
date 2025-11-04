"use client";
import React from "react";

export default function ResumenContable() {
  const datos = [
    { nombre: "Activo", valor: 1.55019e11, color: "bg-green-100 text-green-800" },
    { nombre: "Pasivo", valor: -7.94688e10, color: "bg-red-100 text-red-800" },
    { nombre: "Patrimonio", valor: 7.55501e10, color: "bg-blue-100 text-blue-800" },
  ];

  // Dividir los valores entre 1,000 millones → mostrar en miles de millones (COP)
  const datosEnMillones = datos.map((d) => ({
    ...d,
    valor: parseFloat((d.valor / 1_000_000_000).toFixed(2)),
  }));

  const totalActivo = datosEnMillones.find((d) => d.nombre === "Activo")?.valor || 0;
  const totalPasivo = datosEnMillones.find((d) => d.nombre === "Pasivo")?.valor || 0;
  const totalPatrimonio = datosEnMillones.find((d) => d.nombre === "Patrimonio")?.valor || 0;

  const balanceCuadrado =
    Math.abs(totalActivo - (Math.abs(totalPasivo) + Math.abs(totalPatrimonio))) < 1;

  const descargarExcel = async () => {
    const res = await fetch("http://localhost:8004/descargar-excel");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "serie_contable.xlsx";
    a.click();
    a.remove();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Resumen Contable</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {datosEnMillones.map((item) => (
          <div
            key={item.nombre}
            className={`p-4 rounded-2xl shadow ${item.color}`}
          >
            <h3 className="text-lg font-semibold">{item.nombre}</h3>
            <p className="text-2xl font-bold">
              {item.valor.toLocaleString("es-CO", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
              M
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-gray-600 italic">
          Las cifras se presentan en miles de millones de pesos (COP).
        </p>
        <p className="mt-2 font-medium">
          {balanceCuadrado
            ? "El balance está cuadrado (Activo = Pasivo + Patrimonio)"
            : "El balance no está cuadrado"}
        </p>

        {/* Botón de descarga */}
        <div className="flex justify-center">
  <div className="flex flex-col items-center space-y-4 mt-6">
  <button
    onClick={descargarExcel}
    className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105"
  >
    Descargar Datos en Excel
  </button>

  <button
    onClick={descargarExcel}
    className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105"
  >
    Descargar Informe Contable
  </button>
</div>

</div>

      </div>
    </div>
  );
}
