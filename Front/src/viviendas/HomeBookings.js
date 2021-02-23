import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AcceptorDeclineBooking from "../bookings/AcceptorDeclinedBooking"
import useFetch from "../useFetch"

function HomeBookings() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/vivienda/reserva/'+`${id}`)
    console.log(data)
    

    return(
        <div>
            {data&&data.map(d=>
                <section>
                    <h4>{d.nombre}</h4>
                    <p>Ha solicitado el día {d.fecha_reserva} una reserva para este piso para las fechas entre
                        {d.fecha_entrada} y {d.fecha_salida} por la cantidad de {d.precio_reserva}€.
                    </p>
                    {d.estado === 'aceptado' &&
                    <p>Reserva Aceptada</p>
                    }
                    {d.estado === 'declinado' &&
                    <p>Reserva Rechazada</p>
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