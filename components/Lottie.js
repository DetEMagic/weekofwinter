import { useEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import s from "./Lottie.module.css";

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
            className={s.container}
            style={{...props.style}} 
        />
    )
}