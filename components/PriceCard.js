import React from 'react'
import s from "./PriceCard.module.css"
import CheckMark from "../icons/checkmark.svg"
import PropTypes from 'prop-types';
import AnimatedContainer from './AnimatedContainer'

/**
 * A card to showcase one of many options
 * @component
 * @example
 * <PriceCard
 *   title="Buss"
 *   price="7 395 kr"
 *   popular
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
    popular=false,
  }) {


  return (
    <AnimatedContainer 
      tabIndex={0} 
      transform={popular ? "scale(1.1)" : ""} 
      className={s.container}
    >
      <div>
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
      </div>
      <a href="www.skivenue.se" target={"_blank"} className={s.button}>
        Anmäl 
      </a>
    </AnimatedContainer>
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
