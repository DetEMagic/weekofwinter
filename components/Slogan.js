import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'

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
        <span>
            {firstWord}
            <animated.span style={{...style, color: colors[index % colors.length]}}>
                {" " +phrases[index % phrases.length]}
            </animated.span>
        </span>
    )
}

