import {useState} from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useFetch from '../useFetch'
import {Link} from 'react-router-dom'

function Search() {
    const {ciudad} = useParams()

    const [page,setPage] = useState(1)
    const [city,setCity] = useState('')
    const [precio1,setPrecio1] = useState('')
    const [precio2,setPrecio2] = useState('')
    const [fechaEntrada,setFechaentrada] = useState('')
    const [fechaSalida,setFechasalida] = useState('')
    const [habitaciones,setHabitaciones] = useState('')
    const [baños,setBaños] = useState('')
    const [m2,setM2] = useState('')
    const [garaje,setGaraje] = useState(false)
    const [jardin,setJardin] = useState(false)
    const [ascensor,setAscensor] = useState(false)
    const [balcon,setBalcon] = useState(false)
    const [results,setResults]=useState('')

    const { search } = useLocation()
    const history = useHistory()

    const handleSubmit= async e=> {
        e.preventDefault()
        const url = `/search/${city?city:ciudad}`+`&precio1=${precio1}`+
        `&precio2=${precio2}`+`&fecha_entrada=${fechaEntrada}`+`&fecha_salida=${fechaSalida}`+`&habitaciones=${habitaciones}`+`&baños=${baños}`+`&m2=${m2}`+
        `&garaje=${garaje? 'si': ''}`+`&jardin=${jardin?'si':''}`+`&ascensor=${ascensor?'si': ''}`+
        `&balcon=${balcon?'si':''}`

        //const res = await fetch(url)
        //const result = await res.json()
        //setResults(result)
        history.push(url)
    }

    const data = useFetch('http://localhost:9999/vivienda/busqueda?'+`ciudad=${ciudad}&${search}`)

    const paginatedData1 = data ? data.slice(5*(page-1),page*5) : []
    const max1 = data ? Math.ceil(data.length/5) : []

    const paginatedData = results ? results.slice(5*(page-1),5*page) : []
    const max = results ? Math.ceil(results.length/5) : []

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name='ciudad' placeholder={ciudad} value={city} onChange={e=>setCity(e.target.value)}/>
                    <input placeholder='Precio Mínimo'value={precio1} onChange={e=>setPrecio1(e.target.value)}/>
                    <input placeholder='Precio Máximo' value={precio2} onChange={e=>setPrecio2(e.target.value)}/>
                    <input type='date' value={fechaEntrada} onChange={e=>setFechaentrada(e.target.value)}/>
                    <input type='date' value={fechaSalida} onChange={e=>setFechasalida(e.target.value)}/>
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
            <div>
                {!results&&data&&paginatedData1.map(r=>
                <Link key={r.id} className='viviendas' to={`/vivienda/${r.id}`}>
                    <div>
                        {r.direccion}
                        {r.precio} 
                    </div>
                      
                </Link>
            )}
                {!results&&data&&
                <div>
                    <span onClick={()=>setPage(page>1? page-1:1)}>🡸</span>
                    <span>{page} de {max1}</span>
                    <span onClick={()=>setPage(page<max1 ? page+1:max)}>🡺</span>
                </div>}
            </div>
            <div>
                {results&&paginatedData.map(r=>
                <Link key={r.id} className='viviendas' to={`/vivienda/${r.id}`}>
                    <div>
                        {r.direccion}
                        {r.precio}
                    </div> 
                </Link>
            )}
                {results&&
                <div>
                    <span onClick={()=>setPage(page>1? page-1:1)}>🡸</span>
                    <span>{page} de {max}</span>
                    <span onClick={()=>setPage(page<max ? page+1:max)}>🡺</span>
                </div> }
            </div>   
        </div>
    )
}

export default Search;