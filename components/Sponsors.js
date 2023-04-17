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

export default function ImageGrid() {
  return (
    <div className={s.container}>
      {images.map((image, key) => (
        <div key={key} className={s.gridItem}>
          <Image 
            src={image.src}
            alt={image.alt + " logo"}
            style={{objectFit:"contain"}}
            fill
          />    
        </div>
      ))}
    </div>
  );
};
