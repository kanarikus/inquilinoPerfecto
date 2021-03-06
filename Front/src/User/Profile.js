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
                {data.image?<div className='avatar' style={avatarStyle}/>:<div/>}
                <span><b>Nombre:<br/></b>  {data.nombre}</span>
                <span><b>Email:<br/></b>  {data.email}</span>
                <span><b>Ciudad:<br/></b>  {data.ciudad}</span>
                <span><b>Provincia:<br/></b>  {data.Provincia}</span>
                <span><b>Telf: <br/></b> {data.telf}</span>
                <span className='about-me'><b>sobre mi:<br/></b> {data.descripcion}</span>
                <span><b>Valoración media<br/></b><br/>({data.count_usuario})<Rating value={data.score_usuario}/></span>
                {data.id===login.id?<button onClick={handleProfile}><div className='edit-profile'/></button>:
                <div/>}
                
                
            </div>
            }
            <div className='tabs-container'>
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
            
        </div>
        
    )
}

export default Profile