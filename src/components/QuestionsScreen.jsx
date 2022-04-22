import { nanoid } from "nanoid"
import React from "react"
import Question from "./Question"

import "../css/QuestionsScreen.css"


export default function Questions(props){
    const category = props.category
    const amount = 10
    
    const [questions, setQuestions ] = React.useState([])

    React.useEffect(() =>{
        getNewQuestions()
    },[])

    function getNewQuestions(){
        fetch(`https://opentdb.com/api.php?category=${category.id}&amount=${amount}&type=multiple&token=${props.apiToken}`)
        .then(res => res.json())
        .then(res => setQuestions(res.results))
    }


    const questionElements = []
    for(let i = 0; i < questions.length; i++){
        questionElements.push(<Question key={nanoid()} question={questions[i]}/>)
        if(i !== questions.length -1){
            questionElements.push(<hr className="questions-row"/>)
        }
    }

    console.log(questions)
    return (
        <div className="questions">
            <h1> {category.name}</h1>
            <div>
                {questionElements}
            </div> 
            
            <button className="questions-check">Check Answers</button>
        </div>
       )
}