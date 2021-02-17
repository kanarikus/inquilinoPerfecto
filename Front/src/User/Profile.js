import { Link, Route, Switch, useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Tabs from "./Tabs"

function Profile() {
    const {id} = useParams()
    const data = useFetch(`http://localhost:9999/usuario/${id}`) || []
    const history = useHistory()
    const handleProfile = e =>{
        e.preventDefault()
        history.push(`/user/update/${id}`)
    }
    return(
        <div>
            {data&&
            <div>
                {/* <img src='.../Back/images/'></img> */}
                <span>{data.nombre}</span>
                <span>{data.email}</span>
                <span>{data.ciudad}</span>
                <span>{data.id}</span>
                <span>{data.telf}</span>
                <button onClick={handleProfile}>Editar Perfil</button>
            </div>
            }
            <Tabs/>
            <button><Link to='/userbooking'>Mis reservas</Link></button>

            <Switch>
                <Route path="/user/:id/Reservas">
                    Reservas....
                </Route>
            </Switch>
        </div>
        
    )
}

export default Profile