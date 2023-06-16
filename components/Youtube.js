import React from 'react'
import s from "./Youtube.module.css"

/**
 * Embed a youtube video
 * @component
 * @example
 * <Youtube title="Hallo" videoId="tYE42Ntdp18"/>
 */
export default function Youtube({videoId, title}) {
    return (
        <iframe
            className={s.video}
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
        />
    )
}
