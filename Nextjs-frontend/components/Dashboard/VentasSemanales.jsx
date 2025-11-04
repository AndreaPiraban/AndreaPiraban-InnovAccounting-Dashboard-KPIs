'use client';
import Mainchart from '@/components/Dashboard/Grafico_ventas'
import SerieContable from "@/components/Dashboard/SerieContable";
import dynamic from "next/dynamic"

const MapaCalor = dynamic(() => import("@/components/Dashboard/MapaCalor"),{
  ssr: false, // Para no renderizar del lado del servidor 

})

export default function VentasHistoricas() {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800 space-y-8">
      <Mainchart />
      <SerieContable />
      <MapaCalor />
    </div>
  );
}

