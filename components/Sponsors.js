import React from 'react';
import s from "./Sponsors.module.css"
import Image from 'next/image';

const images = [
  { id: 1, src: '/sponsors/absolut.png' },
  { id: 3, src: '/sponsors/mb.png' },
  { id: 4, src: '/sponsors/nw.png' },
  { id: 5, src: '/sponsors/skistar.png' },
  { id: 6, src: '/sponsors/salomon.png' },
  { id: 7, src: '/sponsors/stadler.png' },
];

export default function ImageGrid() {
  return (
    <div>
    <h1 className={s.title}>
        Våra Sponsorer
    </h1>
      <div className={s.container}>
        <div className={s.gridContainer}>
          {images.map((image) => (
            <div key={image.id} className={s.gridItem}>
              <Image 
                src={image.src}
                style={{objectFit:"contain"}}
                fill
              />    
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
