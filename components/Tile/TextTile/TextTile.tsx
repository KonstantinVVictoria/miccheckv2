import styles from "./TextTile.style.module.css";
type TextTileProp = {
  height?: string;
  width?: string;
  backgroundColor?: string;
  color?: string;
  style?: {
    [key: string]: string;
  };
  children: string;
};
export function TextTile(props: TextTileProp) {
  const attributes = {
    ...props,
    height: undefined,
    width: undefined,
  };
  return (
    <h1
      className={styles.tile}
      {...attributes}
      style={{
        height: props.height,
        width: props.width,
        color: props.color || "",
        backgroundColor: props.backgroundColor || "",
        ...props.style,
      }}
    >
      {props.children}
    </h1>
  );
}
