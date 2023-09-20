import React from 'react';
import s from "./Sponsors.module.css"
import stolt from "../public/image/sponsor/stoltOfSweden.jpg"
import skivenue from "../public/image/sponsor/skivenue.png"
import abro from "../public/image/sponsor/abro.jpg"
import Image from 'next/image';

const images = [
  { 
    alt: "Stolt of ski" , 
    href: "https://www.stoltski.com/",
    src: stolt,
  },
  { 
    alt: "Skivenue", 
    href:"https://www.skivenue.se/",
    src: skivenue,
  },
  { 
    alt: "Åbro", 
    href:"https://www.abro.se/",
    src: abro,
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
    <section className={s.section}>
      <header className={s.title}>
        <h2>Sponsorer</h2>
      </header>
      <div className={s.container}>
      {images.map((image, key) => (
        <a 
          key={key} 
          href={image.href}
          target='_blank'
          className={s.gridItem}
        >
          <Image 
            src={image.src}
            alt={image.alt + " logo"}
            style={{objectFit:"contain"}}
            placeholder="blur"
            sizes="(max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw"
            fill
          />    
        </a>
      ))}
      </div>
    </section>
  );
};
