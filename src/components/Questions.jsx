export default function Questions(props){
    const category = props.category
    console.log(props)
    return (
        <div className="questions">
            <h1> {category.name}</h1>
    
        </div>
       )
}