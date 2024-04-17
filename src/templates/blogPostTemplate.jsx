import React from 'react';
import { graphql } from 'gatsby';
import Title from '../react-bricks/bricks/react-bricks-ui/singleColumnContent/Title/Title';
import Paragraph from '../react-bricks/bricks/react-bricks-ui/singleColumnContent/Paragraph/Paragraph';
import {
  sectionDefaults,
} from '../react-bricks/bricks/react-bricks-ui/LayoutSideProps'


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
      <Title
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      backgroundColor={sectionDefaults.backgroundColor}  
      borderTop={sectionDefaults.borderTop}
      borderBottom={sectionDefaults.borderBottom}
      paddingTop={sectionDefaults.paddingTop}
      paddingBottom={sectionDefaults.paddingBottom}
      width={sectionDefaults.width}
      bigCentered={sectionDefaults.bigCentered} 
      extraboldTitle={sectionDefaults.extraboldTitle}
      />
      <Paragraph
        text={html}  // Passing the HTML content from Markdown
        editable={false}  // Indicating this is static content
        backgroundColor={sectionDefaults.backgroundColor}
        borderTop={sectionDefaults.borderTop}
        borderBottom={sectionDefaults.borderBottom}
        paddingTop={sectionDefaults.paddingTop}
        paddingBottom={sectionDefaults.paddingBottom}
        width={sectionDefaults.width}
      />
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
