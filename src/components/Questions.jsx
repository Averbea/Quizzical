import React from "react"

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

    console.log(questions)
    return (
        <div className="questions">
            <h1> {category.name}</h1>
            <div>
                {questions.map((q) => <p>{q.question}</p>)}
            </div>
        </div>
       )
}