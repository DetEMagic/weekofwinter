import React from 'react'
import s from "./Welcome.module.css"

export default function Welcome() {
  return (
    <div className={s.container}>
        <h1 className={s.heading}>
           Week of Winter
        </h1>
        <h2 className={s.subheading}>
            Uppsalas största skidförening
        </h2>
    </div>
  )
}
