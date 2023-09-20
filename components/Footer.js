import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState, useContext } from 'react'
import s from "./Footer.module.css"
import Socialmedia from './Socialmedia'
import Sponsors from './Sponsors'
import ArrowUp from "../icons/arrow-up.svg"
import InfoBox from './InfoBox';

/**
 * The website footer that will be shown on all pages at the bottom
 * @component
 * @example
 *<Footer/>
 */
export default function Footer() {
  return (  
    <div className={s.container}>
      <Sponsors/>
      <footer className={s.footer}>
        <span className={s.title}>Se till och följ oss på</span>
        <Socialmedia height="50" width="50"/>
        <span>
          {`© Week of Winter 2014-${new Date().getFullYear()} Uppsala`}
        </span>
        <a href='mailto: weekofwinter@gmail.com' className={s.email}> 
          weekofwinter@gmail.com
        </a>
        <button 
          aria-label="Åk upp"
          className={s.arrowup} 
          onClick={() => {
            window.scrollTo({
                top:0,
                left:0, 
                behavior:"smooth",
            })
          }}>
          <ArrowUp width={50} height={50}/>
        </button>
      </footer>
    </div>
  )
}
