import React from 'react';
import logo from './logo.svg';
import './App.css';

import StartScreen from './components/StartScreen';
import Categories from './components/CategoriesScreen';
import Questions from './components/QuestionsScreen';


function App() {
  const [curCategory, setCurCategory] = React.useState({})
  const [mode, setMode] = React.useState("start")
  
  
  const [categories, setCategories] = React.useState([])

  const [apiToken, setApiToken] = React.useState()



//fetch categories from API
React.useEffect(() => {   
  fetch("https://opentdb.com/api_token.php?command=request")
  .then(response => response.json())
  .then(response => setApiToken(response.token))
}, [])

  //fetch categories from API
  React.useEffect(() => {   
      fetch("https://opentdb.com/api_category.php")
      .then(response => response.json())
      .then(response => setCategories(response.trivia_categories))
  }, [])

  function onCategorySelection(category){
    setCurCategory(category)
    setMode("questions")
  }

function restart(){
    setMode("start")
}


  let content = ""
  switch(mode){
    case "questions":
      content = <Questions restart={restart} apiToken={apiToken} category={curCategory}/>
      break;
    case "categories":
      content =  <Categories categories={categories} onSelection={onCategorySelection}/>
      break;
    default:
      content = <StartScreen onStart={() => setMode("categories")}/>
  }

 
  return (
    <div className='App'>
      {content}
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
