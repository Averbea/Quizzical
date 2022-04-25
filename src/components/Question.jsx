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

    function select(answer){
        if(props.checking) return
        setSelected(answer)
        props.updateCorrectAnswerSelected(answer === q.correct_answer);
    }

    const parser = new DOMParser()
    const parsedQuestion = parseText(q.question)
    
    const answersElements = Array(4)
    for(let i = 0; i< 4; i++){
        let a = answers[i]

        let className = "answer"
        // console.log(q.correct_answer + " : " + a)
        if(props.checking){
            if(selected !== a){
                className += ' answer-not-selected'
            }

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
            className += ' answer-selected'
        }

        answersElements[answersOrder[i]]=(
            <button key={a}
                    className={className} 
                    onClick={() => select(a)}>
                {parseText(a)}
            </button>
        )
    }
    
    const difficulty = q.difficulty

    let difficultyColor = ""
    switch(difficulty){
        case "easy": 
            difficultyColor = "#85ff59"
            break;
        case "medium":
            difficultyColor = "#fff459"
            break;
       default: 
            difficultyColor = "#ff5959"
    }

    return (
        <div className='question'>
            <h3 className='question-sentence'>{parsedQuestion}</h3>
            <p style={{backgroundColor:difficultyColor}} className="difficulty">{q.difficulty}</p>
            <div className='answers'>
               {answersElements }
            </div>
        </div>
    )
}