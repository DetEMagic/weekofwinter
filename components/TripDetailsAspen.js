import React from 'react'
import s from "./TripDetails.module.css"

export default function TripDetailsAspen() {
  return (
    <div className={s.container}>
        <div className={s.box}>
            <h1 className={s.title}>82</h1>
            <p className={s.desc}> Barer</p>
        </div>
        <div className={s.box}>
            <h1 className={s.title}>02:30</h1>
            <p className={s.desc}> Stängning av Nattklubb</p>
        </div>
        <div className={s.box}>
            <h1 className={s.title}>188</h1>
            <p className={s.desc}> Lyxbutiker</p>
        </div>
    </div>
    
  )
}

