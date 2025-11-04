"use client";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { useEffect } from "react";

const HeatmapVentas = () => {
  const puntosVentas = [
// Centro histórico y alrededores (zona de alta concentración)
[4.710989, -74.072092, 0.95],
[4.713, -74.07, 0.93],
[4.716, -74.075, 0.9],
[4.709, -74.065, 0.88],
[4.711, -74.068, 0.92],
[4.714, -74.073, 0.89],
[4.712, -74.069, 0.9],
[4.708, -74.067, 0.87],
[4.715, -74.071, 0.91],
[4.717, -74.076, 0.85],

// Zona norte - Usaquén, Cedritos, Chicó (afluencia media-alta)
[4.74, -74.03, 0.75],
[4.745, -74.035, 0.7],
[4.75, -74.05, 0.68],
[4.755, -74.045, 0.72],
[4.76, -74.04, 0.7],
[4.762, -74.035, 0.69],
[4.77, -74.06, 0.65],
[4.765, -74.055, 0.67],
[4.75, -74.07, 0.6],
[4.748, -74.065, 0.58],
[4.742, -74.032, 0.73],
[4.752, -74.04, 0.7],
[4.758, -74.05, 0.68],

// Zona occidente - Engativá, Fontibón (zona logística y consumo familiar)
[4.68, -74.12, 0.78],
[4.682, -74.11, 0.76],
[4.69, -74.13, 0.73],
[4.7, -74.11, 0.7],
[4.71, -74.14, 0.68],
[4.72, -74.15, 0.66],
[4.715, -74.13, 0.69],
[4.705, -74.125, 0.7],
[4.695, -74.135, 0.74],
[4.685, -74.12, 0.75],
[4.69, -74.115, 0.73],
[4.7, -74.145, 0.65],
[4.72, -74.155, 0.6],

// Zona sur - Bosa, Kennedy, Ciudad Bolívar (gran volumen, menor ticket promedio)
[4.61, -74.15, 0.8],
[4.62, -74.14, 0.77],
[4.63, -74.17, 0.75],
[4.64, -74.1, 0.72],
[4.65, -74.12, 0.68],
[4.6, -74.16, 0.6],
[4.605, -74.155, 0.58],
[4.62, -74.13, 0.7],
[4.625, -74.135, 0.69],
[4.64, -74.11, 0.71],
[4.63, -74.18, 0.64],
[4.615, -74.165, 0.67],

// Zona oriental - Chapinero, Teusaquillo, Parque Nacional (zonas de consumo diverso)
[4.64, -74.07, 0.83],
[4.65, -74.06, 0.85],
[4.66, -74.05, 0.88],
[4.67, -74.04, 0.8],
[4.665, -74.045, 0.82],
[4.655, -74.055, 0.83],
[4.645, -74.065, 0.81],
[4.652, -74.058, 0.84],
[4.66, -74.052, 0.86],
[4.67, -74.042, 0.78],
[4.662, -74.05, 0.82],

// Zona industrial - Puente Aranda, Montevideo, Ricaurte
[4.62, -74.11, 0.9],
[4.63, -74.105, 0.88],
[4.625, -74.1, 0.86],
[4.635, -74.115, 0.87],
[4.64, -74.12, 0.85],
[4.638, -74.108, 0.83],
[4.63, -74.095, 0.84],
[4.627, -74.11, 0.82],
[4.622, -74.1, 0.8],
[4.62, -74.09, 0.78],

// Periferia norte (afluencia baja, zonas residenciales)
[4.8, -74.05, 0.45],
[4.81, -74.055, 0.42],
[4.82, -74.06, 0.4],
[4.825, -74.065, 0.38],
[4.83, -74.07, 0.36],
[4.835, -74.075, 0.35],
[4.84, -74.08, 0.33],
[4.845, -74.085, 0.32],
[4.85, -74.09, 0.3],

// Periferia sur (muy baja intensidad)
[4.58, -74.12, 0.28],
[4.57, -74.13, 0.25],
[4.565, -74.125, 0.22],
[4.56, -74.13, 0.2],
[4.555, -74.12, 0.18],
[4.55, -74.11, 0.15],
[4.545, -74.115, 0.13],
[4.54, -74.12, 0.1],
[4.535, -74.125, 0.08],

// Periferia occidental (Mosquera, Funza)
[4.68, -74.21, 0.55],
[4.69, -74.22, 0.52],
[4.7, -74.23, 0.5],
[4.705, -74.225, 0.48],
[4.71, -74.24, 0.46],
[4.715, -74.23, 0.44],
[4.72, -74.22, 0.42],
[4.725, -74.215, 0.4],
[4.73, -74.21, 0.38],
[4.735, -74.205, 0.35],

  ];

  function HeatLayer() {
    const map = useMap();
    useEffect(() => {
      const heat = L.heatLayer(puntosVentas, {
        radius: 25,
        blur: 20,
        maxZoom: 17,
        gradient: { 0.02: "blue", 0.1: "lime", 0.2: "red" },
      }).addTo(map);
      return () => map.removeLayer(heat);
    }, [map]);
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Mapa de Calor de Ventas - Bogotá
      </h2>
      <MapContainer
        center={[4.710989, -74.072092]}
        zoom={11}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />
        <HeatLayer />
      </MapContainer>
    </div>
  );
};

export default HeatmapVentas;
