import styles from "./Viewport.styles.module.css";

interface ViewportProps {
  children: React.ReactNode;
  font: string;
}
export default function Viewport({ children, font }: ViewportProps) {
  return <main className={`${styles.container} ${font}`}>{children}</main>;
}
