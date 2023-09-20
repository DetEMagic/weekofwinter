import React from 'react'
import s from "./Profile.module.css"
import DivideContainer from "./DivideContainer"
import Image from 'next/image'

export default function Profile({
  name,
  title,
  desc,
  quote,
  imageSrc, 
  reverse=false
}) {
  return (
    <section className={s.section}>
      <DivideContainer reverse={reverse} image>
        <div className={s.content}>
          <header>
            <h3 className={s.name}>{name}</h3>
            <span className={s.title}>{title}</span>
          </header>
          {desc}
          Citat - <q className={s.quote}><em>{quote}</em></q>
        </div>
        <Image
          src={imageSrc}
          alt={`Bild på ${name} som är ${title} `}
          className={s.image}
          placeholder="blur"
          sizes="(max-width: 1024px) 100vw,
                  50vw"
          fill
        />
      </DivideContainer>
    </section>
  )
}
