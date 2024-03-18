import MenuThreeBarIcon from "../../svg/icons/MenuThreeBarIcon";
import CompanyLogoSVG from "../../svg/logo/CompanyLogo";
import styles from "./NavBar.styles.module.css";
export default function NavBar() {
  return (
    <div className={styles.container}>
      <CompanyLogoSVG height="100%" fill="white" />
      <MenuThreeBarIcon height="100%" fill="white" />
    </div>
  );
}
