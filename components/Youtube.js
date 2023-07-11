import Image from 'next/image'
import React, { useState } from 'react'
import s from "./Youtube.module.css"
import YoutubePlay from "../icons/youtubePlay.svg"

/**
 * Embed a youtube video
 * 
 * @component
 * @example
 * <Youtube 
 *   title="Hallo" 
 *   videoId="tYE42Ntdp18" 
 *   sizes="(max-width: 1024px) 100vw,50vw" // used for optimizing image
 * />
 */
export default function Youtube(
  {
    title, 
    videoId, 
    sizes="(max-width: 1024px) 100vw,50vw",
  }) {

  const [play, setPlay] = useState(false)

  return (
      <>
      {play ? 
        <iframe
          className={s.video}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`Youtube video: ${title}`}
        />
      :
        <button 
          aria-label={`Play ${title}`} 
          onClick={()=>{setPlay(true)}} 
          className={s.video}
        >
          <div className={s.youtubePlay}>
            <YoutubePlay/>
          </div>
          <Image
            className={s.img}
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`Youtube thumbnail: ${title}`}
            sizes={sizes}
            fill
          />
        </button>
      }
      </>
  )
}
