import '../styles/global.css'
import { Globals, useReducedMotion } from '@react-spring/web';
import { useEffect } from 'react';
import { useScrollRestoration } from '../components/hooks';


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
    <Component {...pageProps}/>
  )
}   
