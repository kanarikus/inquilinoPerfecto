import { useState } from "react";
import { useParams } from "react-router-dom";
import PisoScore from "../Score/PisoScore";
import Rating from "../Score/Score";
import useFetch from "../useFetch";

function GetBookingWrapper() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/reserva/'+`${id}`) || []
    return data ? <GetBooking data={data}/> : false
}


function GetBooking ({data}) {

    const {id} = useParams()
    
    if(!data) return <div>Loading....</div>
    return(
        <div>
            {data.map(d=>
                <main>
                    <h3>{d.ciudad}</h3>
                    <ul>
                        <li>{d.precio_reserva}€</li>
                        <li>{d.direccion}</li>
                        <li>CheckIn:{d.fecha_entrada}</li>
                        <li>CheckOut:{d.fecha_salida}</li>
                        <li>{d.score_piso}</li>
                        <li >Puntua el piso:<PisoScore previousScore={d.score_piso}id={id}/></li>
                    </ul>
                </main>
            )}
        </div>
    )
}

export default GetBookingWrapper;