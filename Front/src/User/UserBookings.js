import { useState } from "react"
import { useSelector } from "react-redux"
import './userbookings.css'

const { Link } = require("react-router-dom")
const { default: useFetch } = require("../useFetch")
const moment = require('moment')

function UserBookings() {
    const data = useFetch('http://localhost:9999/reserva') || []
    const login = useSelector(s=>s.login)
    console.log(data)

    const [page,setPage] = useState(1)

    for(let d of data) {
        if(login.id !== d.id_usuario)
        throw new Error()
    }

    const paginatedData = data ? data.slice(3*(page-1),page*3) : []
    const max = data ? Math.ceil(data.length/3) : []

    return(
        <div className='bookings-container'>
            <h1>Mis reservas</h1> 
            {data&&paginatedData.map(d=>
                <Link to={`/booking/${d.id_reserva}`}>
                <div className='list-bookings'>
                    {d.image?<div className='myhomes-image'
                    style={d.image&&{backgroundImage:'url('+`http://localhost:9999/imagen/${d.image}.jpg`+')'}}/>:
                    ''}
                    
                    <section>
                        <h3>Reservado el día {moment(d.fecha_reserva).format('DD-MM-YYYY')}</h3>
                        <p>en {d.ciudad}</p>
                        <p>Precio:{d.precio_reserva}€</p>
                        <p>CheckIn:{moment(d.fecha_entrada).format('DD-MM-YYYY')}</p>
                        <p>CheckOut:{moment(d.fecha_salida).format('DD-MM-YYYY')}</p>
                    </section>
                    
                </div> 
               </Link>
            )}
            {data&&
                <div className='pagination'>
                    <span className='goback' onClick={()=>setPage(page>1? page-1:1)}><div/></span>
                    <span>{page}/{max}</span>
                    <span className='next' onClick={()=>setPage(page<max ? page+1:max)}><div/></span>
                </div>}
        </div>
    )
}
export default UserBookings