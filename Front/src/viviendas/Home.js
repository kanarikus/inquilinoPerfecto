import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import Rating from "../Score/Score"
import useFetch from "../useFetch"
import './home.css'

function HomeWrapper () {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/vivienda/'+`${id}`)
    console.log(data)
    return data ? <Vivienda data={data}/> : false
}

function Vivienda({data}) {
    const login = useSelector(s=>s.login)

    const [fecha_entrada,setFechaentrada] = useState('')
    const [fecha_salida,setFechasalida] = useState('')
    const [error,setError] = useState(false)
    const {id} = useParams()
    const history = useHistory()

    const handleSubmit = async e=> {
        
        e.preventDefault()
        const headers = {'Content-Type':'application/json'}
        if(login) headers ['Authorization'] = login.token
        const res = await fetch(`http://localhost:9999/vivienda/reserva/${id}`,{
            method:'POST',
            headers,
            body: JSON.stringify({fecha_entrada,fecha_salida})
        })
        
        if(res.ok) {
            const resu = await res.json()
            history.push(`/booking/${resu.id}`)
        }else{
        console.log('error')
        setError(true)
        }
    }

    const avatarUrl = data[0].image&& `http://localhost:9999/imagen/${data[0].image}.jpg`
    const avatarStyle = login&&data[0].image&&{backgroundImage: 'url('+ avatarUrl+')'}
    if(!data) return <div>Loading...</div>
    return(
        <div className='homedata'>
            <form onSubmit={handleSubmit}>
                <input type='date' required value={fecha_entrada}
                onChange={e=>setFechaentrada(e.target.value)}
                />
                <input type='date' required value={fecha_salida}
                onChange={e=>setFechasalida(e.target.value)}
                />
                <button>Reservar!</button>
                
            </form>
            {error&&
                <div>No se puede reservar en estas fechas</div>}
            {data.map(d=>
                <div key={d.id}>
                    <div className='homeimage' style={avatarStyle}/>
                    <h2>{d.direccion}</h2>
                    <p>{d.ciudad}</p>
                    <h3>{d.precio_piso}€</h3>
                    <p>Habitaciones:{d.habitaciones}</p>
                    <p>Baños:{d.baños}</p>
                    <p>Garaje:{d.garaje}</p>
                    <p><Rating value={d.score_piso}/></p>
                    <footer>Este piso pertenece a:{d.nombre}</footer>
                </div>  
            )}
            
        </div>
    )
}

export default HomeWrapper