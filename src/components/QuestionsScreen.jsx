import { nanoid } from "nanoid"
import React from "react"
import Question from "./Question"

import "../css/QuestionsScreen.css"


export default function QuestionsScreen(props){
    const category = props.category
    const amount = 5
    
    const [questions, setQuestions ] = React.useState([])
    const [checking, setChecking] = React.useState(false)
    const [answerCorrect, setAnswerCorrect] = React.useState(() => {
        let tmp = Array(amount)
        tmp.fill(false)
        return tmp
    })


    React.useEffect(() =>{
        async function getNewQuestions(){
            fetch(`https://opentdb.com/api.php?category=${category.id}&amount=${amount}&type=multiple&token=${props.apiToken}`)
            .then(res => res.json())
            .then(res => setQuestions(res.results))
        }   

       getNewQuestions()
    },[category.id, props.apiToken])

   

    function checkQuestions(){
        if(!checking){
            setChecking(true)
            window.scrollTo(
                {
                    top: 0, 
                    behavior:"smooth"
                }
            )
        }else{
            //restart
            props.restart() 
        }
    }

    function onAnswerSelected(index, correct){
        setAnswerCorrect(prev => prev.map((val, i) => index === i ? correct: val ))
    }
    

    const questionElements = []
    for(let i = 0; i < questions.length; i++){
        questionElements.push(<Question key={i} checking={checking} question={questions[i]} updateCorrectAnswerSelected={(val) => onAnswerSelected(i, val)}/>)
        if(i !== questions.length -1){
            questionElements.push(<hr key={nanoid()} className="questions-row"/>)
        }
    }
    
    let numCorrect = answerCorrect.filter((val ) => val === true).length

    return (
        <div className="questions">
            <h1> {category.name}</h1>
            <div>
                {questionElements}
            </div> 
            {checking && <h2 className="questions-finish">
                You answered {numCorrect}/{amount} correctly!
            </h2>}
            <button onClick={checkQuestions} className="questions-check">{checking ? "Restart" : "Check your answers"}</button>
        </div>
       )
}