import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

function GetBooking () {

    const {id} = useParams()
    const data = useFetch('http://localhost:9999/reserva/'+`${id}`) || []
    console.log(data)
    if(!data) return <div>Loading....</div>
    return(
        <div>
            {data.map(d=>
                <div>
                    <h3>{d.ciudad}</h3>
                    <main>
                        <section>{d.precio_reserva}€</section>
                        <section>{d.direccion}</section>
                        <section>CheckIn:{d.fecha_entrada}</section>
                        <section>CheckOut:{d.fecha_salida}</section>
                        <section>Valoración del piso:{d.score_piso}</section>
                    </main>
                </div>
            )}
        </div>
    )
}

export default GetBooking;