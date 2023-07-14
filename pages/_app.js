import { MDXProvider } from '@mdx-js/react'
import { Heading, Text, ResponsiveImage, NextLink, ListItem } from '../components/mdxComponents';
import '../styles/global.css'
import Youtube from '../components/Youtube';
import Layout from '../components/Layout';
//import {Kumbh_Sans} from "next/font/google";
import { Globals, useReducedMotion } from '@react-spring/web';
import { useEffect } from 'react';
import { useScrollRestoration } from '../components/hooks';

//override mdx components
const components = {
  h1: Heading.H2, //should only be one h1 per page so is overrided to prevent errors
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
  Layout,
}


/*
const inter = Kumbh_Sans({ subsets: ['latin'] })
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      */


//The root of the website
export default function MyApp({ Component, pageProps, router }) {
  //If the user has turned on reduce motion on their computer, 
  //the animations will skip to the end. No animation will be shown 
  const reduceMotion = useReducedMotion()

  useEffect(()=> {
    Globals.assign({
      skipAnimation:reduceMotion
    })

    return () => {
      Globals.assign({
        skipAnimation:reduceMotion
      })
    }
  }, [reduceMotion])

  useScrollRestoration(router)

  return (
    <MDXProvider components={components}>
      <Component {...pageProps}/>
    </MDXProvider>
  )
}   
