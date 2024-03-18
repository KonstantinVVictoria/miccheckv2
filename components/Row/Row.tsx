import styles from "./Row.style.module.css";
type RowProps = {
  children: React.ReactNode;
  wrap?: boolean;
  gap?: string;
  style?: {
    [key: string]: string;
  };
};

export default function Row(props: RowProps) {
  return (
    <div
      className={styles.row}
      style={{
        gap: props.gap || "var(--document-gap)",
        flexWrap: (props.wrap !== undefined && "wrap") || "nowrap",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
