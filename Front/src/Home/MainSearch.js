import { useState } from "react"
import { useHistory } from "react-router-dom"


function MainSearch() {
    const [ciudad,setCiudad] = useState('')

    let history = useHistory()

    const handleSubmit = async e=> {
        e.preventDefault()
        history.push(`/search/${ciudad}`) 
    }
    return (
        <div>
            <h1>Encuentra tu hogar ideal</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Escoge tu ciudad
                </label>
                <input type="text" placeholder="Escribe tu ciudad..." value={ciudad} onChange={e=>setCiudad(e.target.value)}/>
                <label>
                    Fecha Entrada
                </label>
                <input type='date'/>
                <label>
                    Fecha Salida
                </label>
                <input type="date"/>
                <button>🔍</button>
            </form>
        </div>
    )
}
export default MainSearch;