"use client";
import { useRef } from "react";
import CloseIcon from "../../svg/icons/CloseIcon";
import MenuThreeBarIcon from "../../svg/icons/MenuThreeBarIcon";
import CompanyLogoSVG from "../../svg/logo/CompanyLogo";
import { config } from "../Sidebar/config";
import styles from "./NavBar.styles.module.css";
export default function NavBar() {
  const MenuRef = useRef(null);
  const NavLinks = config.map(({ label, link, type }, i) => {
    return (
      <a
        key={"nav_link_mobile_" + i}
        href={link}
        onClick={() => {
          const Menu = MenuRef.current as unknown as HTMLDivElement;
          Menu.style.background = "rgba(0,0,0,0)";
          Menu.style.backdropFilter = "blur(0px)";
          Menu.style.pointerEvents = "none";
          Array.from(Menu.children).forEach((element) => {
            const Element = element as HTMLElement;
            Element.style.opacity = "0";
          });
        }}
      >
        {label}
      </a>
    );
  });
  return (
    <div className={styles.container}>
      <div className={styles.nav_menu} ref={MenuRef}>
        <div
          className={styles.close}
          onClick={() => {
            const Menu = MenuRef.current as unknown as HTMLDivElement;
            Menu.style.background = "rgba(255,255,255,0)";
            Menu.style.backdropFilter = "blur(0px)";
            Menu.style.pointerEvents = "none";
            document.documentElement.style.overflowY = "visible";
            Array.from(Menu.children).forEach((element) => {
              const Element = element as HTMLElement;
              Element.style.opacity = "0";
            });
          }}
        >
          <CloseIcon height="100%" fill="black" />
        </div>
        {NavLinks}
      </div>
      <CompanyLogoSVG height="100%" fill="black" />
      <div
        className={styles.menu_button}
        onClick={() => {
          const Menu = MenuRef.current as unknown as HTMLDivElement;
          Menu.style.background = "rgba(255,255,255,0.9)";
          Menu.style.backdropFilter = "blur(50px)";
          Menu.style.pointerEvents = "visible";
          document.documentElement.style.overflowY = "hidden";
          Array.from(Menu.children).forEach((element) => {
            const Element = element as HTMLElement;
            Element.style.opacity = "1";
          });
        }}
      >
        <MenuThreeBarIcon height="100%" fill="black" />
      </div>
    </div>
  );
}
