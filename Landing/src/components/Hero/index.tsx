"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/carrusel/imagen1.webp",
  "/images/carrusel/imagen2.avif",
  "/images/carrusel/imagen3.jpeg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-28 pt-[120px]"
    >
      {/* FONDOS DECORATIVOS */}
      <div className="absolute right-0 top-0 z-0 opacity-40 pointer-events-none">
        <svg
          width="450"
          height="556"
          viewBox="0 0 450 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="277" cy="63" r="225" fill="url(#paint0_linear_25:217)" />
          <circle cx="18" cy="182" r="18" fill="url(#paint1_radial_25:217)" />
          <circle cx="77" cy="288" r="34" fill="url(#paint2_radial_25:217)" />
          <circle
            cx="325.486"
            cy="302.87"
            r="180"
            transform="rotate(-37.6852 325.486 302.87)"
            fill="url(#paint3_linear_25:217)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_25:217"
              x1="-54.5003"
              y1="-178"
              x2="222"
              y2="288"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_25:217"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(18 182) rotate(90) scale(18)"
            >
              <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_25:217"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(77 288) rotate(90) scale(34)"
            >
              <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
            </radialGradient>
            <linearGradient
              id="paint3_linear_25:217"
              x1="226.775"
              y1="-66.1548"
              x2="292.157"
              y2="351.421"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 z-0 opacity-30 pointer-events-none">
        <svg
          width="364"
          height="201"
          viewBox="0 0 364 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
            stroke="url(#paint0_linear_25:218)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_25:218"
              x1="184.389"
              y1="69.2405"
              x2="184.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 w-full max-w-[1800px] min-h-[700px]">

        {/* COLUMNA IZQUIERDA: TEXTOS */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left w-full md:w-[40%] space-y-16 min-h-[700px]">
          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-400 mb-4">
              Misión
            </h2>
            <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mb-6 mx-auto md:mx-0"></div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Impulsar la transformación digital de la gestión contable, financiera y administrativa de las empresas mediante soluciones tecnológicas innovadoras, análisis inteligente de datos y acompañamiento profesional integral. Brindamos herramientas y servicios que facilitan la toma de decisiones estratégicas, mejoran la eficiencia operativa y garantizan el cumplimiento normativo, contribuyendo al crecimiento sostenible de nuestros clientes.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-400 mb-4">
              Visión (a 5 años)
            </h2>
            <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mb-6 mx-auto md:mx-0"></div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Ser la plataforma líder en Latinoamérica en analítica financiera y gestión empresarial inteligente, reconocida por integrar tecnología, contabilidad, automatización, inteligencia de negocios y talento humano experto. Convertirnos en el aliado estratégico de las empresas que buscan escalar, optimizar recursos y evolucionar hacia modelos de gestión digital, eficientes y basados en datos.
            </p>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: CARRUSEL */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-[60%] min-h-[700px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={images[index]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt={`Imagen ${index + 1}`}
                fill
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Indicadores */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 w-3 rounded-full transition-all ${
                  i === index ? "bg-blue-600 w-6" : "bg-gray-300 dark:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
