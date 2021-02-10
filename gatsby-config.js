require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteTitle: `Edvins Antonovs`,
    siteTitleAlt: `Edvins Antonovs`,
    siteHeadline: `Edvins Antonovs - My digital garden`,
    siteUrl: `https://edvins.io/`,
    siteDescription: `My digital garden`,
    siteLanguage: `en`,
    siteImage: `/banner.png`,
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
          {
            title: `Self-education`,
            slug: `/self-education`,
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
            src: `/android-chrome-256x256.png`,
            sizes: `256x256`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/blog/*`],
        runtimeCaching: [
          // previous definitions from the default config
          (...),
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'cacheFirst',
            options: {
              cacheableResponse: {
                statuses: [0, 200]
              },
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxAgeSeconds: 60 * 60,
                maxEntries: 30
              }
            }
          },
        ]
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-responsive-iframe`],
      },
    }
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
};
