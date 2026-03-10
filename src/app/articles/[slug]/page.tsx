import { articles } from "@/data/articles";
import ArticleContent from "./ArticleContent";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return <ArticleContent article={article || null} />;
}
