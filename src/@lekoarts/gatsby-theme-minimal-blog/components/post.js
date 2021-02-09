/** @jsx jsx */
import { jsx, Heading } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout';
import ItemTags from '@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags';
import ShareButtons from './share-buttons';

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const Post = ({ data: { post } }) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const description = post.description ? post.description : post.excerpt;

  return (
    <Layout>
      <SEO
        title={post.title}
        description={description}
        image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
        pathname={post.slug}
        canonicalUrl={post.canonicalUrl}
      />

      <Heading as="h1" variant="styles.h1">
        {post.title}
      </Heading>

      <div className="post-meta" sx={{ color: `secondary`, mt: 3, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
        <div className="post-meta-share">
          {post.date && (
            <div>
              <time>{post.date}</time>
            </div>
          )}

          {post.tags && (
            <div>
              <span className="post-meta-separator">{` — `}</span>

              <ItemTags tags={post.tags} />
            </div>
          )}

          {post.timeToRead &&
            <div>
              <span className="post-meta-separator">{` — `}</span>

              <span>{post.timeToRead} min read</span>
            </div>
          }
        </div>
      </div>

      <ShareButtons url={url} title={post.title} description={description} />

      <section
        sx={{
          my: 5,
          ".gatsby-resp-image-wrapper": { my: [4, 4, 5], boxShadow: shadow.join(`, `) },
          variant: `layout.content`,
        }}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
    </Layout>
  )
}

export default Post;