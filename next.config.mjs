import nextMDX from '@next/mdx';
import emoji from 'remark-emoji';


const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [
            [emoji, { accessible: true }]
        ],
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
        domains: [
            'www.freepnglogos.com',
            'div2procdn.shopdutyfree.com', 
            'lh3.googleusercontent.com'
        ],
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
