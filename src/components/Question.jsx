import React from 'react'

import "../css/Question.css"

export default function Question(props){
    const q = props.question
    
    const [selected, setSelected] = React.useState('')
    
    function parseText(text){
        return parser.parseFromString(text, 'text/html').body.textContent
    }


    const parser = new DOMParser()
    const parsedQuestion = parseText(q.question)
    

    const answers = [...q.incorrect_answers, q.correct_answer]
    
    return (
        <div className='question'>
            <h3>{parsedQuestion}</h3>
            <div className='answers'>
               { answers.map(a => <button className={selected===a ? 'answer-selected' : 'answer'} onClick={() => setSelected(a)}>{parseText(a)}</button>)}
            </div>
        </div>
    )
}