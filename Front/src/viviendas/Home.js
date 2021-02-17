import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import useFetch from "../useFetch"


function Vivienda() {
    const login = useSelector(s=>s.login)

    const [fecha_entrada,setFechaentrada] = useState('')
    const [fecha_salida,setFechasalida] = useState('')
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/vivienda/'+`${id}`) || []
    
    const handleSubmit = async e=> {
        e.preventDefault()
        const headers = {'Content-Type':'application/json'}
        if(login) headers ['Authorization'] = login.token
        const res = await fetch(`http://localhost:9999/vivienda/${id}/reserva`,{
            method:'POST',
            headers,
            body: JSON.stringify({fecha_entrada,fecha_salida})
        })
        // if(res.ok) {
        //     const data = await res.json()
        //     console.log(data)
        // }else{console.log('error')}
    }
    if(!data) return <div>Loading...</div>
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='date' value={fecha_entrada}
                onChange={e=>setFechaentrada(e.target.value)}
                />
                <input type='date' value={fecha_salida}
                onChange={e=>setFechasalida(e.target.value)}
                />
                <button>Reservar!</button>
            </form>
            {data.map(d=>
                <div>
                    <h2>{d.direccion}</h2>
                    <p>{d.ciudad}</p>
                    <h3>{d.precio_piso}€</h3>
                    <p>Habitaciones:{d.habitaciones}</p>
                    <p>Baños:{d.baños}</p>
                    <p>Garaje:{d.garaje}</p>
                </div>  
            )}
            
        </div>
    )
}

export default Vivienda