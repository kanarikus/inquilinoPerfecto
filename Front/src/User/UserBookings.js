import { useSelector } from "react-redux"
import './userbookings.css'

const { Link } = require("react-router-dom")
const { default: useFetch } = require("../useFetch")
const moment = require('moment')

function UserBookings() {
    const data = useFetch('http://localhost:9999/reserva') || []
    const login = useSelector(s=>s.login)
    console.log(data)
    for(let d of data) {
        if(login.id !== d.id_usuario)
        throw new Error()
    }

    return(
        <div className='bookings-container'>
            <h1>Mis reservas</h1> 
            {data&&data.map(d=>
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
        </div>
    )
}
export default UserBookings