import EmailIcon from "../../svg/icons/EmailIcon";
import FacebookIcon from "../../svg/icons/FacebookIcon";
import InstagramIcon from "../../svg/icons/InstagramIcon";
import PhoneIcon from "../../svg/icons/PhoneIcon";
import CompanyLogoSVG from "../../svg/logo/CompanyLogo";
import { config } from "./config";
import styles from "./Sidebar.styles.module.css";

export default function Sidebar() {
  const NavLinks = config.map((navlink, i) =>
    NavLink(navlink.label, navlink.link, navlink.type, i)
  );

  return (
    <aside className={styles.container}>
      <div className={styles.header}>
        <CompanyLogoSVG className={styles.logo} />
      </div>
      <nav className={styles.nav_links}>{NavLinks}</nav>
      <div className={styles.footer}>
        <p>
          <b>Contacts</b>
        </p>
        <p>kevluuinthestu@gmail.com</p>
        <p>415-777-7777</p>
        <div>
          <SocialMediaHandles />
        </div>
      </div>
    </aside>
  );
}

export function NavLink(label: string, link: string, type: string, i: number) {
  return (
    <a
      key={`${new Date().getTime()}_nav_${i}`}
      className={styles.link}
      href={link}
    >
      {label}
    </a>
  );
}

export function SocialMediaHandles() {
  return (
    <div className={styles.handles}>
      <PhoneIcon height="2rem" width="2rem" fill="black" selectable />
      <EmailIcon height="2rem" width="2rem" fill="black" selectable />
      <InstagramIcon height="2rem" width="2rem" fill="black" selectable />
      <FacebookIcon height="2rem" width="2rem" fill="black" selectable />
    </div>
  );
}
