import { Link, useParams } from "react-router-dom"
import useFetch from "../useFetch"


function UserHomes() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/usuario/vivienda/'+`${id}`)
    
    return(
        <div>
            <h1>Mis pisos</h1>
            {data&&data.map(d=>
            <div>
                <h3> <Link to={`/updatehome/${d.id}`}>{d.precio_piso}</Link></h3>
                <main>
                    <p>{d.ciudad}</p>
                    <p>habitaciones:{d.habitaciones}</p>
                </main>
               
            </div>
            )}
        </div>
    )
}
export default UserHomes