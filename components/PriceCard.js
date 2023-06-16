import React from 'react'
import s from "./PriceCard.module.css"
import CheckMark from "../icons/checkmark.svg"
import { useInView, animated } from '@react-spring/web'
import { useMediaQuery } from './hooks'
import PropTypes from 'prop-types';

/**
 * A card to showcase one of many options
 * @component
 * @example
 * <PriceCard
 *   title="Buss"
 *   price="7 395 kr"
 *   popular
 *   delay={500}
 *   includes={[
 *     "Bussresa tur och retur från Uppsala", 
 *     "Boende i skidorten", 
 *     "6 dagars liftkort",
 *     "24/7 service- och jourtelefon", 
 *     "Resegaranti", 
 *     "Guideservice",
 *   ]}
 * />
 */

export default function PriceCard(
  {
    title, 
    price, 
    includes=[], 
    delay=0,
    popular=false,
    once=true,
  }) {

  const matches = useMediaQuery(1095)

  const [ref, springs] = useInView(
    () => ({
      from: {
        transform:"scale(0)"
      },
      to: {
        transform: popular ? "scale(1.1)" : "scale(1)",
        delay:matches ? 0 : delay 
      },
    }),
    {
      once:once
    }
  )

  return (
    <animated.div tabIndex={0} className={s.container} ref={ref} style={springs}>
      {popular ? <span className={s.popular}></span> : null}
      <div className={s.titleContainer}>
        <span className={s.title}>{title}</span>
        <span className={s.price}>{price}</span>
      </div>
      <div className={s.includesContainer}>
        <ul className={s.ul}>
        {includes.map((item, index)=> 
          <li key={index} className={s.li}>
            <div className={s.checkMark}>
                <CheckMark width={30} height={30}/>
            </div>
            {item}
          </li>
        )}
        </ul>
      </div>
    </animated.div>
  )
}

PriceCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  includes: PropTypes.array, 
  delay: PropTypes.number,
  popular: PropTypes.bool,
  once: PropTypes.bool,
}
