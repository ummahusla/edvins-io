require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteTitle: `Edvins\'s Blog`,
    siteTitleAlt: `Edvins\'s Blog`,
    siteHeadline: `Edvins\'s Blog - Blog about software development and side hustle.`,
    siteUrl: `https://edvins.io/`,
    siteDescription: `Personal blog about software development and side hustle.`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `@edvinsantonovs`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        tagsPath: '/blog/tags',
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
          {
            title: `Projects`,
            slug: `/projects`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/edvinsantonovs/`,
          },
          {
            name: `Telegram`,
            url: `https://t.me/edvins/`,
          },
          {
            name: `GitHub`,
            url: `https://github.com/ummahusla`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Edvins's Blog about software development and side hustle.`,
        short_name: `edvins-io`,
        description: `Edvins\'s Blog - Blog about software development and side hustle.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
};
