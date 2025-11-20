// src/app/signup/page.tsx
import { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Registro | InnovAccounting",
  description:
    "Crea tu cuenta en InnovAccounting para acceder a estadísticas, reportes y paneles contables avanzados.",
};

const SignupPage = () => {
  return <SignupForm />;
};

export default SignupPage;
