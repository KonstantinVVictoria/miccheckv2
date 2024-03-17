import styles from "./BannerTile.styles.module.css";
type BannerProps = {
  height?: string;
  width?: string;
  style?: {
    [key: string]: string;
  };
  children: React.ReactNode;
  id?: string;
};
export default function BannerTile(props: BannerProps) {
  return (
    <div
      className={`${styles.tile} ${props.id}`}
      style={{ ...props.style, height: props.height, width: props.width }}
    >
      {props.children}
    </div>
  );
}
