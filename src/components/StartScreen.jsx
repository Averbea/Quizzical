import React  from "react";

export default function StartScreen(props){
    return(
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Try to solve these Random Questions</p>
            <button className="start-button" onClick={props.onStart}>Start Quiz</button>
        </div>
    )
}