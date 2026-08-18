import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./Markdown.module.css";

export default function Markdown({ children }: { children: string }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
