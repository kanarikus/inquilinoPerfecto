import { useParams } from "react-router-dom"
import useFetch from "../useFetch"

function HomeBookings() {

    const {id} = useParams()
    const data = useFetch('http://localhost:9999/vivienda/reserva/'+`${id}`)

    const handleAccept = e => {
        console.log(e)
    }

    const handleDecline = e => {
        console.log(e)
    }

    return(
        <div>
            {data&&data.map(d=>
                <section>
                    <h4>{d.nombre}</h4>
                    <p>Ha solicitado el día {d.fecha_reserva} una reserva para este piso para las fechas entre
                        {d.fecha_entrada} y {d.fecha_salida} por la cantidad de {d.precio_reserva}€.
                    </p>
                    <span onClick={handleAccept(d.id)}>Aceptar</span>
                    <span onClick={handleDecline(d.id)}>Declinar</span>
                </section>
            )}
            
        </div>
    )
}

export default HomeBookings