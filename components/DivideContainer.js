import React from 'react'
import AnimatedContainer from './AnimatedContainer'
import s from "./DivideContainer.module.css"

export default function DivideContainer({reverse=false, image=false, ...props}) {
  return (
    <div className={`${reverse ? s.reverse : ""}  ${s.container} `}>
      <div className={`${s.content} ${reverse ? "" : ""}`}>
        {props.children[0]}
      </div>
      <AnimatedContainer className={`${s.content} ${image ? s.image : ""} ${reverse ? s.right : s.left}`}>
        {props.children[1]}
      </AnimatedContainer>
    </div>
  )
}
