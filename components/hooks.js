import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
      document.documentElement.style.cssText = "scroll-behavior: auto" // need to override smooth behavior
      window.scrollTo(scrollPos.x, scrollPos.y);
      document.documentElement.style.cssText = ""
  }
}

const useScrollRestoration = (router) => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      let timer;
      let shouldScrollRestore = false;
      window.history.scrollRestoration = 'manual';

      /*
      restoreScrollPos(router.asPath);
      const onBeforeUnload = event => {
        saveScrollPos(router.asPath);
        delete event['returnValue'];
      };
      */

      const onRouteChangeStart = () => {
        saveScrollPos(router.asPath);
      };

      const onRouteChangeComplete = url => {
        if (!shouldScrollRestore) {
          return
        }
        
        if(url.includes("#")) {
          console.log(url)
          const landingPage = document.getElementById("landingPage");
          landingPage ? landingPage.classList.add("removeFlicker"):null
          timer = setTimeout(()=> {
            shouldScrollRestore = false;
            restoreScrollPos(url);
            //landingPage.classList.remove("load")
          }, 1)
        } else {
          shouldScrollRestore = false;
          restoreScrollPos(url);
        }
      };

      //window.addEventListener('beforeunload', onBeforeUnload);
      Router.events.on('routeChangeStart', onRouteChangeStart);
      Router.events.on('routeChangeComplete', onRouteChangeComplete);
      Router.beforePopState(() => {
        shouldScrollRestore = true;
        return true;
      });

      return () => {
        clearInterval(timer)
        //window.removeEventListener('beforeunload', onBeforeUnload);
        Router.events.off('routeChangeStart', onRouteChangeStart);
        Router.events.off('routeChangeComplete', onRouteChangeComplete);
        Router.beforePopState(() => true);
      };
    }
  }, [router]);
}

// Restrict value to be between the range [0, value]
const clamp = (value) => Math.max(0, value);

// Check if number is between two values
const isBetween = (value, floor, ceil) =>
  value >= floor && value <= ceil;

const useScrollspy = (ids, offset= 0) => {
  const [activeId, setActiveId] = useState("");

  useLayoutEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);

          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => isBetween(scroll, top, bottom));

      setActiveId(position?.id || "");
    };

    listener();

    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, [ids, offset]);

  return activeId;
};

export {
  usePreviousValue,
  useCountdown,
  useScrollRestoration,
  useScrollspy,
}
