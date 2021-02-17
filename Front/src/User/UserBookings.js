const { useParams } = require("react-router-dom")
const { default: useFetch } = require("../useFetch")


function UserBookings() {
    const data = useFetch('http://localhost:9999/reserva') || []

    return(
        <div>
            <h1>Mis reservas</h1>
            {data&&data.map(d=>
                <section>
                    <h3>Reservado el:{d.fecha_reserva}</h3>
                    <p>Precio:{d.precio_reserva}€</p>
                    <p>CheckIn:{d.fecha_entrada}</p>
                    <p>CheckOut:{d.fecha_salida}</p>
                </section> 
            )}
            
        </div>
    )
}
export default UserBookings