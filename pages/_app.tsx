import type { AppProps } from "next/app";
// import { ApolloProvider } from '@apollo/client'
// import client from '../apollo-client'
import { ToastContainer } from "react-toastify";
import "../styles/_globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default MyApp;
