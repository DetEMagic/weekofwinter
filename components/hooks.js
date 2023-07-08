import { useCallback, useEffect, useRef, useState } from "react";
import Router from "next/router";

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

function saveScrollPos(url) {
  const scrollPos = { x: window.scrollX, y: window.scrollY };
  sessionStorage.setItem(url, JSON.stringify(scrollPos));
}

function restoreScrollPos(url) {
  const scrollPos = JSON.parse(sessionStorage.getItem(url));
  if (scrollPos) {
    setTimeout(()=> { //Utan denna så kommmer webläsaren att scrolla till t.ex. #om när man går bakåt i webläsaren 
      document.documentElement.style.cssText = "scroll-behavior: auto" // need to override smooth behavior
      window.scrollTo(scrollPos.x, scrollPos.y);
      document.documentElement.style.cssText = ""
    }, 0)
  }
}

const useScrollRestoration = (router) => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      let shouldScrollRestore = false;
      window.history.scrollRestoration = 'manual';
      restoreScrollPos(router.asPath);

      const onBeforeUnload = event => {
        saveScrollPos(router.asPath);
        delete event['returnValue'];
      };

      const onRouteChangeStart = () => {
        saveScrollPos(router.asPath);
      };

      const onRouteChangeComplete = url => {
        if (shouldScrollRestore) {
          shouldScrollRestore = false;
          restoreScrollPos(url);
        }
      };

      window.addEventListener('beforeunload', onBeforeUnload);
      Router.events.on('routeChangeStart', onRouteChangeStart);
      Router.events.on('routeChangeComplete', onRouteChangeComplete);
      Router.beforePopState(() => {
        shouldScrollRestore = true;
        return true;
      });

      return () => {
        window.removeEventListener('beforeunload', onBeforeUnload);
        Router.events.off('routeChangeStart', onRouteChangeStart);
        Router.events.off('routeChangeComplete', onRouteChangeComplete);
        Router.beforePopState(() => true);
      };
    }
  }, [router]);
}

export {
  usePreviousValue,
  useCountdown,
  useScrollRestoration,
}
