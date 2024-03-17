import dynamic from "next/dynamic";
import ClientSideScript from "./CSR";
import styles from "./Sections.style.module.css";
type SectionProps = {
  children: React.ReactNode;
  id: string;
  dissapear?: boolean;
};

export default function Section(props: SectionProps) {
  return (
    <section id={props.id} className={styles.container}>
      <ClientSideScript id={props.id} />
      {props.children}
    </section>
  );
}
