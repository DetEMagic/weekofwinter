import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'
import s from "./WordTrail.module.css"
import { calculateHeight } from './calculateHeight'

const Trail = ({ open, children, height }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20, //slide in to left
    height: open ? height: 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={s.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function WordTrail({sentence, textStyle}) {
  const [open, set] = useState(true)
  const [heightRef, height] = calculateHeight();

  return (
    <div className={s.container} style={{height: height}} onClick={() => set(state => !state)}>
      <Trail open={open} height={height}>
        <span ref={heightRef} style={textStyle}>{sentence}</span>
      </Trail>
    </div>
  )
}
