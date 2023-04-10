import React from 'react'
import s from "./Button.module.css"

export default function Button({title, onClick}) {
  return (
    <button onClick={onClick} className={s.button}>{title}</button>
  )
}
