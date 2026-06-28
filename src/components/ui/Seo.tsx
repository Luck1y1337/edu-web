interface SeoProps {
  title: string;
  description?: string;
}

const SITE_NAME = "O'quv Markaz";

/**
 * Per-page document title and meta description.
 * React 19 hoists <title>/<meta> rendered anywhere into <head>.
 */
const Seo = ({ title, description }: SeoProps) => (
  <>
    <title>{`${title} — ${SITE_NAME}`}</title>
    {description && <meta name="description" content={description} />}
  </>
);

export default Seo;
