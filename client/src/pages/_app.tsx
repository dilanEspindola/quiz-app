import "../styles/globals.css";
import type { AppProps } from "next/app";
import { axiosInterceptors } from "@/interceptors";
import { AuthProvider } from "@/auth";

import "react-toastify/dist/ReactToastify.css";

axiosInterceptors();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
