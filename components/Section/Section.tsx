import dynamic from "next/dynamic";
import ClientSideScript from "./CSR";
import styles from "./Sections.style.module.css";
type SectionProps = {
  children: React.ReactNode;
  id: string;
  dissapear?: boolean;
  style?: {
    [key: string]: string;
  };
};

export default function Section(props: SectionProps) {
  return (
    <section
      id={props.id}
      className={styles.container}
      style={{ ...props.style }}
    >
      <ClientSideScript id={props.id} />
      {props.children}
    </section>
  );
}
