import React, { useRef, useEffect } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import s from "./Information.module.css"


export default function Information({title, desc, textColor, backgroundColor}) {

    /*
    const target = useRef(null)
    const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
        () => ({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            zoom: 0,
            x: 0,
            y: 0,
            config: { mass: 5, tension: 350, friction: 40 },
        })
    )

    const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }))

    useGesture(
        {
        onMove: ({ xy: [px, py]}) =>
            api({
                rotateX: -(py - y.get() - window.innerHeight) / 180,
                rotateY: (px - x.get() - window.innerWidth) / 180,
                scale: 1.03,
            }),
        onHover: ({ hovering }) =>
            !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
        },
        { target, eventOptions: { passive: false } }
    )
    */
    console.log(desc)
  return (
    <animated.div
        className={s.container}
        /*
        ref={target}
        style={{
            x,
            y,
            scale: to([scale, zoom], (s, z) => s + z),
            rotateX,
            rotateY,
            rotateZ,
            backgroundColor:backgroundColor
        }}
        */
    >
        {title ? 
        <h2 className={s.title} style={{color:textColor}}>{title}</h2>
        : null}
        <p style={{color:textColor}}>{desc}</p>
    </animated.div>
  )
}
