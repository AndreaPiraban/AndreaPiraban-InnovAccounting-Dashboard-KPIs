"use client";

import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function KpiInsights({ kpis }) {
  if (!kpis) return null;

  const insights = [
    {
      name: "Razón Corriente",
      value: kpis.razon_corriente,
      message:
        kpis.razon_corriente >= 1.5
          ? "Buena liquidez. La empresa puede cubrir sus deudas de corto plazo."
          : "Advertencia: posible falta de liquidez a corto plazo.",
      icon: kpis.razon_corriente >= 1.5 ? CheckCircle : AlertTriangle,
      type: kpis.razon_corriente >= 1.5 ? "success" : "warning",
    },
    {
      name: "Prueba Ácida",
      value: kpis.prueba_acida,
      message:
        kpis.prueba_acida >= 1
          ? "Liquidez sólida sin depender de inventarios."
          : "Atención: podría haber problemas de liquidez sin inventarios.",
      icon: kpis.prueba_acida >= 1 ? CheckCircle : AlertTriangle,
      type: kpis.prueba_acida >= 1 ? "success" : "warning",
    },
    {
      name: "ROA",
      value: kpis.roa,
      message:
        kpis.roa > 10
          ? "Excelente uso de los activos para generar utilidades."
          : "Margen de rentabilidad bajo. Podría optimizarse el uso de activos.",
      icon: kpis.roa > 10 ? CheckCircle : Info,
      type: kpis.roa > 10 ? "success" : "info",
    },
    {
      name: "ROE",
      value: kpis.roe,
      message:
        kpis.roe > 15
          ? "Buen retorno sobre el patrimonio de los socios."
          : "Rentabilidad del patrimonio moderada o baja.",
      icon: kpis.roe > 15 ? CheckCircle : Info,
      type: kpis.roe > 15 ? "success" : "info",
    },
    {
      name: "Margen Neto",
      value: kpis.margen_neto,
      message:
        kpis.margen_neto > 10
          ? "La empresa mantiene un margen saludable sobre sus ventas."
          : "Los costos o gastos podrían estar afectando las utilidades.",
      icon: kpis.margen_neto > 10 ? CheckCircle : AlertTriangle,
      type: kpis.margen_neto > 10 ? "success" : "warning",
    },
    {
      name: "Crecimiento de Ventas",
      value: kpis.crecimiento_ventas,
      message:
        kpis.crecimiento_ventas > 0
          ? "Las ventas crecen respecto al periodo anterior."
          : "Disminución de ventas. Es recomendable analizar causas.",
      icon: kpis.crecimiento_ventas > 0 ? TrendingUp : AlertTriangle,
      type: kpis.crecimiento_ventas > 0 ? "success" : "warning",
    },
    {
      name: "Productividad Laboral",
      value: kpis.productividad_laboral,
      message:
        kpis.productividad_laboral > 3000
          ? "Buena productividad por empleado."
          : "La productividad laboral podría mejorar.",
      icon: kpis.productividad_laboral > 3000 ? CheckCircle : Info,
      type: kpis.productividad_laboral > 3000 ? "success" : "info",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {insights.map((insight, i) => {
        const Icon = insight.icon;
        const colorClass =
          insight.type === "success"
            ? "text-green-500"
            : insight.type === "warning"
            ? "text-yellow-500"
            : "text-blue-500";

        return (
          <div
            key={i}
            className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Icon className={`w-5 h-5 mt-1 ${colorClass}`} />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {insight.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {insight.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
