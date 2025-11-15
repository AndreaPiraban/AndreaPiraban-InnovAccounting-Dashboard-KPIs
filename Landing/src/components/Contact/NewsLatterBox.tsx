"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NewsLatterBox = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative z-10 overflow-hidden rounded-2xl bg-white p-8 shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11">
      {/* Círculos de fondo animados */}
      <motion.div
        className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-blue-400/10 blur-2xl"
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
        Suscríbete para recibir actualizaciones
      </h3>
      <p className="mb-11 border-b border-body-color/25 pb-11 text-base leading-relaxed text-body-color dark:border-white/25">
        Mantente al día con nuestras últimas herramientas, informes y novedades contables y tecnológicas.
      </p>

      <div className="relative z-10">
        <input
          type="text"
          name="name"
          placeholder="Ingresa tu nombre"
          className="border-stroke text-body-color focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary mb-4 w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
          className="border-stroke text-body-color focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary mb-4 w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
        />
        <input
          type="submit"
          value="Suscribirme"
          className="mb-5 flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
        />
        <p className="text-center text-base leading-relaxed text-body-color dark:text-body-color-dark">
          Prometemos no enviarte spam. Solo información valiosa.
        </p>
      </div>
    </div>
  );
};

export default NewsLatterBox;
