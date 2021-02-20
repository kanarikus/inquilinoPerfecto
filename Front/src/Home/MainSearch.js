import { useState } from "react"
import { useHistory } from "react-router-dom"

function MainSearch() {
    const [ciudad,setCiudad] = useState('')
    const [fecha_entrada,setEntrada] = useState('')
    const [fecha_salida,setSalida] = useState('')

    let history = useHistory()
    
    const handleSubmit = async e=> {
        e.preventDefault()
        history.push(`/search/`+(ciudad?`${ciudad}?`:'?')
        +(fecha_entrada ?`fecha_entrada=${fecha_entrada}&`:'')
        +(fecha_salida ?`fecha_salida=${fecha_salida}`:''))
    }
    return (
        <div className='mainsearch'>
            <h1>Encuentra tu hogar ideal</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Escoge tu ciudad
                </label>
                <input type="text" placeholder="Escribe tu ciudad..."
                value={ciudad}
                required
                onChange={e=>setCiudad(e.target.value)}/>
                <label>
                    Fecha Entrada
                </label>
                <input type='date'
                value={fecha_entrada}
                onChange={e=>setEntrada(e.target.value)}
                />
                <label>
                    Fecha Salida
                </label>
                <input type="date"
                value={fecha_salida}
                onChange={e=>setSalida(e.target.value)}
                />
                <button>🔍</button>
            </form>
        </div>
    )
}
export default MainSearch;