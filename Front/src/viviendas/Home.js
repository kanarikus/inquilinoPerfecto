import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, Route, useHistory, useParams } from "react-router-dom"
import Map from "../utils/Map"
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
    const {id} = useParams()
    const login = useSelector(s=>s.login)

    const [fecha_entrada,setFechaentrada] = useState('')
    const [fecha_salida,setFechasalida] = useState('')
    const [error,setError] = useState(false)
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
            {data.map(d=>
                <div key={d.id} className='home-contain'>
                    <div className='homeimage' style={avatarStyle}/>
                    <div className='home-specific'>
                        <h2>{d.precio_piso}€/mes</h2>
                        <h3>{d.ciudad}</h3>
                        <ul className='home-atributes'>
                            <li className='room-container'><div className='room'/>{d.habitaciones}habs.</li>
                            <li className='bath-container'><div className='bath'/>{d.baños} baños</li>
                            <li className='m2-container'><div className='m2'/>{d.m2} m2</li>
                            <li className='garage-container'><div className='garaje'/>{d.garaje}</li>
                            <li className='jardin-container'><div className='jardin'/>{d.jardin}</li>
                            <li className='ascensor-container'><div className='ascensor'/>{d.ascensor}</li>
                            <li className='balcon-container'><div className='balcon'/>{d.balcon}</li>
                        </ul>
                            <Rating value={d.score_piso}/>
                            <div className='owner'>Este piso pertenece a:<br/><Link to={`/user/profile/${d.id_usuario}`}>{d.nombre}</Link></div>
                    </div>
                </div>    
            )}
            <form className='homedata-form' onSubmit={handleSubmit}>
                <input type='date' required value={fecha_entrada}
                onChange={e=>setFechaentrada(e.target.value)}
                />
                <input type='date' required value={fecha_salida}
                onChange={e=>setFechasalida(e.target.value)}
                />
                <button><b>Reservar</b></button>
                
            </form>
            {error&&
                <div>No se puede reservar en estas fechas</div>}
            <div className='map-container'>
               <Route>
                <Map id={id}/>
            </Route> 
            </div>
            
            
        </div>
    )
}

export default HomeWrapper