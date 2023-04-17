import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import s from "./Logo.module.css"

export default function Logo({containerClass, imageClass, width=80, height=50, ...props}) {
  return (
    <Link className={`${containerClass} ${s.container}`} href="/" {...props}>
        <div className={s.shadow}/>
        <Image 
            src="/WW.svg"
            alt="Week of Winter logo"
            width={width}
            height={height}
            className={`${imageClass} ${s.image}`}
        />
    </Link>
  )
}
