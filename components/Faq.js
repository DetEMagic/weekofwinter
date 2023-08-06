import React, { useRef, useState } from 'react'
import s from "./Faq.module.css"
import { useSpring, animated } from '@react-spring/web'
import Plus from "../icons/plus.svg"
import Minus from "../icons/minus.svg"
import Emoji from './Emoji'
import PropTypes from 'prop-types';
import AnimatedContainer from './AnimatedContainer'

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
      height:show ? ref.current.offsetHeight + 20 : 0
    },
  })

  const Icon = show ? Minus : Plus

  return (
    <AnimatedContainer tabIndex={0} className={s.container}>
      <button className={`${s.question} h5`} onClick={() => showId === id ? setShowId(-1) : setShowId(id)}>
        {question}
        <div className={s.icon}>
          <Icon width={35} height={35}/>
        </div>
      </button>
      <animated.div style={styles} className={s.answerContainer}>
        <span ref={ref}>
        {answer}
        </span>
      </animated.div>
    </AnimatedContainer>
  )
}

/**
 * A component displaying frequently asked questions
 * @component
 * @example
 * <Faq/>
 */
export default function FAQ({questions=[]}) {
  const [showId, setShowId] = useState(-1);

  return (
    <>
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
    </>
  )
}


