import React, { useRef, useState } from 'react'
import s from "./Faq.module.css"
import Image from 'next/image'
import { useSpring, animated } from '@react-spring/web'
import Plus from "../icons/plus.svg"
import Minus from "../icons/minus.svg"
import Emoji from './Emoji'
import PropTypes from 'prop-types';

const GrundPaket = () => (
  <ul className={s.grundpaket}>
    <li><Emoji symbol="🚌" label="Bus"/> Bussresa tur och retur från Uppsala</li>
    <li><Emoji symbol="🏠" label="House"/> Boende i skidorten</li>
    <li><Emoji symbol="💳" label="Credit card"/> 6 dagars liftkort</li>
    <li><Emoji symbol="📄" label="Taxes"/> Skatter och avgifter</li>
    <li><Emoji symbol="⛷️" label="Skier"/> Guideservice</li>
    <li><Emoji symbol="✅" label="Checkmark"/> Resegaranti</li>
    <li><Emoji symbol="📞" label="Telephone"/> 24/7 service- och jourtelefon</li>
  </ul>
)

const questions = [
  {
    q:"Vad är Week of Winter?",
    a:"Week of Winter är en skidförening för Uppsalas studenter med fokus på teknologer och naturvetare!"
  },
  {
    q:"Vem får följa med?",
    a:"Week of Winter riktar sig till teknologer vid Uppsala Universitet men det är fritt vem som helst över 18 år att följa med"
  },
  {
    q:"Vad ingår i grundpaketet?",
    a: <GrundPaket/>
  },
  {
    q:"Kan man boka egen transaport ner?",
    a: "Ja, det går bra att boka egen transport, det alternativet fyller man i vid bokning"
  },
  {
    q:"Går det bra att ta med sina egna skidor ned?",
    a:"Ja, det går bra ta med sina egna skidor ned, oavsett om man åker buss eller flyger ned så går det att beställa skidtransport"
  },
  {
    q:"När går det att boka boende?",
    a:"Bokandet av boende öppnar ungefär i mitten av November och mer information kommer ungefär två veckor innan bokningen öppnar"
  }
]

/**
 * A component displaying an question and an answer when clicking on the question
 * @component
 * @example
 * <QA 
 *   key={id}
 *   id={id}
 *   question="När går det att boka boende" 
 *   answer="När som helst"
 *   show={showId === id}
 *   showId={showId}
 *   setShowId={setShowId}
 * />
*/
function QA({id, question, answer, show, showId, setShowId}) {
  const ref = useRef(null)

  const styles = useSpring({
    from: {
      height:0
    },
    to: {
      height:show ? ref.current.offsetHeight + 18 : 0
    },
  })

  const Icon = show ? Minus : Plus

  return (
    <div tabIndex={0} className={s.container}>
      <button className={s.question} onClick={() => showId === id ? setShowId(-1) : setShowId(id)}>
        <h5>{question}</h5>
        <div className={s.icon}>
          <Icon width={35} height={35}/>
        </div>
      </button>
      <animated.div style={styles} className={s.answerContainer}>
        <span ref={ref}>
        {answer}
        </span>
      </animated.div>
    </div>
  )
}

/**
 * A component displaying frequently asked questions
 * @component
 * @example
 * <Faq/>
 */
export default function FAQ() {
  const [showId, setShowId] = useState(-1);

  return (
    <section className={s.faq}>
      <header className={s.header}>
        <h2>Frågor? Svar.</h2>
      </header>
      {questions.map((q, id)=>
        <QA 
          key={id}
          id={id}
          question={q.q} 
          answer={q.a}
          show={showId === id}
          showId={showId}
          setShowId={setShowId}
        />
      )}
    </section>
  )
}


