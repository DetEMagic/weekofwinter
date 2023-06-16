import React from 'react';
import s from "./Sponsors.module.css"
import Image from 'next/image';

const images = [
  { 
    alt: "Absolut" , 
    src: '/sponsors/absolut.png' 
  },
  { 
    alt: "Mercedes", 
    src: '/sponsors/mb.png' 
  },
  { 
    alt: "Nordic Wellness", 
    src: '/sponsors/nw.png' 
  },
  { 
    alt: "Skistar", 
    src: '/sponsors/skistar.png' 
  },
  { 
    alt: "Salomon",
    src: '/sponsors/salomon.png' 
  },
  { 
    alt: "Stadler",
    src: '/sponsors/stadler.png' 
  },
];

/**
 * Displays all the sponsors logo
 * @component
 * @example
 * <Sponsors/>
 */
export default function Sponsors() {
  return (
    <div className={s.container}>
      {images.map((image, key) => (
        <div key={key} className={s.gridItem}>
          <Image 
            src={image.src}
            alt={image.alt + " logo"}
            style={{objectFit:"contain"}}
            sizes="(max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw"
            fill
          />    
        </div>
      ))}
    </div>
  );
};
