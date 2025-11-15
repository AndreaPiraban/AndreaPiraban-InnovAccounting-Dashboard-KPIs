import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio de Sesión | InnovAccounting",
  description:
    "Accede a tu cuenta para visualizar estadísticas, indicadores y reportes contables y económicos.",
};

const SigninPage = () => {
  return (
    <>
      <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        {/* Círculos difuminados de fondo */}
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-blue-400 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>

        <div className="container px-4">
          <div className="mx-auto max-w-[480px] rounded-2xl bg-white/70 p-10 shadow-xl backdrop-blur-md dark:bg-slate-800/70">
            <h3 className="mb-3 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Inicia sesión en tu cuenta
            </h3>
            <p className="text-center text-base text-gray-500 dark:text-gray-300 mb-10">
              Accede para continuar gestionando tus reportes y paneles.
            </p>

            <button className="mb-8 flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-all duration-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#4285F4"
                  d="M19.6 10.23c0-.7-.06-1.37-.18-2.02H10v3.83h5.46a4.66 4.66 0 0 1-2.03 3.06v2.54h3.27c1.91-1.76 3-4.35 3-7.41z"
                />
                <path
                  fill="#34A853"
                  d="M10 20c2.7 0 4.96-.9 6.61-2.46l-3.27-2.54c-.9.6-2.06.95-3.34.95-2.57 0-4.75-1.74-5.52-4.07H1.06v2.58A10 10 0 0 0 10 20z"
                />
                <path
                  fill="#FBBC05"
                  d="M4.48 11.88a6 6 0 0 1 0-3.76V5.54H1.06a10 10 0 0 0 0 8.92l3.42-2.58z"
                />
                <path
                  fill="#EA4335"
                  d="M10 3.96c1.47 0 2.8.51 3.84 1.52l2.86-2.86A9.96 9.96 0 0 0 10 0 10 10 0 0 0 1.06 5.54l3.42 2.58C5.25 5.7 7.43 3.96 10 3.96z"
                />
              </svg>
              Iniciar sesión con Google
            </button>

            <div className="mb-8 flex items-center justify-center">
              <span className="hidden h-px w-full max-w-[70px] bg-gray-300 sm:block"></span>
              <p className="w-full px-5 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                O usa tu correo y contraseña
              </p>
              <span className="hidden h-px w-full max-w-[70px] bg-gray-300 sm:block"></span>
            </div>

            <form>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all focus:border-blue-500 dark:border-gray-700 dark:bg-slate-700 dark:text-gray-100"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all focus:border-blue-500 dark:border-gray-700 dark:bg-slate-700 dark:text-gray-100"
                />
              </div>

              <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Mantener sesión activa
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button className="mb-6 w-full rounded-md bg-blue-600 py-3 text-white font-medium transition-all duration-300 hover:bg-blue-700">
                Iniciar sesión
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
