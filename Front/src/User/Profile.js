import { useSelector } from "react-redux"
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Tabs from "./Tabs"
import UserBookings from "./UserBookings"
import UserHomes from "./UserHomes"

function Profile() {
    const login = useSelector(s=>s.login)
    const {id} = useParams()
    const data = useFetch(`http://localhost:9999/usuario/${id}`) || []
    console.log(data)
    const history = useHistory()
    const handleProfile = e =>{
        e.preventDefault()
        history.push(`/user/update/${id}`)
    }
    const avatarUrl = data.image && `http://localhost:9999/imagen/${data.image}.jpg`
    const  avatarStyle = login&&data.image&&{backgroundImage: 'url('+ avatarUrl+')'}
    return(
        <div>
            {data&&
            <div className='avatar-picker'>
                <div className='value'>
                    <div className='avatar' style={avatarStyle}/>
                </div>
                <span>{data.nombre}</span>
                <span>{data.email}</span>
                <span>{data.ciudad}</span>
                <span>{data.id}</span>
                <span>{data.telf}</span>
                <button onClick={handleProfile}>Editar Perfil</button>
            </div>
            }
            <Tabs/>

            <Switch>
                <Route path="/user/:id/Reservas">
                    <UserBookings/>
                </Route>
                <Route path="/user/:id/Pisos">
                    <UserHomes/>
                </Route>
            </Switch>
        </div>
        
    )
}

export default Profile