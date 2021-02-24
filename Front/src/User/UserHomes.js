import { Link, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import './UserHomes.css'


function UserHomes() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/usuario/vivienda/'+`${id}`)
    console.log(data)
    return(
        <div className='main-listhomes'>
            <h1>Mis pisos</h1>
            {data&&data.map(d=>
            <Link to={`/myhome/${d.id}`}><div id='listhome'>
                <div className='myhomes-image'
                    style={d.image&&{backgroundImage:'url('+`http://localhost:9999/imagen/${d.image}.jpg`+')'}}/>
                <main className='myhomes-content'>
                    <h3> {d.precio_piso}€</h3>
                    <p>{d.ciudad}</p>
                    <p>{d.habitaciones}habs. | {d.baños}baños | {d.m2}m2</p>
                    <p>{d.direccion}</p>
                </main>
            </div>
            </Link>
            )}
        </div>
    )
}
export default UserHomes