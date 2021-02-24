import { useParams } from "react-router-dom";
import PisoScore from "../Score/PisoScore";
import useFetch from "../useFetch";
import './getbooking.css'
const moment = require('moment')

function GetBookingWrapper() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/reserva/'+`${id}`) || []
    return data ? <GetBooking data={data}/> : false
}


function GetBooking ({data}) {

    const {id} = useParams()
    
    if(!data) return <div>Loading....</div>
    return(
        <div className='booking-container'>
            <h1>Tu reserva</h1>
            {data.map(d=>
                <section>
                    <h2>{d.ciudad}</h2>
                    <main>
                        <p><b>{d.precio_reserva}€</b></p>
                        <p>Dirección<br/><b>{d.direccion}</b></p>
                        <p>CheckIn:<br/><b>{moment(d.fecha_entrada).format('DD-MM-YYYY')}</b></p>
                        <p>CheckOut:<br/><b>{moment(d.fecha_salida).format('DD-MM-YYYY')}</b></p>
                        <p >Puntua el piso:<PisoScore previousScore={d.score_piso}id={id}/></p>
                    </main>
                </section>
            )}
        </div>
    )
}

export default GetBookingWrapper;