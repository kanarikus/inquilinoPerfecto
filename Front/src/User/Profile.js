import { useSelector } from "react-redux"
import { Route, Switch, useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Tabs from "./Tabs"
import UserBookings from "./UserBookings"
import UserHomes from "./UserHomes"
import './Profile.css';

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
        <div className='main-profile'>
            {data&&
            <div className='profile-container'>
                <div className='avatar' style={avatarStyle}/>
                <span>Nombre:  {data.nombre}</span>
                <span>Email:  {data.email}</span>
                <span>Ciudad:  {data.ciudad}</span>
                <span>Provincia:  {data.Provincia}</span>
                <span>Telf:  {data.telf}</span>
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