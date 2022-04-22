import { nanoid } from "nanoid"
import React from "react"
import Question from "./Question"

import "../css/QuestionsScreen.css"


export default function QuestionsScreen(props){
    const category = props.category
    const amount = 10
    
    const [questions, setQuestions ] = React.useState([])
    const [checking, setChecking] = React.useState(false)

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

    const questionElements = []
    for(let i = 0; i < questions.length; i++){
        questionElements.push(<Question key={i} checking={checking} question={questions[i]}/>)
        if(i !== questions.length -1){
            questionElements.push(<hr key={nanoid()} className="questions-row"/>)
        }
    }

    return (
        <div className="questions">
            <h1> {category.name}</h1>
            <div>
                {questionElements}
            </div> 
            
            <button onClick={checkQuestions} className="questions-check">{checking ? "Restart" : "Check your answers"}</button>
        </div>
       )
}