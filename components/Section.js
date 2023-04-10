import React from 'react'
import s from "./Section.module.css"

export default function Section({rightContent, leftContent}) {
  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        <div className={s.leftContent}>
          {leftContent}
        </div>
        <div className={s.rightContent}>
          {rightContent}
        </div>
      </div>
    </div>
  )
}
