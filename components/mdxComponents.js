import Image from 'next/image'
import Link from 'next/link'
import s from "./mdxComponents.module.css"
import { useInView, animated } from '@react-spring/web'
import { useState } from 'react'

//This file is used for creating components that overides the default behavior of MDX

const Heading = ({children}) => {
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
    }
  )

  return (
    <animated.div ref={ref} style={springs}>
      {children}
    </animated.div>
  )
}

Heading.H2 = (props) => <Heading><h2 {...props}/></Heading> 
Heading.H3 = (props) => <Heading><h3 {...props}/></Heading>
Heading.H4 = (props) => <Heading><h4 {...props}/></Heading>
Heading.H5 = (props) => <Heading><h5 {...props}/></Heading>
Heading.H6 = (props) => <Heading><h6 {...props}/></Heading>

const Text = (props) => {
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
    }
  )

  return (
    <animated.div ref={ref} style={springs}>
      <p {...props}/>
    </animated.div>
  )
}

const ResponsiveImage = (props) => {
  const [enlarge, setEnlarge] = useState(false);

  return (
    <span className={s.imgContainer} onClick={()=>setEnlarge(!enlarge)}>
      <Image alt={props.alt} className={s.img} fill {...props} />
    </span>
  )
}

const NextLink = (props) => (
  <Link href={props.href} {...props}/>
)

const ListItem = (props) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform:"translate3d(-100px, 0, 0)",
      },
      to: {
        opacity: 1,
        transform:"translate3d(0, 0, 0)",
      },
    }),
    {
      once:true,
    }
  )

  return (
    <animated.div ref={ref} style={springs}>
      <li {...props}/>
    </animated.div>
  )
}

export {
  Heading,
  Text,
  ResponsiveImage,
  NextLink,
  ListItem
}