"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/carrusel/imagen1.png",
  "/images/carrusel/imagen2.png",
  "/images/carrusel/imagen3.png",
];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex justify-center items-center w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-10">
      <div className="relative w-full max-w-5xl h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence>
          <motion.div
            key={images[index]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`Imagen ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores circulares */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-all ${
              i === index ? "bg-blue-600 w-5" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
