import { useState } from "react"
import { useHistory } from "react-router-dom"


function MainSearch() {
    const [ciudad,setCiudad] = useState('')
    const [precio,setPrecio] = useState('')

    let history = useHistory

    const handleSubmit = async e=> {
        e.preventDefault()
        const url = `http://localhost:9999/vivienda/busqueda?ciudad=${ciudad}&precio2=${precio}`
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        history.push()   
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
                    Precio max.
                </label>
                <select value={precio} onChange={e=>setPrecio(e.target.value)}>
                    <option value={300}>300</option>
                    <option value={400}>400</option>
                    <option value={500}>500</option>
                    <option value={600}>600</option>
                    <option value={700}>700</option>
                    <option value={800}>800</option>
                    <option value={1000000}>Me la suda</option>
                </select>
                <button>🔍</button>
            </form>
        </div>
    )
}
export default MainSearch;