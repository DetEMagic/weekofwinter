import React from 'react'
import Emoji from './Emoji'
import s from "./InfoCard.module.css"
import PropTypes from 'prop-types';
import AnimatedContainer from './AnimatedContainer';

/**
 * A card to showcase information with a title, description and an icon 
 * @component
 * @example
 * <InfoCard
 *   title="Eventpaket. "
 *   desc="Gillar du att gå på evenemang?"
 *   icon={<Ticket width={70} height={70}/>}
 * />
 */
export default function InfoCard({title, desc, icon}) {
  return (
    <AnimatedContainer tabIndex={0} className={s.container}>
      <div className={s.icon}>
        {icon}
      </div>
      <p className={s.p}>
        <strong >{title}</strong>
        {desc}
      </p>
    </AnimatedContainer>
  )
}

InfoCard.propTypes = {
  /**
   * The title of the card
   */
  title: PropTypes.string.isRequired,
  /**
   * The description of the card
   */
  desc: PropTypes.string.isRequired,
  /**
   * The icon of the card
   */
  icon: PropTypes.element
}