"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section
      id="pricing"
      className="relative z-10 py-20 md:py-28 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* CÍRCULOS AZULES DE FONDO */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-300 opacity-30 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full z-0"></div>

      <div className="container relative z-10">
        {/* TÍTULO Y DESCRIPCIÓN */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16"
        >
          <SectionTitle
            title="Planes y Precios"
            paragraph="En InnovAccounting creemos en la accesibilidad. Por eso ofrecemos planes simples y transparentes, diseñados para ajustarse al tamaño y las necesidades de tu empresa sin sacrificar calidad ni soporte."
            center={false}
          />
        </motion.div>

        {/* SELECTOR MENSUAL / ANUAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mb-12 flex justify-center"
        >
          <div className="flex items-center space-x-6 bg-white/70 dark:bg-gray-800/70 px-6 py-3 rounded-full shadow-lg backdrop-blur-md">
            <span
              onClick={() => setIsMonthly(true)}
              className={`cursor-pointer text-base font-semibold transition-colors ${
                isMonthly ? "text-blue-600" : "text-gray-500 dark:text-gray-300"
              }`}
            >
              Mensual
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="relative flex items-center w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer"
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-blue-500 transition-transform ${
                  isMonthly ? "translate-x-0" : "translate-x-7"
                }`}
              ></div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`cursor-pointer text-base font-semibold transition-colors ${
                !isMonthly ? "text-blue-600" : "text-gray-500 dark:text-gray-300"
              }`}
            >
              Anual
            </span>
          </div>
        </motion.div>

        {/* CUADROS DE PRECIOS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
        >
          <PricingBox
            packageName="Lite"
            price={isMonthly ? "40" : "120"}
            duration={isMonthly ? "mes" : "año"}
            subtitle="Ideal para pequeñas empresas o startups que necesitan información contable clara y accesible."
          >
            <OfferList text="Todos los componentes del dashboard" status="active" />
            <OfferList text="Proyectos ilimitados" status="active" />
            <OfferList text="Uso comercial permitido" status="active" />
            <OfferList text="Soporte por correo" status="active" />
            <OfferList text="Actualizaciones vitalicias" status="inactive" />
          </PricingBox>

          <PricingBox
            packageName="Profesional"
            price={isMonthly ? "399" : "789"}
            duration={isMonthly ? "mes" : "año"}
            subtitle="La mejor opción para empresas en crecimiento que requieren reportes avanzados y personalización."
          >
            <OfferList text="Todos los componentes del dashboard" status="active" />
            <OfferList text="Proyectos ilimitados" status="active" />
            <OfferList text="Uso comercial permitido" status="active" />
            <OfferList text="Soporte prioritario" status="active" />
            <OfferList text="Actualizaciones vitalicias" status="inactive" />
          </PricingBox>

          <PricingBox
            packageName="Corporativo"
            price={isMonthly ? "589" : "999"}
            duration={isMonthly ? "mes" : "año"}
            subtitle="Diseñado para grandes organizaciones con necesidades avanzadas de análisis contable e integración total."
          >
            <OfferList text="Todos los componentes del dashboard" status="active" />
            <OfferList text="Proyectos ilimitados" status="active" />
            <OfferList text="Uso comercial permitido" status="active" />
            <OfferList text="Soporte premium 24/7" status="active" />
            <OfferList text="Actualizaciones vitalicias" status="active" />
          </PricingBox>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
