'use client';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MainChart() {
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState(null);

  // 🔹 1. Obtener datos de la API
  useEffect(() => {
    fetch('http://localhost:8003/Obtener_ventas')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Error cargando ventas:', err));
  }, []);

  // 🔹 2. Detectar modo oscuro
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  // 🔹 3. Calcular estadísticas
  const stats = useMemo(() => {
    if (!data) return null;

    const ventas = data.ventas || [];
    const totalActual = data.total_mes_actual;
    const totalAnterior = data.total_mes_anterior;

    const promedioActual =
      ventas.reduce((acc, v) => acc + v.mes_actual, 0) / ventas.length;
    const promedioAnterior =
      ventas.reduce((acc, v) => acc + v.mes_anterior, 0) / ventas.length;

    const variacionPorcentual =
      ((totalActual - totalAnterior) / totalAnterior) * 100;

    return {
      totalActual,
      totalAnterior,
      promedioActual,
      promedioAnterior,
      variacionPorcentual,
    };
  }, [data]);

  // 🔹 4. Configurar gráfico
  const options = useMemo(() => {
    const mainChartColors = isDark
      ? {
          borderColor: '#374151',
          labelColor: '#9CA3AF',
          opacityFrom: 0,
          opacityTo: 0.15,
        }
      : {
          borderColor: '#F3F4F6',
          labelColor: '#6B7280',
          opacityFrom: 0.45,
          opacityTo: 0,
        };

    const categorias = data?.ventas?.map(v => `Día ${v.dia}`) || [];
    const serieActual = data?.ventas?.map(v => v.mes_actual) || [];
    const serieAnterior = data?.ventas?.map(v => v.mes_anterior) || [];

    return {
      chart: {
        height: 420,
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        foreColor: mainChartColors.labelColor,
        toolbar: { show: false },
      },
      fill: {
        type: 'gradient',
        gradient: {
          enabled: true,
          opacityFrom: mainChartColors.opacityFrom,
          opacityTo: mainChartColors.opacityTo,
        },
      },
      dataLabels: { enabled: false },
      tooltip: {
        style: { fontSize: '14px', fontFamily: 'Inter, sans-serif' },
      },
      grid: {
        show: true,
        borderColor: mainChartColors.borderColor,
        strokeDashArray: 1,
        padding: { left: 35, bottom: 15 },
      },
      series: [
        {
          name: 'Mes actual',
          data: serieActual,
          color: '#1A56DB',
        },
        {
          name: 'Mes anterior',
          data: serieAnterior,
          color: '#FDBA8C',
        },
      ],
      markers: {
        size: 4,
        strokeColors: '#ffffff',
        hover: { sizeOffset: 3 },
      },
      xaxis: {
        categories: categorias,
        labels: {
          style: {
            colors: [mainChartColors.labelColor],
            fontSize: '13px',
            fontWeight: 500,
          },
        },
        axisBorder: { color: mainChartColors.borderColor },
        axisTicks: { color: mainChartColors.borderColor },
      },
      yaxis: {
        labels: {
          style: {
            colors: [mainChartColors.labelColor],
            fontSize: '13px',
            fontWeight: 500,
          },
          formatter: value => '$' + value.toLocaleString(),
        },
      },
      legend: {
        fontSize: '13px',
        fontWeight: 500,
        labels: { colors: [mainChartColors.labelColor] },
      },
    };
  }, [isDark, data]);

  if (!data || !stats) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Cargando datos de ventas...
      </div>
    );
  }

  // 🔹 5. Render
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
      {/* Panel de KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Ventas mes actual</p>
          <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            ${stats.totalActual.toLocaleString()}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Ventas mes anterior</p>
          <p className="text-xl font-semibold text-orange-500 dark:text-orange-400">
            ${stats.totalAnterior.toLocaleString()}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Promedio diario actual</p>
          <p className="text-xl font-semibold text-green-600 dark:text-green-400">
            ${stats.promedioActual.toFixed(0).toLocaleString()}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Variación total</p>
          <p
            className={`text-xl font-semibold ${
              stats.variacionPorcentual >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {stats.variacionPorcentual.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Gráfico */}
      <ReactApexChart options={options} series={options.series} type="area" height={500} />
    </div>
  );
}
