import { useEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light.min.js";
import s from "./Lottie.module.css";

/**
 * A component to handle lottie files
 * @component
 * @example
 * <Lottie style={{marginTop:"40px"}} url="/lottie/404.json"/>
 * 
*/

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
        console.log(instance)

        return () => instance.destroy();
    },[])


    return (
        <div 
            ref={container}
            {...props}
            className={`${s.container} ${props.className || ""}`}
        />
    )
}