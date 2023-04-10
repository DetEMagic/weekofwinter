import React from 'react'
import Image from 'next/image'
import s from "./Socialmedia.module.css"
import { animated, useSprings, useInView, config } from '@react-spring/web'

const icons = [
  {
    src:"facebook",
    href: "https://www.facebook.com/Wofwinter",
  },
  {
    src:"instagram",
    href: "https://www.instagram.com/week_of_winter/",
  },
  {
    src:"tiktok",
    href: "https://www.facebook.com/Wofwinter",
  },
  /*
  {
    id:4,
    src:"discord.svg",
    alt:"discord",
    href: "https://www.facebook.com/Wofwinter",
  },
  {
    id:5,
    src:"snapchat.svg",
    alt:"snapchat",
    href: "https://www.facebook.com/Wofwinter",
  },
  {
    id:6,
    src:"youtube.svg",
    alt:"youtube",
    href: "https://www.facebook.com/Wofwinter",
  },
  */
]

const Icon = ({width, height, black, index}) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        x:-(index+1-icons.length)*width, 
        y: 0,
      },
      to: {
        x: 0,
        y: 0,
      },
      config: config.wobbly
    }),
  )

  return (
    <animated.div ref={ref} style={springs}>
      <a 
        style={index !== icons.length-1 ? {marginRight:"20px"}: null}
        href={icons[index].href} 
        target="_blank"
      >
        <Image src={`/icons/${icons[index].src}${black ? "" : "_w"}.svg`} width={width} height={height} alt={icons[index].src}/>
      </a>
    </animated.div>
  )
}


export default function Socialmedia({width, height, black}) {

  return (
    <div className={s.container}>
      {icons.map((_, i) => <Icon key={i} width={width} height={height} black={black} index={i}/>)}
    </div>
  )
}




