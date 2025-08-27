import ArticleSection from "@/components/Article/ArticleSection";
import BestArticleSection from "@/components/Article/BestArticleSection";
import styles from "@/styles/Article.module.css";

export default function Article() {
  return (
    <div className={styles.article}>
      <div className={styles.articleBox}>
        <BestArticleSection />
        <ArticleSection />
      </div>
    </div>
  );
}
