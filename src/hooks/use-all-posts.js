import { graphql, useStaticQuery } from 'gatsby';

const useAllPosts = () => {
  const query = graphql`
    query AllPostQuery($formatString: String = "YYYY-MM-DD") {
      allPost(sort: { fields: date, order: DESC }, limit: 10) {
        nodes {
          slug
          title
          date(formatString: $formatString)
          excerpt
          timeToRead
          excerpt
          timeToRead
          description
          tags {
            name
            slug
          }
        }
      }
    }
  `;
  const data = useStaticQuery(query);

  return data.allPost.nodes;
};

export default useAllPosts;
