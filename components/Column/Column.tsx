import styles from "./Row.style.module.css";
type RowProps = {
  children: React.ReactNode;
  wrap?: boolean;
  gap?: string;
};

export default function Row(props: RowProps) {
  return (
    <div
      className={styles.column}
      style={{
        gap: props.gap || "var(--document-gap)",
        flexWrap: (props.wrap !== undefined && "wrap") || "nowrap",
      }}
    >
      {props.children}
    </div>
  );
}
