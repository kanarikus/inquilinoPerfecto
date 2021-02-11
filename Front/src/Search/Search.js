import {useState} from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch'


function Search() {
    const {ciudad} = useParams()

    const [city,setCity] = useState('')
    const [precio1,setPrecio1] = useState('')
    const [precio2,setPrecio2] = useState('')
    const [habitaciones,setHabitaciones] = useState('')
    const [baños,setBaños] = useState('')
    const [m2,setM2] = useState('')
    const [garaje,setGaraje] = useState(false)
    const [jardin,setJardin] = useState(false)
    const [ascensor,setAscensor] = useState(false)
    const [balcon,setBalcon] = useState(false)
    const [results,setResults]=useState('')

    const handleSubmit= async e=> {
        e.preventDefault()
        const url = `http://localhost:9999/vivienda/busqueda?`+`ciudad=${city?city:ciudad}`+`&precio1=${precio1}`+
        `&precio2=${precio2}`+`&habitaciones=${habitaciones}`+`&baños=${baños}`+`&m2=${m2}`+
        `&garaje=${garaje? 'si': ''}`+`&jardin=${jardin?'si':''}`+`&ascensor=${ascensor?'si': ''}`+
        `&balcon=${balcon?'si':''}`

        const res = await fetch(url)
        const result = await res.json()
        setResults(result)
        console.log(result)
    }
    console.log(results)
    const data = useFetch('http://localhost:9999/vivienda/busqueda?'+`ciudad=${ciudad}`)
    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name='ciudad' placeholder={ciudad} value={city} onChange={e=>setCity(e.target.value)}/>
                    <input placeholder='Precio Mínimo'value={precio1} onChange={e=>setPrecio1(e.target.value)}/>
                    <input placeholder='Precio Máximo' value={precio2} onChange={e=>setPrecio2(e.target.value)}/>
                    <select value={habitaciones} onChange={e=>setHabitaciones(e.target.value)}>
                        <option value='' hidden>habitaciones</option>
                        <option value={1}>1+</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                    </select>
                    <select value={baños} onChange={e=> setBaños(e.target.value)}>
                        <option>baños</option>
                        <option value={1}>1+</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                    </select>
                    <select value={m2} onChange={e=>setM2(e.target.value)}>
                        <option value='' hidden>m2</option>
                        <option value={50}>50+</option>
                        <option value={200}>200+</option>
                        <option value={300}>300+</option>
                        <option value={500}>500+</option>
                    </select>
                    <label>
                        Garaje
                        <input type='checkbox' checked={garaje} onChange={e=>setGaraje(e.target.checked)}/>
                        Jardín
                        <input type='checkbox' checked={jardin} onChange={e=>setJardin(e.target.checked)}/>
                        Ascensor
                        <input type='checkbox' checked={ascensor} onChange={e=>setAscensor(e.target.checked)}/>
                        Balcón
                        <input type='checkbox' checked={balcon} onChange={e=>setBalcon(e.target.checked)}/>    
                    </label>
                    <button>Buscar!!</button>
                </form>
            </div>
            {!results&&data&&data.map(u=>
                <div key= {data.key}>
                    {u.direccion}
                </div>
            )}
            {results&&results.map(r=>
                <div>
                    {r.direccion}
                </div>  
            )}

        </div>
    )
}

export default Search;