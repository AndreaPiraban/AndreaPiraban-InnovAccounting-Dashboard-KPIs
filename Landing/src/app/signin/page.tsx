import { Metadata } from "next";
import SigninForm from "./SigninForm";

export const metadata: Metadata = {
  title: "Inicio de Sesión | InnovAccounting",
  description:
    "Accede a tu cuenta para visualizar estadísticas, indicadores y reportes contables y económicos.",
};

const SigninPage = () => {
  return <SigninForm />;
};

export default SigninPage;
