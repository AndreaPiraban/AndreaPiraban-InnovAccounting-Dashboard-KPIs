import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Automatización contable: el siguiente paso hacia la eficiencia empresarial",
    paragraph:
      "Descubre cómo las herramientas de inteligencia artificial y automatización están transformando los procesos contables, reduciendo errores y aumentando la productividad en las organizaciones modernas.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Laura Gómez",
      image: "/images/blog/author-01.png",
      designation: "Especialista en Transformación Digital",
    },
    tags: ["innovación", "automatización"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Cómo los indicadores financieros pueden impulsar la toma de decisiones",
    paragraph:
      "Los KPIs financieros son el lenguaje oculto de la rentabilidad. Aprende a interpretar los datos y transformarlos en decisiones estratégicas que fortalezcan tu negocio.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Carlos Ramírez",
      image: "/images/blog/author-02.png",
      designation: "Analista Financiero",
    },
    tags: ["finanzas", "estrategia"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Tendencias tecnológicas en la gestión contable para 2025",
    paragraph:
      "Desde el uso de dashboards inteligentes hasta la analítica predictiva, estas son las tecnologías que están redefiniendo la manera de entender y aplicar la contabilidad empresarial.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "María Pérez",
      image: "/images/blog/author-03.png",
      designation: "Consultora en Innovación Financiera",
    },
    tags: ["tecnología", "contabilidad"],
    publishDate: "2025",
  },
];

export default blogData;
