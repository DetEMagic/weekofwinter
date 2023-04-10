import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react'
import { Heading, Text, ResponsiveImage, NextLink, ListItem } from '../components/mdxComponents';
import Footer from '../components/Footer';
import '../styles/global.css'
import Navbar from '../components/Navbar';
import Youtube from '../components/Youtube';
import Lottie from '../components/Lottie';

const components = {
  h1: Heading.H1,
  h2: Heading.H2,
  h3: Heading.H3,
  h4: Heading.H4,
  h5: Heading.H5,
  h6: Heading.H6,
  p: Text,
  img: ResponsiveImage,
  a: NextLink, 
  li: ListItem,
  Youtube,
  Lottie,
  /*
  p: Text,
  pre: Pre,
  code: InlineCode,
  */
}

function defaultLayout(page) {
  return (
    <>
      <Navbar/>
      <main>
        <article className='mainContent'>
          {page}
        </article>
      </main>
      <Footer/>
    </>
  )
}


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? defaultLayout 

  return (
    <MDXProvider components={components}>
      <Head>
        <title>Week of Winter</title>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta charset="utf-8"/>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </MDXProvider>
  )
}   