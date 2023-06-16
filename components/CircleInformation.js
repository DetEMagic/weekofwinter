import React, { useEffect } from 'react'
import s from "./CircleInformation.module.css"
import { useInView, animated, useSprings, useSpringRef } from '@react-spring/web'
import PropTypes from 'prop-types';

/**
 * Component for showing information in a circular fashion
 * @component
 * @example
 * <CircleInformation
 *  title="Flyg"
 *  subTitle="9 999kr"
 *  info={[
 *    "Allting ingår i flyg"
 *  ]}
 * />
 */
export default function CircleInformation({
  title, 
  subTitle, 
  info = [], 
  backgroundColor = "none", 
  circleColor= "currentColor",
  titleColor = "currentColor",
  subTitleColor = "currentColor",
  circleWidth=4,
  duration=1500
}) {
  const [ref, inView] = useInView(
    () => ({
      from: {
        val:0
      },
      to: {
        val:100
      },
      config:{
        duration:duration
      }
    }),
    {
      once:true
    }
  )

  const half = Math.ceil(info.length / 2);
  const rightText = info.slice(0, half)
  const leftText = info.slice(half)
  
  const interval = duration/8

  const leftRef = useSpringRef()
  const [springsLeft] = useSprings(
    leftText.length,
    (index) => ({
      ref:leftRef,
      from: { transform: "scale(0)"},
      to: { transform: "scale(1)" },
      delay:(interval*rightText.length)+((leftText.length-index)*interval),
    }),
    []
  )

  const rightRef = useSpringRef()
  const [springsRight] = useSprings(
    rightText.length,
    (index) => ({
      ref:rightRef,
      from: { transform: "scale(0)"},
      to: { transform: "scale(1)" },
      delay:index*interval,
    }),
    []
  )

  useEffect(()=> {
    if(inView.val.isAnimating || inView.val.hasAnimated) {
      rightRef.start()
      leftRef.start()
    }
  }, [inView.val.isAnimating, inView.val.hasAnimated])


  //https://medium.com/tinyso/how-to-create-an-animated-svg-circular-progress-component-in-react-5123c7d24391
  const size = 300
  const viewBox = `0 0 ${size} ${size}`
  const radius = (size - circleWidth)/2
  const circumference = radius * Math.PI * 2

  return (
    <div ref={ref} className={s.container}>
      <div className={s.leftContainer}>
        {springsLeft.map((props, index) => 
          <animated.span key={index} style={props} className={index % 2 === 0 ? s.right : null}>
            {leftText[index]}
          </animated.span>
        )}
      </div>
      <svg viewBox={viewBox}>
        <animated.circle
          fill={backgroundColor}
          stroke={circleColor}
          cx={size/2}
          cy={size/2}
          r={radius}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          strokeDasharray={
            inView.val.to(val => {
              const dash = (val*circumference)/100
              return [dash, circumference-dash]
            })
          }
          strokeLinecap="round"
          strokeWidth={`${circleWidth}px`}
        />
        <text
          className={s.title}
          x="50%"
          y="50%"
          fill={titleColor}
          textAnchor='middle'
        >
          {title}
        </text>
        <text
          className={s.subTitle}
          fill={subTitleColor}
          x="50%"
          y="80%"
          textAnchor='middle'
        >
          {subTitle}
        </text>
      </svg>
      <div className={s.rightContainer}>
        {springsRight.map((props, index) => 
          <animated.span key={index} style={props} className={index % 2 === 0 ? s.left: null}>
            {rightText[index]}
          </animated.span>
        )}
      </div>
    </div>
  )
}

CircleInformation.propTypes = {
  /**
   * The title 
   */
  title: PropTypes.string.isRequired,

  /**
   * The subtitle 
   */
  subTitle: PropTypes.string, 

  /**
   * An array with information that will be displayed around the circle
   */
  info: PropTypes.arrayOf(PropTypes.string),

  /**
   * The main color of the circle
   */
  backgroundColor: PropTypes.string,

  /**
   * The color of circle outline
   */
  circleColor: PropTypes.string,

  /**
   * The color of the title
   */
  titleColor: PropTypes.string,

  /**
   * The color of the subtitle
   */
  subTitleColor: PropTypes.string,

  /**
   * How wide the circle is
   */
  circleWidth: PropTypes.number,

  /**
   * The duration of the animation in ms 
   */
  duration: PropTypes.number
}