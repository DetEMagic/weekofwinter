import React from 'react'
import s from "./Socialmedia.module.css"
import { animated, useSprings, useInView, config } from '@react-spring/web'
import Facebook from "../icons/facebook.svg"
import Instagram from "../icons/instagram.svg"
import TikTok from "../icons/tiktok.svg"

/**
 * A component that displays social media icons that acts like an external link to that media
 * @component
 * @example
 * <Socialmedia height="50" width="50" animation={false}/>
 */
export default function Socialmedia({width, height, animation = true}) {
  const icons = [
    {
      label:"Facebook",
      type:<Facebook width={width} height={height}/>,
      href: "https://www.facebook.com/Wofwinter",
    },
    {
      label:"Instagram",
      type:<Instagram width={width} height={height}/>,
      href: "https://www.instagram.com/week_of_winter/",
    },
    {
      label:"Tiktok",
      type:<TikTok width={width} height={height}/>,
      href: "https://www.tiktok.com/@weekofwinter/",
    },
  ]

  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform:"translate3d(0, 100px, 0)",
      },
      to: {
        opacity: 1,
        transform:"translate3d(0, 0, 0)",
      },
    }),
    {
      once:true,
      rootMargin:"50px 0px"
    }
  )

  return (
    <animated.div ref={ref} style={animation ? springs : null} className={s.container}>
      {icons.map((icon, i) => 
        <a 
          key={i}
          ref={ref} 
          style={{
            marginRight: i === icons.length-1 ? "0px" : null,
          }}
          className={s.iconContainer}
          href={icon.href} 
          aria-label={icon.label}
          target="_blank"
        >
        {icon.type}
        </a>
      )}
    </animated.div>
  )
}




