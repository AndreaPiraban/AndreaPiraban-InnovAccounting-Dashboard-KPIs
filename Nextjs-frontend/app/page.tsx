import VentasHistoricas from '@/components/Dashboard/VentasSemanales'
import KpiStats from '@/components/Dashboard/Kpis_Api'
import ResumenContable from '@/components/Dashboard/Balance_resultados'
import BlurredPdfCard from '@/components/Dashboard/Informefinal'

export default function Home() {
  return (
    <main className="px-4 pt-6">
      <div className="grid gap-6 xl:grid-cols-3">
        
        {/* COLUMNA IZQUIERDA (2/3 ancho): Ventas + Serie */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <VentasHistoricas />
          
        </div>

        {/* COLUMNA DERECHA (1/3 ancho): Indicadores + Resumen */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-4">Indicadores Financieros</h2>
            <KpiStats />

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <ResumenContable />
          </div>

          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <BlurredPdfCard />
          </div>

          </div>

          
        </section>
      </div>
    </main>
  );
}
