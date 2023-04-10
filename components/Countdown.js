import React from 'react';
import { useCountdown } from './useCountDown';
import { FlipCard } from './FlipCard';
import { animated, useSpring, config } from "react-spring";
import s from "./Countdown.module.css";





const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Avresa!</span>
    </div>
  );
};

 const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a>
      <div className={s.container}>
            <h1 className={s.text}>Dagar</h1>
            <h1 className={s.text}>Timmar</h1>
            <h1 className={s.text}>Minuter</h1>
            <h1 className={s.text}>Sekunder</h1>
          </div>
        <div className={s.displayWindow}>
          <FlipCard>{days}</FlipCard>
          <FlipCard>{hours}</FlipCard>
          <FlipCard>{minutes}</FlipCard>
          <FlipCard>{seconds}</FlipCard>
        </div>
      </a>
    </div>
  );
};

const CountdownTimer = ({TargetDate}) => {
  const [days, hours, minutes, seconds] = useCountdown(TargetDate); 
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;

