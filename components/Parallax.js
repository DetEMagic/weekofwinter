import React from 'react'
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

const calc = (o) => `translateY(${o * 1}px)`;

export default function Parallax() {
    const ref = useRef();
    const [{ offset }, set] = useSpring(
        () => ({ 
            offset: 0 
        }));

    const handleScroll = () => {
        const posY = ref.current.getBoundingClientRect().top;
        const offset = window.pageYOffset - posY;
        set({ offset });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    });
    return (
        <div
            style={{
            background: "#eee"
            }}
        >
            <div
                ref={ref}
                style={{
                    background: "red",
                    position: "relative",
                    width: "100vw",
                    height: "400px"
                }}
            >
            <animated.div
                style={{
                    background: "blue",
                    position: "absolute",
                    width: "100vw",
                    height: "100px",
                    top: 0,
                    left: 0,
                    transform: offset.interpolate(calc)
                }}
            />
            </div>
            <div>
            </div>
        </div>
    )
}
