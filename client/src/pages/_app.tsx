import "../styles/globals.css";
import type { AppProps } from "next/app";
import { axiosInterceptors } from "@/interceptors";
import { AuthProvider } from "@/auth";
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ScoreProvider } from "@/context/score";

const queryClient = new QueryClient();

axiosInterceptors();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <ToastContainer />
          <ScoreProvider>
            <Component {...pageProps} />
          </ScoreProvider>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
