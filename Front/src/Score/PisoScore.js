import Rating from "./Score"

const { useState } = require("react")
const { useSelector } = require("react-redux")

const PisoScore=({previousScore, id}) =>{
    const login = useSelector(s=>s.login)
    const [rating,setRating] = useState(previousScore)
    const handleScore = rating=>{
        setRating(rating)
        fetch('http://localhost:9999/reserva/'+`${id}`,{
            method:'PUT',
            headers:{
                'Authorization': login.token,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'score':rating})
        })
    }
    return <Rating value={rating} onChange={handleScore}/>
}

export default PisoScore