import { useHistory, useParams } from "react-router-dom";
import PisoScore from "../Score/PisoScore";
import useFetch from "../useFetch";
import DeleteBooking from "../utils/DeleteBooking";
import './getbooking.css'
const moment = require('moment')

function GetBookingWrapper() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/reserva/'
    +`${id}`) || []
    console.log(data)
    return data ? <GetBooking data={data}/> : false
}


function GetBooking ({data}) {

    const {id} = useParams()
    const history = useHistory()
    const handleClick= e => {
        e.preventDefault()
        history.push(`/vivienda/${data[0].id}`)
    }
    
    if(!data) return <div>Loading....</div>
    return(
        <div className='pipo'>
            <h1>Tu reserva</h1>
            {data.map(d=>
                <div key={d.id} className='booking-container'>
                    <div className='booking-image'
                    style={d.image&&{backgroundImage:'url('
                    +`http://localhost:9999/imagen/${d.image}.jpg`
                    +')'}}/>
                    <section className='booking-info'>
                        <h2>{d.ciudad}</h2>
                        <h3><b>{d.precio_reserva}€</b></h3>
                        <p>Dirección<br/><b>{d.direccion}</b></p>
                        <p>CheckIn:<br/><b>{moment(d.fecha_entrada).format('DD-MM-YYYY')}</b></p>
                        <p>CheckOut:<br/><b>{moment(d.fecha_salida).format('DD-MM-YYYY')}</b></p>
                        <p>Estado de la reserva:<br/><b>{d.estado}</b></p>
                        {d.estado==='aceptado'?<p >Puntua el piso:<PisoScore previousScore={d.score_piso}id={id}/></p>:
                        <div/>}
                    </section>
                    <div className='buttons'>
                        <button className='booking-moreinfo' onClick={handleClick}><b>Ver más</b></button>
                        {d.estado === 'pendiente'? <DeleteBooking id={data[0].id_reserva}/>:''}
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default GetBookingWrapper;