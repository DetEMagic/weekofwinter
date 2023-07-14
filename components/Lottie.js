//This file is used to handle lottie-files, however lottie_light is currently
//as large as nextjs, 45KB gzipped size which makes the website 
//load speed much slower.
/*
import { useEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import s from "./Lottie.module.css";

/**
 * A component to handle lottie files
 * @component
 * @example
 * <Lottie style={{marginTop:"40px"}} url="/lottie/404.json"/>
 * 
export default function Lottie({url, loop=true, autoplay=true, ...props}) {

    const container = useRef(null);

    useEffect(()=> {
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:"svg",
            loop:loop,
            autoplay:autoplay,
            path:url,
            rendererSettings:{
                preserveAspectRatio: 'xMidYMid meet' //Great setting
            }
        })

        return () => instance.destroy();
    },[])


    return (
        <div 
            ref={container}
            className={`${s.container} ${props.className}`}
            {...props}
        />
    )
}
*/