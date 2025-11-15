import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-2xl scale-125"></div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="relative z-10 fill-blue-600 dark:fill-blue-400"
        >
          <path
            d="M22 0C9.849 0 0 9.849 0 22s9.849 22 22 22 22-9.849 22-22S34.151 0 22 0Zm0 4c9.941 0 18 8.059 18 18s-8.059 18-18 18S4 31.941 4 22 12.059 4 22 4Z"
            opacity="0.25"
          />
          <path d="M22 10a2 2 0 0 1 2 2v8h8a2 2 0 1 1 0 4h-8v8a2 2 0 1 1-4 0v-8h-8a2 2 0 1 1 0-4h8v-8a2 2 0 0 1 2-2Z" />
        </svg>
      </div>
    ),
    title: "Innovación Continua",
    paragraph:
      "Evolucionamos constantemente para ofrecer herramientas tecnológicas disruptivas que simplifiquen y potencien los procesos empresariales.",
  },
  {
    id: 2,
    icon: (
      <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-2xl scale-125"></div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="relative z-10 fill-emerald-600 dark:fill-emerald-400"
        >
          <path opacity="0.25" d="M22 0C9.849 0 0 9.849 0 22s9.849 22 22 22 22-9.849 22-22S34.151 0 22 0Z" />
          <path d="M32 12 18.5 25.5 12 19l-3 3 9.5 9.5L35 15l-3-3Z" />
        </svg>
      </div>
    ),
    title: "Excelencia y Calidad",
    paragraph:
      "Nos comprometemos con altos estándares de servicio, precisión profesional y acompañamiento confiable.",
  },
  {
    id: 3,
    icon: (
      <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-2xl scale-125"></div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="relative z-10 fill-amber-500 dark:fill-amber-300"
        >
          <path opacity="0.25" d="M22 0C9.849 0 0 9.849 0 22s9.849 22 22 22 22-9.849 22-22S34.151 0 22 0Z" />
          <path d="M22 12a10 10 0 1 1-10 10A10.011 10.011 0 0 1 22 12Zm0 18a8 8 0 1 0-8-8 8.009 8.009 0 0 0 8 8Zm0-22a2 2 0 0 1 2 2v1a2 2 0 1 1-4 0v-1a2 2 0 0 1 2-2Z" />
        </svg>
      </div>
    ),
    title: "Ética y Transparencia",
    paragraph:
      "Promovemos decisiones responsables, información clara y una gestión basada en la integridad.",
  },
  {
    id: 4,
    icon: (
      <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-2xl scale-125"></div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="relative z-10 fill-indigo-600 dark:fill-indigo-400"
        >
          <path opacity="0.25" d="M22 0C9.849 0 0 9.849 0 22s9.849 22 22 22 22-9.849 22-22S34.151 0 22 0Z" />
          <path d="M31 12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2h18Zm-3 4H16v12h12V16Z" />
        </svg>
      </div>
    ),
    title: "Orientación al Cliente",
    paragraph:
      "Escuchamos, entendemos y nos adaptamos a las necesidades de cada cliente para generar soluciones a la medida.",
  },
  {
    id: 5,
    icon: (
      <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-2xl scale-125"></div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="relative z-10 fill-rose-600 dark:fill-rose-400"
        >
          <path opacity="0.25" d="M22 0C9.849 0 0 9.849 0 22s9.849 22 22 22 22-9.849 22-22S34.151 0 22 0Z" />
          <path d="M30 14h-4v-2a4 4 0 0 0-8 0v2h-4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2Zm-6 0h-4v-2a2 2 0 1 1 4 0v2Z" />
        </svg>
      </div>
    ),
    title: "Confidencialidad y Seguridad",
    paragraph:
      "Protegemos los datos e información estratégica con responsabilidad, ética y protocolos tecnológicos seguros.",
  },
  {
    id: 6,
    icon: (
      <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-2xl scale-125"></div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="relative z-10 fill-cyan-600 dark:fill-cyan-400"
        >
          <path opacity="0.25" d="M22 0C9.849 0 0 9.849 0 22s9.849 22 22 22 22-9.849 22-22S34.151 0 22 0Z" />
          <path d="M32 14h-4v4h-4v4h4v4h4v-4h4v-4h-4v-4ZM12 18h8v8h-8v-8Zm-2-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H10Z" />
        </svg>
      </div>
    ),
    title: "Trabajo Colaborativo",
    paragraph:
      "Creemos en el poder del conocimiento compartido entre contadores, desarrolladores, economistas y expertos, para un servicio integral.",
  },
  {
    id: 7,
    icon: (
      <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-2xl scale-125"></div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="relative z-10 fill-teal-600 dark:fill-teal-400"
        >
          <path opacity="0.25" d="M22 0C9.849 0 0 9.849 0 22s9.849 22 22 22 22-9.849 22-22S34.151 0 22 0Z" />
          <path d="M22 10a12 12 0 1 0 12 12A12.013 12.013 0 0 0 22 10Zm0 20a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Z" />
        </svg>
      </div>
    ),
    title: "Impacto y Crecimiento",
    paragraph:
      "Buscamos generar valor real que impulse el desarrollo y sostenibilidad de nuestros clientes y sus equipos.",
  },
];

export default featuresData;
