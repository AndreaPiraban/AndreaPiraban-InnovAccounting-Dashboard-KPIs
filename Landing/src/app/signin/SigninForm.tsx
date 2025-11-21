"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codigo, setCodigo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // PASO 1: validar credenciales
  // -----------------------------
  const handlePrecheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8005/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {

        // Si no requiere verificación → viene el JWT directo
        if (!data.requiere_codigo) {
          localStorage.setItem("jwt", data.jwt);
          window.location.href = "https://www.google.com";
          return;
        }

        // Caso contrario → paso 2
        setStep(2);
      } else {
        setError(data.error || "Error al validar credenciales.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // PASO 2: verificar código
  // -----------------------------
  const handleVerificarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8005/verificar-codigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, codigo }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwt", data.jwt);
        window.location.href = "http://localhost:3000";
      } else {
        setError(data.error || "Código incorrecto.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container px-4">
        <div className="mx-auto max-w-[480px] rounded-2xl bg-white/70 p-10 shadow-xl backdrop-blur-md dark:bg-slate-800/70">
          <h3 className="mb-3 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Inicia sesión en tu cuenta
          </h3>

          {error && (
            <p className="mb-4 text-center text-sm text-red-500">{error}</p>
          )}

          {/* ---------------- PASO 1 ---------------- */}
          {step === 1 && (
            <form onSubmit={handlePrecheck}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all focus:border-blue-500 dark:border-gray-700 dark:bg-slate-700 dark:text-gray-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mb-6 w-full rounded-md bg-blue-600 py-3 text-white font-medium transition-all duration-300 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Continuar"}
              </button>
            </form>
          )}

          {/* ---------------- PASO 2 ---------------- */}
          {step === 2 && (
            <form onSubmit={handleVerificarCodigo}>
              <div className="mb-6">
                <label
                  htmlFor="codigo"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Código enviado a tu correo
                </label>
                <input
                  type="text"
                  id="codigo"
                  placeholder="Ingresa el código de 6 dígitos"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all focus:border-blue-500 dark:border-gray-700 dark:bg-slate-700 dark:text-gray-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mb-6 w-full rounded-md bg-green-600 py-3 text-white font-medium transition-all duration-300 hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Acceder"}
              </button>
            </form>
          )}

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
  );
};

export default SigninForm;
