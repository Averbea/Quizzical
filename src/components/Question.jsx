import { nanoid } from 'nanoid'
import React from 'react'

import "../css/Question.css"

export default function Question(props){
    const q = props.question
    
    const [selected, setSelected] = React.useState('')
    const [answersOrder, setAnswersOrder] = React.useState(
        [0,3,2,1].map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    )

    const answers = [...props.question.incorrect_answers, props.question.correct_answer]
  

    function parseText(text){
        return parser.parseFromString(text, 'text/html').body.textContent
    }
    
    const parser = new DOMParser()
    const parsedQuestion = parseText(q.question)
    
    const answersElements = Array(4)
    for(let i = 0; i< 4; i++){
        let a = answers[i]

        let className = "answer"
        // console.log(q.correct_answer + " : " + a)
        if(props.checking){
            if(q.correct_answer === a){
                className += ' answer-correct'
            }
            else if(selected === a ){
                className += ' answer-wrong'
            }
            else{
                className += ' answer-else'
            }
        }
        else if(selected === a ){
            className = 'answer-selected'
        }

        answersElements[answersOrder[i]]=(
            <button key={a}
                    className={className} 
                    onClick={() => setSelected(a)}>
                {parseText(a)}
            </button>
        )
    }
        

    return (
        <div className='question'>
            <h3>{parsedQuestion}</h3>
            <div className='answers'>
               {answersElements }
            </div>
        </div>
    )
}