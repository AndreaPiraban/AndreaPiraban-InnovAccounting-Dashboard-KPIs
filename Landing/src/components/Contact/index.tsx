"use client";
import { motion } from "framer-motion";
import NewsLatterBox from "./NewsLatterBox";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden py-20 md:py-28 bg-gradient-to-b from-white via-blue-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* CÍRCULOS AZULES DE FONDO */}
      <div className="absolute -top-24 left-0 w-80 h-80 bg-blue-400 opacity-30 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full z-0"></div>

      <div className="container relative z-10">
        <div className="-mx-4 flex flex-wrap items-start">
          {/* FORMULARIO DE CONTACTO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 lg:w-7/12 xl:w-8/12"
          >
            <div className="mb-12 rounded-3xl bg-white dark:bg-gray-800 px-8 py-12 shadow-2xl sm:p-14 lg:mb-5">
              <h2 className="mb-3 text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400">
                Contáctanos
              </h2>
              <p className="mb-10 text-lg text-gray-700 dark:text-gray-300">
                Si tienes preguntas, comentarios o deseas más información sobre
                nuestros servicios, completa el formulario y nuestro equipo se
                pondrá en contacto contigo lo antes posible.
              </p>

              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className="border-stroke w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-blue-600 dark:border-transparent dark:bg-[#2C303B] dark:text-gray-200 dark:focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        className="border-stroke w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-blue-600 dark:border-transparent dark:bg-[#2C303B] dark:text-gray-200 dark:focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Mensaje
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Escribe tu mensaje..."
                        className="border-stroke w-full resize-none rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-blue-600 dark:border-transparent dark:bg-[#2C303B] dark:text-gray-200 dark:focus:border-blue-400"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-xl bg-blue-600 px-9 py-4 text-base font-semibold text-white shadow-lg shadow-blue-300/50 transition-all hover:bg-blue-700 dark:shadow-blue-900/40"
                    >
                      Enviar mensaje
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* CAJA LATERAL (NEWSLETTER) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full px-4 lg:w-5/12 xl:w-4/12"
          >
            <NewsLatterBox />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
