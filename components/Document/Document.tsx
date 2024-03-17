import styles from "./Document.styles.module.css";

type ArticleProps = {
  children: React.ReactNode;
};
export default function Document(config: ArticleProps) {
  return (
    <article id="main_document" className={styles.document}>
      {config.children}
    </article>
  );
}
