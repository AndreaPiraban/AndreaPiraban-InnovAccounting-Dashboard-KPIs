"use client";
import React from "react";

// Componente: BlurredPdfCard
// Props:
// - pdfUrl: URL del PDF (por defecto /informe.pdf)
// - label: texto del botón (por defecto "Descargar informe")
// - height: altura del visor (por defecto "600px")

export default function BlurredPdfCard({
  pdfUrl = "/informe.pdf",
  label = "Descargar informe",
  height = "600px",
}) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative rounded-2xl shadow-lg overflow-hidden" style={{ height }}>
        {/* Iframe con el PDF (se aplica blur con la clase Tailwind) */}
        <iframe
          src={pdfUrl}
          title="Informe PDF"
          className="w-full h-full object-cover filter blur-sm scale-100"
          style={{ border: "0" }}
        />

        {/* Capa semi-transparente encima del PDF para atenuar aún más */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Botón centrado (pointer-events auto para poder clicar) */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-lg font-semibold shadow-2xl
                       bg-white/95 dark:bg-gray-900/90 text-gray-900 dark:text-white
                       hover:scale-105 transform transition"
          >
            {/* Icono simple (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-5 h-5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <span>{label}</span>
          </a>
        </div>

        {/* Pequeña nota accesible para lectores de pantalla */}
        <span className="sr-only">Visor del informe. Botón para descargar el PDF.</span>
      </div>

      {/* Alternativa para navegadores que no renderizan iframe correctamente */}
      <div className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
        Si el visor no carga, <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="underline">abre o descarga el informe</a>.
      </div>
    </div>
  );
}
