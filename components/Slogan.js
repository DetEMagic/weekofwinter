import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import s from "./Slogan.module.css"

export default function Slogan({firstWord, phrases}) {
    const [index, setIndex] = useState(0); 
    // Define an array of colors
    const colors = ["red", "green", "blue", "yellow"];
    // Create a style object with a color property that changes based on the index
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        reset: true,
        reverse: index % 2 === 0,
        delay: 200,
        onRest: () => setIndex(index + 1),
        config: { duration: 3000},
        loop: true 
    });

    return (
        <div className={s.container}>
            <h1>{firstWord}</h1>
            <animated.div style={{...style, color: colors[index % colors.length]}}>
                <h1>{phrases[index % phrases.length]}</h1> 
            </animated.div>
        </div>
    )


}
