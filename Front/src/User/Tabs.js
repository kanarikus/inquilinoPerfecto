import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import './Tabs.css'

function Tabs() {
    const {id} = useParams()
    const login = useSelector(s=>s.login)
    
    return(
        <div className='tabs'>
                <Link activeClassName="active" to={`/user/profile/${id}/Pisos`}>Pisos</Link>
                {login.id===parseInt(id)?<Link activeClassName="active" to={`/user/profile/${id}/Reservas`}>Reservas</Link>:
                <div/>}
                
        </div>
    )
}

export default Tabs;