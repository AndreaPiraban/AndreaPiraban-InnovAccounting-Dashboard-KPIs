"use client";
import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = () => {
  return (
    <section
      id="blog"
      className="relative z-10 py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* CÍRCULOS AZULES DE FONDO */}
      <div className="absolute -top-24 left-0 w-80 h-80 bg-blue-300 opacity-30 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full z-0"></div>

      <div className="container relative z-10">
        {/* TÍTULO Y DESCRIPCIÓN */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <SectionTitle
            title="Últimas publicaciones"
            paragraph="Explora nuestros artículos sobre innovación tecnológica, análisis contable y herramientas que transforman la gestión financiera de las empresas modernas."
            center={false}
          />
        </motion.div>

        {/* GRID DE BLOGS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
