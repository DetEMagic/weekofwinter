import React from 'react'
import s from "./InfoBox.module.css"
import { useInView, animated, config } from '@react-spring/web'
import PropTypes from 'prop-types';

/**
 * A component to showcase information inside of a box with a number that animates
 * @component
 * @example
 * <InfoBox
 *   startValue={10}
 *   value={3.5}
 *   valueAfter="€"
 *   desc="Bärs på Krazy Kanguruh"
 * />
 */
export default function InfoBox(
  {
    valueBefore,
    value,
    valueAfter,
    startValue=0,
    desc, 
    duration=1000,
    once=true
  }) {

  const [ref, springs] = useInView(
    () => ({
      from: {
        val:startValue
      },
      to: {
        val:value
      },
      config:{
        duration:duration
      }
    }),
    {
      once:once
    }
  )

  return (
    <div tabIndex={0} className={s.container}>
      <div className={s.value} ref={ref}>
        {valueBefore}
        <animated.span>
          {springs.val.to(val=>value % 1 === 0 ? Math.floor(val) : val.toFixed(1))}
        </animated.span>
        {valueAfter}
      </div>
      <span className='h5'>{desc}</span>
    </div>
  )
}

InfoBox.propTypes = {
  /**
   * The value before the value
   */
  valueBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The important value to showcase which will be animated
   */
  value: PropTypes.number.isRequired,
  /**
   * The value after the value
   */
  valueAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The start value of the animation
   */
  startValue: PropTypes.number,
  /**
   * The description of the information
   */
  desc: PropTypes.string.isRequired, 
  /**
   * The duration of the animation
   */
  duration: PropTypes.number,
  /**
   * If the animation runs once or forever 
   */
  once:PropTypes.bool
}