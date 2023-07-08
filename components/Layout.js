import Head from 'next/head'
import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Image from 'next/image'
import Emoji from './Emoji'
import s from "./Layout.module.css"
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web'

/**
 * A component to define the layout of the html
 * @component
 * @example
 *<Layout>
 * {children}
 *</Layout>
 */
export default function Layout({
  meta,
  children
}) {

  const boxShadow = {boxShadow:`0px 100px 100px 100px ${meta.color}`}
  const [imageIsLoaded, setImageIsLoaded] = useState(false)
  const imgStyle = useSpring({
    from: {
      opacity:0,
    },
    to: {
      opacity:imageIsLoaded ? 1 : 0,
    }
  })

  //<Emoji className={s.emoji} symbol={meta.emoji} label={meta.title}/>

  return (
    <>
      <Head>
        <title>{`${meta.title} - Week of Winter`}</title>
        <meta name="description" content={meta.description} key="desc"/>
        <meta name="keywords" content={meta.keywords} key="keyword"/>
        <meta name="og:description" content={meta.description} key="og:desc"/>
        <meta name="og:image" content={meta.image}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
      </Head>
      <Navbar/>
      <main className={s.main}>
        {meta.image ? 
        <>
        <div style={boxShadow} className={s.imgContainer}>
          <animated.div style={imgStyle}>
            <Image
              src={meta.image}
              alt={meta.title}
              className={s.img}
              onLoad={event => {
                // next/image use an 1x1 px git as placeholder. We only want the onLoad event on the actual image
                if (event.target.src.indexOf('data:image/gif;base64') < 0) {
                  setImageIsLoaded(true)
                }
              }}
              fill
              />
          </animated.div>
          <div className={s.container}>
            <h1>
              {meta.title}
            </h1>
          </div>
        </div>
        </>
        : null}
        <article className={s.mainContent}>
          {children}
        </article>
      </main>
      <Footer/>
    </>
  )
}

Layout.propTypes = {
  /**
   * Meta object to define to page
   */
  meta: PropTypes.shape({
    /**
     * A link to a hosted image
     */
    image: PropTypes.string,
    /** 
     * A emoji 
    */
    emoji: PropTypes.string,
    /**
     * A correct color format
     */
    color: PropTypes.string,
    /**
     * The title of the page
     */
    title: PropTypes.string.isRequired,
    /**
     * The description of the page
     */
    description: PropTypes.string.isRequired,
    /**
     * Keywords for the page
     */
    keywords: PropTypes.string
  }),
  /**
   * The react children of the layout
   */
  children: PropTypes.element
}