import React from 'react';
import { graphql } from 'gatsby';
import Title from '../react-bricks/bricks/react-bricks-ui/singleColumnContent/Title/Title';

const BlogPostTemplate = ({ data }) => {
  console.log(data); 
  const { markdownRemark } = data;
  if (!markdownRemark) {
    return <div>No blog post found!</div>;
  }
  const { frontmatter, html } = markdownRemark;
  console.log(frontmatter);

  return (
    <article>
      <h1>{frontmatter.title}</h1> 
      <Title title={frontmatter.title} subtitle={frontmatter.subtitle} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`;

export default BlogPostTemplate;
