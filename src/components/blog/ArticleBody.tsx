interface Props {
  content: string;
}

const ArticleBody = ({ content }: Props) => {
  return (
    <div
      className="article-body prose prose-gray max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleBody;
