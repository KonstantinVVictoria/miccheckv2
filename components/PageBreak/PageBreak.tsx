import styles from "./PageBreak.styles.module.css";
type PageBreakProps = {
  children: React.ReactNode;
};
export default function PageBreak(props: PageBreakProps) {
  return (
    <div className={styles.container}>
      <span></span>
      <h1>{props.children}</h1>
      <span></span>
    </div>
  );
}
