import React, { useState, useEffect } from 'react';
import { animated, useSpring, config, useInView, to } from "@react-spring/web";
import s from "./Countdown.module.css";
import { usePreviousValue, useCountdown } from './hooks';
import PropTypes from 'prop-types';


const FlipCard = ({number}) => {
  const prevNumber = usePreviousValue(number);

  const frontCardAnimation = useSpring({
    from: { transform: "rotateX(0deg)" },
    to: { transform: "rotateX(-180deg)" },
    delay: 0,
    immediate: prevNumber === number || prevNumber === 0,
    config:{duration:500},
    reset: true,
  });

  const backCardAnimation = useSpring({
    from: { transform: "rotateX(180deg)" },
    to: { transform: "rotateX(0deg)" },
    delay: 0,
    immediate: prevNumber === number || prevNumber === 0,
    config:{duration:500},
    reset: true
  });

  return (
    <animated.div className={s.cardContainer}>
      <div className={s.cardTop}>
        <span>
        {number}
        </span>
      </div>
      <div className={s.cardBottom}>
        <span>
        {prevNumber}
        </span>
      </div>
      <animated.div className={s.cardTopAnimated} style={frontCardAnimation}>
        <span>
        {prevNumber}
        </span>
      </animated.div>
      <animated.div className={s.cardBottomAnimated} style={backCardAnimation}>
        <span>
        {number}
        </span>
      </animated.div>
    </animated.div>
  )
}

/**
 * A flipclock countdown timer that displays days, hours, minutes and seconds
 * @component
 * @example
 * <Countdown 
 *   title="Avresa Val d'isere"
 *   date={new Date(2024, 1, 14, 18, 0, 0)}
 *   dateExpired={
 *     <h2>TAGGA!</h2>
 *   }
 * />
 */
export default function Countdown({title, date, dateExpired}) {
  const [days, hours, minutes, seconds] = useCountdown(date); 

  const [ref, inView] = useInView()

  if (days + hours + minutes + seconds <= 0 && dateExpired) {
    return dateExpired 
  } else {
    return (
      <div className={s.container}>
          <h2>{title}</h2>
          <animated.div ref={ref} className={s.countDownContainer}>
            {inView ? 
            <>
              <div className={s.title}>
                <FlipCard number={days}/>
                <h5>Dagar</h5>
              </div>
              <div className={s.title}>
                <FlipCard number={hours}/>
                <h5>Timmar</h5>
              </div>
              <div className={s.title}>
                <FlipCard number={minutes}/>
                <h5>Minuter</h5>
              </div>
              <div className={s.title}>
                <FlipCard number={seconds}/>
                <h5>Sekunder</h5>
              </div>
            </>
            :null}
          </animated.div>
      </div>
    );
  }
};

Countdown.propTypes = {
  /**
   * The title of the countdown 
   */
  title: PropTypes.string.isRequired,

  /**
   * The date when the countdown should end
   */
  date: PropTypes.instanceOf(Date).isRequired,

  /**
   * The element that is displayed when the countdown ends
   */
  dateExpired: PropTypes.element,
}
