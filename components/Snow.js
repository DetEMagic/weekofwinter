import React from 'react'
import ReactDOM from 'react-dom'
import Snowfall from 'react-snowfall'
import s from "./Snow.module.css"

//Component used to display snowfall
export default function Snow() {
    return (
        <div className={s.container}>
            <Snowfall/>
        </div>
    )
  }