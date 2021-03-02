import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import AcceptorDeclineBooking from "../bookings/AcceptorDeclinedBooking"
import PisoScore from "../Score/PisoScore"
import useFetch from "../useFetch"
import './homebookings.css'
const moment = require('moment')

function HomeBookings() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/vivienda/reserva/'
    +`${id}`)
    console.log(data)
    const [page,setPage] = useState(1)

    const paginatedData = data ? data.slice(2*(page-1),page*2) : []
    const max = data ? Math.ceil(data.length/2) : []

    return(
        <div className='homebooking-container'>
            {data&&paginatedData.map(d=>
                <section className='homebooking-contain' key={d.id_reserva}>
                    <h4><Link to={`/user/profile/${d.id}`}><b>{d.nombre}</b></Link></h4>
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
            {data&&
                <div className='pagination'>
                    <span className='goback' onClick={()=>setPage(page>1? page-1:1)}><div/></span>
                    <span>{page}/{max}</span>
                    <span className='next' onClick={()=>setPage(page<max ? page+1:max)}><div/></span>
                </div>
            }
            
        </div>
    )
}

export default HomeBookings