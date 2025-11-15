"use client";
import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section
      id="features"
      className="relative z-10 overflow-hidden bg-gradient-to-b from-blue-50 via-slate-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-28"
    >
      <div className="container mx-auto px-6 relative flex flex-col md:flex-row items-center justify-between gap-16 w-full max-w-[1800px]">
        
        {/* COLUMNA IZQUIERDA: TÍTULO Y PÁRRAFO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left w-full md:w-[40%] space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-400 mb-4">
            Valores corporativos
          </h2>
          <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mb-6 mx-auto md:mx-0"></div>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            En InnovAccounting, nuestros valores son la base de cada decisión y acción que emprendemos. Creemos en la innovación continua, evolucionando de forma constante para ofrecer herramientas tecnológicas disruptivas que simplifiquen y potencien los procesos empresariales. Nos guiamos por la excelencia y calidad, garantizando altos estándares de servicio, precisión profesional y un acompañamiento cercano y confiable. Actuamos siempre con ética y transparencia, fomentando decisiones responsables y una gestión íntegra basada en la claridad. Nuestra orientación al cliente nos impulsa a escuchar, entender y adaptarnos a las necesidades específicas de cada empresa, desarrollando soluciones a la medida.
          </p>
        </motion.div>

        {/* COLUMNA DERECHA: FEATURES */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-[60%] grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-2"
        >
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
