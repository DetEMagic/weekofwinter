import React from 'react'
import s from "./SiteMenu.module.css"

export default function SiteMenu() {
  return (
    <div className={s.container}>
      <div className={`${s.leftCard} ${s.card}`}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at arcu at lorem vehicula aliquam. Nam pulvinar nunc in pharetra suscipit. Quisque aliquet ex a neque fermentum, sit amet viverra lectus consequat. Suspendisse urna est, sodales ut nisl non, laoreet pellentesque velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras condimentum orci at ex gravida, at rhoncus magna varius. Suspendisse quis aliquam nulla.</p>
      </div>
      <div className={`${s.rightCard1} ${s.card}`}>

      </div>
      <div className={`${s.rightCard2} ${s.card}`}>

      </div>
      <div className={`${s.rightCard3} ${s.card}`}>
      </div>
      <div className={`${s.rightCard4} ${s.card}`}>

      </div>
    </div>
  )
}
