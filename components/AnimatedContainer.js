import React from 'react'
import { useInView, animated } from '@react-spring/web'

export default function AnimatedContainer({children, transform="", ...props}) {
  const [ref, springs] = useInView(
    () => ({
      from: {
        transform:`translate3d(0, 100px, 0) ${transform}`,
      },
      to: {
        transform:`translate3d(0, 0, 0) ${transform}`,
      },
    }),
    {
      once:true,
    }
  )

  return (
    <animated.div ref={ref} style={springs} {...props}>
      {children}
    </animated.div>
  )
}
