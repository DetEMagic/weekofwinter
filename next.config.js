const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        providerImportSource: "@mdx-js/react",
    },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    //React's Strict Mode is a development mode only feature for highlighting potential problems in an application. 
    //It helps to identify unsafe lifecycles, legacy API usage, and a number of other features.
    reactStrictMode: true,
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ['sv-Sv', 'en-UK'],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: 'sv-Sv'
    },
    images: {
        domains: ['www.freepnglogos.com','div2procdn.shopdutyfree.com'],
    },
}

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)
