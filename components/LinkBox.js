import Link from 'next/link'
import React, { useState } from 'react'
import s from "./LinkBox.module.css"
import Arrow from "../icons/rightArrow.svg"
import { useSpring, animated } from '@react-spring/web'
import { useRouter } from 'next/router'
import AnimatedContainer from './AnimatedContainer'

export default function LinkBox({name, href}) {

  const [isBooped, setIsBooped] = useState(false);

  const style = useSpring({
    display:"flex",
    transform: isBooped ? `translate3d(7px, 0, 0)`: `translate3d(0px, 0, 0)`,
  });


  return (
    <AnimatedContainer className="h5">
      <Link
        href={href}
        className={s.container}
        onMouseEnter={()=> setIsBooped(!isBooped)}
        onMouseLeave={()=> setIsBooped(!isBooped)}
      >
      <span 
        style={name.trim().includes(" ") ? null : {whiteSpace:"nowrap"}} 
        className={s.name}
      >
        {name}
      </span>
      <animated.span style={style}>
        <Arrow width={35} height={35}/>
      </animated.span>
      </Link>
    </AnimatedContainer>
  )
}
