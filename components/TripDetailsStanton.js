import React from 'react'
import s from "./TripDetails.module.css"

export default function TripDetailsStanton() {
  return (
    <div className={s.container}>
        <div className={s.box}>
            <h1 className={s.title}>12</h1>
            <p className={s.desc}> Afterski Barer</p>
        </div>
        <div className={s.box}>
            <h1 className={s.title}>04:30</h1>
            <p className={s.desc}> Stängning av Nattklubb</p>
        </div>
        <div className={s.box}>
            <h1 className={s.title}>3.5€</h1>
            <p className={s.desc}> Bärs på Krazy Kanguruh</p>
        </div>
    </div>
    
  )
}

