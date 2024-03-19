import styles from "./Form.styles.module.css";
type FormProps = {
  children: React.ReactNode;
};
export default function Form(props: FormProps) {
  return <div className={styles.container}>{props.children}</div>;
}
