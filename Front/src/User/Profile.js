import { useSelector } from "react-redux"
import { Route, Switch, useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Tabs from "./Tabs"
import UserBookings from "./UserBookings"
import UserHomes from "./UserHomes"
import './Profile.css';
import Rating from "../Score/Score"

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
                <span><b>Nombre:</b>  {data.nombre}</span>
                <span><b>Email:</b>  {data.email}</span>
                <span><b>Ciudad:</b>  {data.ciudad}</span>
                <span><b>Provincia:</b>  {data.Provincia}</span>
                <span><b>Telf: </b> {data.telf}</span>
                <span><b>sobre mi:</b> {data.descripcion}</span>
                <span><b>Valoración media</b><br/>({data.count_usuario})<Rating value={data.score_usuario}/></span>
                <button onClick={handleProfile}><div className='edit-profile'/></button>
                
            </div>
            }
            <Tabs/>

            <Switch>
                <Route path="/user/profile/:id/Reservas">
                    <UserBookings/>
                </Route>
                <Route path="/user/profile/:id/Pisos">
                    <UserHomes/>
                </Route>
            </Switch>
        </div>
        
    )
}

export default Profile