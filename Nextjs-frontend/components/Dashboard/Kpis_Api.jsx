"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart,
  PieChart,
  DollarSign,
  Briefcase,
  Users,
} from "lucide-react";

export default function KpiStats() {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    async function fetchKpis() {
      try {
        const response = await fetch("http://localhost:8002/Calcular-kpis", {
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
            produccion: 80000,
          }),
        });
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const data = await response.json();
        setKpis(data);
      } catch (error) {
        console.error("Error al obtener KPIs:", error);
      }
    }

    fetchKpis();
  }, []);

  if (!kpis)
    return <p className="text-gray-500 dark:text-gray-400">Cargando indicadores...</p>;

  const kpiData = [
    {
      name: "Razón Corriente",
      value: kpis.razon_corriente.toFixed(2),
      icon: Activity,
      change: kpis.razon_corriente - 2, // Ejemplo de variación simulada
    },
    {
      name: "Prueba Ácida",
      value: kpis.prueba_acida.toFixed(2),
      icon: PieChart,
      change: kpis.prueba_acida - 1.5,
    },
    {
      name: "ROA",
      value: kpis.roa.toFixed(2) + "%",
      icon: BarChart,
      change: kpis.roa - 10,
    },
    {
      name: "ROE",
      value: kpis.roe.toFixed(2) + "%",
      icon: DollarSign,
      change: kpis.roe - 15,
    },
    {
      name: "Margen Neto",
      value: kpis.margen_neto.toFixed(2) + "%",
      icon: Briefcase,
      change: kpis.margen_neto - 12,
    },
    {
      name: "Crecimiento de Ventas",
      value: kpis.crecimiento_ventas.toFixed(2) + "%",
      icon: TrendingUp,
      change: kpis.crecimiento_ventas,
    },
    {
      name: "Productividad Laboral",
      value: kpis.productividad_laboral.toFixed(0),
      icon: Users,
      change: kpis.productividad_laboral - 4000,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        const positive = kpi.change >= 0;
        const TrendIcon = positive ? TrendingUp : TrendingDown;
        const trendColor = positive
          ? "text-green-500"
          : "text-red-500";

        return (
          <Card
            key={index}
            className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
          >
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {kpi.name}
              </CardTitle>
              <Icon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            </CardHeader>

          <CardContent>
  <div className="flex flex-col items-center justify-center text-center">
    <p className="text-lg font-semibold text-gray-900 dark:text-white">
      {kpi.value}
    </p>
    <div className={`flex items-center text-sm ${trendColor} mt-1`}>
      <TrendIcon className="w-4 h-4 mr-1" />
      {Math.abs(kpi.change).toFixed(1)}%
    </div>
  </div>
  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
    vs mes anterior
  </p>
</CardContent>

          </Card>
        );
      })}
    </div>
  );
}
