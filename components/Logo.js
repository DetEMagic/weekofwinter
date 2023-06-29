import React from 'react'
import Link from 'next/link'
import WW from "../icons/logo.svg"
import s from "./Logo.module.css"
import { useRouter } from 'next/router'

/**
 * The website logo
 * @component
 * @example
 * <Logo containerClass={s.logo} onClick={()=>isMenuOpen ? animateMenu("/") : null}/>
 */
export default function Logo({containerClass, imageClass, width=70, height=40, ...props}) {
  const router = useRouter()

  return (
    <>
    <div className={s.shadow}/>
    <Link 
      aria-label='returnToHomePage'
      className={`${containerClass} ${s.container}`} 
      href="/" 
      {...props}
    >
        <WW
            width={width}
            height={height}
            className={`${imageClass} ${s.image}`}
        />
    </Link>
    </>
  )
}
