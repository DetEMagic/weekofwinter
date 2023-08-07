import React from 'react'
import s from "./ImageGallery.module.css"
import Image from 'next/image'

const albums = [
  {
    title:"Val thorens 2023",
    album:"",
    albumCover:"https://lh3.googleusercontent.com/pw/AJFCJaWoAz0nW-zUqYt18d9t0YneC1gtYmNOTr5T1E0tGkjjn8LwZY5b4GJJnpt6L61vAComp2w50fRTc6K366adZ4uOfA-x617W-tbc8gDkkN8Xmzlo2xRUSd3mrJFSDhlMIE6TeShHxwJt9nQlpP4W95d4=w1250-h1666-s-no?authuser=0",
  },
  {
    title:"Les Arcs 2022",
    album:"",
    albumCover:"https://lh3.googleusercontent.com/pw/AJFCJaXYwz9L06ewRG6uL1wrb6duZjKUr_NJSg_TMLwB7UkgCVRC-EZpSRd7nK1Ky-IuMX5T1_zJBJ62sqtby-T0oA8qQwtLJ8LP3qvXrvuQEKsKlL9OcH-S7Fiqd8P0Pf2ZiBhDG5Pfzs6gR9hW4K84pc5n=w710-h946-s-no?authuser=0",
  },
]

/**
 * A component to show links to google photos album 
 * @component
 * @example
 * <ImageGallery/>
 */
export default function ImageGallery() {
  return (
    <div className={s.container}>
      {albums.map((img, i)=>
        <a aria-label={`Länk till fotoalbumet ${img.title}`} key={i} href={img.album} target='_blank'>
          <div className={`${s.imageContainer}`}>
            <Image
              src={img.albumCover}
              className={s.image}
              alt={img.title}
              fill
              sizes="(max-width: 640px) 100vw,
                      50vw"
            />
            <h4 className={s.title}>{img.title}</h4>
          </div>
        </a>
      )}
    </div>
  )
}
