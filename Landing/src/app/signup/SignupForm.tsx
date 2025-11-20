"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codigo, setCodigo] = useState("");

  const [step, setStep] = useState<1 | 2>(1); // 1 = datos básicos, 2 = código

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // ------------------------------------------------------
  // NUEVO: Estado global para no perder datos entre pasos
  // ------------------------------------------------------
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ------------------------------------------------------
  // VALIDACIONES
  // ------------------------------------------------------
  const validateEmail = (mail: string): string | null => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(mail)) return "El correo no tiene un formato válido.";
    return null;
  };

  const validatePassword = (pwd: string): string[] => {
    const errors: string[] = [];
    if (pwd.length < 8) errors.push("Debe tener al menos 8 caracteres.");
    if (!/[A-Z]/.test(pwd)) errors.push("Debe incluir al menos una letra mayúscula.");
    if (!/[0-9]/.test(pwd)) errors.push("Debe incluir al menos un número.");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pwd))
      errors.push("Debe incluir al menos un carácter especial.");
    return errors;
  };

  // ------------------------------------------------------
  // PASO 1 - ENVIAR DATOS Y PEDIR CÓDIGO
  // ------------------------------------------------------
  const handleEnviarDatos = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPasswordErrors([]);

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    const pwdErrors = validatePassword(password);
    if (pwdErrors.length > 0) {
      setPasswordErrors(pwdErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8006/registro/precheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2); // Pasar al input del código
      } else {
        setError(data.error || "No se pudieron validar los datos.");
      }
    } catch {
      setError("No se pudo conectar al servidor.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------
  // PASO 2 - VALIDAR CÓDIGO Y CREAR USUARIO
  // ------------------------------------------------------
  const handleConfirmarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!codigo) {
      setError("Debe ingresar el código enviado a su correo.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8006/registro/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // ------------------------------------------------------
        // NUEVO: Enviar datos completos en el paso 2
        // ------------------------------------------------------
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          codigo,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/signin");
      } else {
        setError(data.error || "No se pudo crear la cuenta.");
      }
    } catch {
      setError("No se pudo conectar al servidor.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container px-4">
        <div className="mx-auto max-w-[500px] rounded-2xl bg-white/70 p-10 shadow-xl backdrop-blur-md dark:bg-slate-800/70">

          <h3 className="mb-3 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Crea tu cuenta
          </h3>

          {(error || passwordErrors.length > 0) && (
            <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/40 dark:text-red-300">
              {error && <p className="mb-2">{error}</p>}
              {passwordErrors.length > 0 && (
                <ul className="list-disc ml-4">
                  {passwordErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* ------------------------------------------------------ */}
          {/* PASO 1 – DATOS BÁSICOS */}
          {/* ------------------------------------------------------ */}
          {step === 1 && (
            <form onSubmit={handleEnviarDatos}>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Nombre completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);

                    // ------------------------------------------------------
                    // NUEVO: guardar en userData sin alterar el valor original
                    // ------------------------------------------------------
                    setUserData((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  required
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 
                             dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setUserData((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  required
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 
                             dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setUserData((prev) => ({ ...prev, password: e.target.value }));
                  }}
                  required
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 
                             dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mb-6 w-full rounded-md bg-blue-600 py-3 text-white font-medium"
              >
                {loading ? "Validando..." : "Continuar"}
              </button>
            </form>
          )}

          {/* ------------------------------------------------------ */}
          {/* PASO 2 – CÓDIGO */}
          {/* ------------------------------------------------------ */}
          {step === 2 && (
            <form onSubmit={handleConfirmarCodigo}>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Hemos enviado un código a tu correo. Ingrésalo para finalizar el registro.
              </p>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Código</label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 
                             dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mb-6 w-full rounded-md bg-blue-600 py-3 text-white font-medium"
              >
                {loading ? "Verificando..." : "Crear cuenta"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/signin" className="font-medium text-blue-600 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
