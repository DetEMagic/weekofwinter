import React from 'react'
import s from "./Trip.module.css"
import Image from 'next/image'
import Date from "../icons/date.svg"
import Place from "../icons/place.svg"
import TicketBlack from "../icons/ticketBlack.svg"
import AnimatedContainer from './AnimatedContainer'
import DivideContainer from './DivideContainer'

//Component used to divide content to the left and right beside each other
export default function Trip({
  imageSrc, 
  imageAlt,
  title,
  date,
  ticket,
  place,
  placeLink,
  description,
}) {
  return (
    <DivideContainer reverse image>
      <>
        <AnimatedContainer>
          <header>
            <h2 className={s.title}>{title}</h2>
          </header>
        </AnimatedContainer>
        <AnimatedContainer>
          <span className={s.date}>
            <Date width={30} height={30} className={s.icon}/>
            {date}
          </span>
          <span className={s.date}>
            <Place width={30} height={30} className={s.icon}/>
            <a href={placeLink} target='_blank'>{place}</a>
          </span>
          <span className={s.date}>
            <TicketBlack width={30} height={30} className={s.icon}/>
            {ticket}
          </span>
        </AnimatedContainer>
        <AnimatedContainer>
          {description}
        </AnimatedContainer>
      </>
      <Image
        src={imageSrc}
        alt={imageAlt}
        className={s.image}
        placeholder="blur"
        sizes="(max-width: 1024px) 100vw,
                50vw"
        fill
      />
    </DivideContainer>
  )
}
