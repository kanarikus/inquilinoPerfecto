import { useParams } from "react-router-dom"
import AcceptorDeclineBooking from "../bookings/AcceptorDeclinedBooking"
import PisoScore from "../Score/PisoScore"
import Rating from "../Score/Score"
import useFetch from "../useFetch"
import './homebookings.css'
const moment = require('moment')

function HomeBookings() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/vivienda/reserva/'+`${id}`)
    console.log(data)
    

    return(
        <div className='homebooking-container'>
            {data&&data.map(d=>
                <section className='homebooking-contain'>
                    <h4>{d.nombre}</h4>
                    <p>Ha solicitado el día <b>{moment(d.fecha_reserva).format('DD-MM-YYYY')}</b> una reserva para este piso para las fechas entre
                        <b>{moment(d.fecha_entrada).format('DD-MM-YYYY')}</b> y <b>{moment(d.fecha_salida).format('DD-MM-YYYY')}</b> por la cantidad de <b>{d.precio_reserva}</b>€.
                    </p>
                    {d.estado === 'aceptado' &&
                    <div >
                        <p className='aceptado'><b>Reserva Aceptada</b></p>
                        <p>Valora a tu inquilino<br/><PisoScore previousScore={d.score_usuario} id={d.id_reserva}/></p>
                    </div>
                    
                    }
                    {d.estado === 'declinado' &&
                    <p className='declinado'><b>Reserva Rechazada</b></p>
                    }
                    {d.estado=== 'pendiente' &&
                    <AcceptorDeclineBooking value={d.id_reserva}/>
                    }
                </section>
            )}
            
        </div>
    )
}

export default HomeBookings