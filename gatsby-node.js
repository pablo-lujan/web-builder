require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const config = require.resolve('./src/react-bricks/config.tsx')
const bluebird = require('bluebird')
const fetchPages = require('react-bricks/frontend').fetchPages
const fetchPage = require('react-bricks/frontend').fetchPage
const fetchTags = require('react-bricks/frontend').fetchTags
const path = require("path")
const { graphql } = require("gatsby")
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "blog" });
    console.log(`Creating slug: ${slug} for node ${node.id}`);  // Log the slug and node id
    createNodeField({
      node,
      name: 'slug',
      value: slug, 
    });
  }
};
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Correct usage of GraphQL to query data
  const result = await graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  // Use the result data to create pages
  console.log(JSON.stringify(result.data, null, 2));
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug, // Use the slug from the frontmatter as the path
      component: path.resolve("./src/templates/blogPostTemplate.jsx"), // Path to template for blog posts
      context: {
        slug: node.fields.slug
      },
    });
  });

  const appId = process.env.GATSBY_APP_ID
  const apiKey = process.env.API_KEY
  const publicEnvironment = process.env.GATSBY_PUBLIC_ENVIRONMENT

  let errorHeader = false
  let errorFooter = false
  let errorPage = false
  let errorKeys = false

  const header = await fetchPage('header', apiKey).catch(() => {
    errorHeader = true
    return {}
  })
  const footer = await fetchPage('footer', apiKey).catch(() => {
    errorFooter = true
    return {}
  })

  if (!appId || !apiKey) {
    console.error(
      'App credentials not found. Please, set your GATSBY_APP_ID and API_KEY in your .env.development or .env.production file.'
    )

    errorKeys = true

    createPage({
      path: `/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: {
        page: null,
        header: null,
        footer: null,
        errorKeys: errorKeys,
        errorPage: errorPage,
        errorHeader: errorHeader,
        errorFooter: errorFooter,
      },
    })
    return
  }

  const { items: tags } = await fetchTags(apiKey)
  tags.sort()

  const allPages = await fetchPages(apiKey, {
    pageSize: 1000,
    sort: '-publishedAt',
  })

  if (!allPages || allPages.length === 0) {
    console.error(
      'No published page was found. Please, create at least one page from the /admin interface.'
    )
    createPage({
      path: `/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: {
        page: null,
        header: header,
        footer: footer,
        errorKeys: errorKeys,
        errorPage: errorPage,
        errorHeader: errorHeader,
        errorFooter: errorFooter,
      },
    })
    return
  }

  const posts = allPages.filter((page) => page.type === 'blog')

  const popularPosts = allPages.filter(
    (page) => page.type === 'blog' && page.tags?.includes('popular')
  )
  const pages = allPages.filter((page) => page.type !== 'blog')

  createPage({
    path: `/blog`,
    component: require.resolve('./src/templates/blog.tsx'),
    context: {
      posts,
      tags,
      header: header,
      footer: footer,
      errorKeys: errorKeys,
      errorPage: errorPage,
      errorHeader: errorHeader,
      errorFooter: errorFooter,
    },
  })

  const allPagesWithContent = await bluebird.map(
    pages,
    (page) => {
      return fetchPage(page.slug, apiKey)
    },
    { concurrency: 2 }
  )

  // Pages
  allPagesWithContent
    .filter((page) => page.slug !== 'header' && page.slug !== 'footer')
    .forEach((page) => {
      createPage({
        path: page.slug === '/' ? page.slug : `/${page.slug}/`,
        component: require.resolve('./src/templates/page.tsx'),
        context: {
          page: page,
          header: header,
          footer: footer,
          errorKeys: errorKeys,
          errorPage: errorPage,
          errorHeader: errorHeader,
          errorFooter: errorFooter,
        },
      })
    })

  tags.forEach((tag) => {
    const pagesByTag = posts.filter((page) => page.tags?.includes(tag))

    createPage({
      path: `/blog/tag/${tag}`,
      component: require.resolve('./src/templates/tag.tsx'),
      context: {
        posts: pagesByTag,
        filterTag: tag,
        popularPosts,
        tags,
        header: header,
        footer: footer,
        errorKeys: errorKeys,
        errorPage: errorPage,
        errorHeader: errorHeader,
        errorFooter: errorFooter,
      },
    })
  })

  for (const { slug } of posts) {
    const page = await fetchPage(slug, apiKey, undefined, config.pageTypes)
    createPage({
      path: `/blog/${page.slug}/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: {
        page,
        header: header,
        footer: footer,
        errorKeys: errorKeys,
        errorPage: errorPage,
        errorHeader: errorHeader,
        errorFooter: errorFooter,
      },
    })
  }
}
