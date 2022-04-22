import React from "react";
import "../css/CategoriesScreen.css"

export default function Categories(props){

    

    return (
        <div className="categories">
            <h1>Categories</h1>
            <p>Select a categorie to generate some Questions</p> 
             
            <div className="categories-selection">
                {props.categories.map(cat => 
                    <button className="categories-button" onClick={() => props.onSelection(cat)} key={cat.id}>{cat.name}</button>
                )}        
                
            </div>
        </div>
    )

}