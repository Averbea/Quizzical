import React  from "react";

import '../css/StartScreen.css'

export default function StartScreen(props){
    console.log(props)
    const showHistory = props.history.length > 0

    let history = (
        <div>
            <br/><br/>
            <h3>History</h3>
            {props.history.map((e) => 
                <p key={e.time}>{e.time} &nbsp;&nbsp;&nbsp; <b>{e.correct} / {e.total}</b> &nbsp; correct</p>
            )}
        </div>
    )
    
    
    return(
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Try to solve these Random Questions</p>
            <button className="start-button" onClick={props.onStart}>Start Quiz</button>
            
            {showHistory && history}
        </div>
    )
}