import { sanitizeHtml } from "../../utils/sanitize";

interface Props {
  content: string;
}

const ArticleBody = ({ content }: Props) => {
  return (
    <div
      className="article-body prose prose-gray max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
    />
  );
};

export default ArticleBody;
