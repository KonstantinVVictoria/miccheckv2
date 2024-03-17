import styles from "./Main.styles.module.css";
type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return <main className={styles.container}>{children}</main>;
}
