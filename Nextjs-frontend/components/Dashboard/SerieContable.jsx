"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SerieContable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8004/serie-resultados");
      const json = await res.json();
      const serie = json.data.map((d) => ({
        año: d.año,
        Activo: d.activo / 1_000, // en miles
        Pasivo: d.pasivo / 1_000,
        Patrimonio: d.patrimonio / 1_000,
      }));
      setData(serie);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Serie Contable (en miles de COP)
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="año"
            stroke="#9ca3af"
            tick={{ fill: "#6b7280" }}
            tickLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#6b7280" }}
            tickFormatter={(v) => v.toLocaleString("es-CO")}
          />
          <Tooltip
            formatter={(value) =>
              `${value.toLocaleString("es-CO", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })} mil`
            }
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Bar dataKey="Activo" fill="#4ade80" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Pasivo" fill="#f87171" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Patrimonio" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
