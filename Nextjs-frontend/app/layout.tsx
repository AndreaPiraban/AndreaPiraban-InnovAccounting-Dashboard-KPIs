import './globals.css'
import { Inter } from 'next/font/google'
import NavbarDashboard from '@/components/NavbarDashboard'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InnovaAccounting'
}

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-800`}>
        {/* Navbar principal */}
        <NavbarDashboard />

        {/* Contenedor principal */}
        <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <Sidebar />

          {/* Contenido */}
          <div
            id="main-content"
            className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
          >
            <main>{children}</main>

            {/* Footer persistente */}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
