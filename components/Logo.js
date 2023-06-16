import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import WW from "../icons/logo.svg"
import s from "./Logo.module.css"

/**
 * The website logo
 * @component
 * @example
 * <Logo containerClass={s.logo} onClick={()=>isMenuOpen ? animateMenu("/") : null}/>
 */
export default function Logo({containerClass, imageClass, width=80, height=50, ...props}) {
  return (
    <>
    <div className={s.shadow}/>
    <Link className={`${containerClass} ${s.container}`} href="/" {...props}>
        <WW
            width={width}
            height={height}
            className={`${imageClass} ${s.image}`}
        />
    </Link>
    </>
  )
}
