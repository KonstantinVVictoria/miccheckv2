import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import Viewport from "../components/Viewport/Viewport";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Jost, Sail } from "next/font/google";
const cursive_font = Sail({
  subsets: ["latin"],
  weight: "400",
  variable: "--cursive-font",
});

const main_font = Jost({ subsets: ["latin"], variable: "--main-font" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Viewport font={`${main_font.variable} ${cursive_font.variable}`}>
      <Sidebar />
      <Main>
        <Component {...pageProps} />
      </Main>
    </Viewport>
  );
}
