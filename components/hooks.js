import { useCallback, useEffect, useRef, useState } from "react";

/**
 * This hook is used to get the previous value
 * @param {number} currentValue - the value to be used when calculting the previous value
 * @returns {number} the previous value
 * @example
 * usePreviousValue(10)
 */
const usePreviousValue = (currentValue) => {
  const previousValue = useRef(0);
  useEffect(() => {
    previousValue.current = currentValue;
  }, [currentValue]);
  return previousValue.current;
};

/**
 * Helper function to useCoundown which is used to calculate the time left in days, hours, minutes and seconds with a date object
 */
const calculateTime = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

/**
 * This hook is used to return the day, hour, minute and seconds left of the countdown
 * //https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks
 * @param {date} date - the date when the countdown ends
 * @returns {[number, number , number, number]} [days, hours, minutes, seconds] the time left of the countdown 
 * @example
 * useCountdown(new Date(2024, 1, 14, 18, 0, 0))
 */
const useCountdown = (date) => {
  const [countDown, setCountDown] = useState(1000)

  useEffect(() => {
    setCountDown(date.getTime() - new Date().getTime())
    const interval = setInterval(() => {
      setCountDown(date.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return calculateTime(countDown);
};



/**
 * This hook is used to apply different styles depending on the window size
 * //https://stackoverflow.com/questions/72238021/how-to-apply-media-query-in-nextjs
 * @param {number} maxWidth - the css max-width that is used with media query selector 
 * @returns {boolean} true if the window size is less than maxWidth otherwise false
 * @example
 * useMediaQuery(1024)
 */
const useMediaQuery = (maxWidth) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e) => {
    if (e.matches) setTargetReached(true)
    else setTargetReached(false)
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`)
    media.addEventListener('change', updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true)

    return () => media.removeEventListener('change', updateTarget)
  }, [])

  return targetReached
}

export {
  usePreviousValue,
  useCountdown,
  useMediaQuery,
}
