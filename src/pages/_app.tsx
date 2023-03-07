import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import { AppBar } from "../components/AppBar";
import { ContentContainer } from "../components/ContentContainer";
import { Footer } from "../components/Footer";
import "../components/login-register/style.scss";
import Notifications from "../components/Notification";
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");
import { useRouter } from "next/router";
import { useEffect } from "react";
import useCurrentUserStore from "stores/useCurrentUserStore";
import { getCurrentUser } from "components/login-register/login";

function authRequired(): boolean {
  const router = useRouter();
  const publicPages = ["/login", "/forgot-password", "/reset-password/"];
  const authRequired = !publicPages.includes(router.asPath);
  return authRequired;
}

function isLoginPage(): boolean {
  const router = useRouter();
  const loginPage = "/login";
  if (loginPage === router.asPath) return true;
  return false;
}

export async function routeBefore() {
  const router = useRouter();
  const authRequiredForRoute = authRequired();
  useEffect(() => {
    const token = localStorage.getItem("token");
    getCurrentUser(token).then((res) => {
      if (res instanceof Error) {
        if (authRequiredForRoute) {
          router.replace("/login");
        }
      } else {
        if (!authRequiredForRoute) {
          router.replace("/");
        }
      }
    });
  }, []);
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
  try {
  } catch (error) {}
  routeBefore();
  const loginPage = isLoginPage();

  return (
    <>
      <Head>
        <title>Solana Scaffold Lite</title>
      </Head>

      <ContextProvider>
        <div className="flex flex-col h-screen">
          <Notifications />
          {!loginPage && <AppBar />}
          <ContentContainer>
            <Component {...pageProps} />
            <Footer />
          </ContentContainer>
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
