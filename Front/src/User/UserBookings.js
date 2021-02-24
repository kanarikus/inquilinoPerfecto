const { Link } = require("react-router-dom")
const { default: useFetch } = require("../useFetch")
const moment = require('moment')

function UserBookings() {
    const data = useFetch('http://localhost:9999/reserva') || []
    
    return(
        <div>
            <h1>Mis reservas</h1> 
            {data&&data.map(d=>
                <Link to={`/booking/${d.id_reserva}`}>
                <section>
                    <h3>Reservado el:{moment(d.fecha_reserva).format('DD-MM-YYYY')}</h3>
                    <p>Precio:{d.precio_reserva}€</p>
                    <p>CheckIn:{moment(d.fecha_entrada).format('DD-MM-YYYY')}</p>
                    <p>CheckOut:{moment(d.fecha_salida).format('DD-MM-YYYY')}</p>
                </section> 
               </Link> 
            )}
        </div>
    )
}
export default UserBookings