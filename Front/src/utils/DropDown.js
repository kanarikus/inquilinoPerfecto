import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import './DropDown.css'

function DropDown ({children}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [visible,setVisible] = useState()
    const login = useSelector(s=>s.login)
    const handleLogOut = () => {
        dispatch({type:'logout'})
        history.push('/')
    }
    return(
        <div className='dropdown-picker'onClick={()=>setVisible(!visible)}>
            {children}
            {visible &&
                <div className='dropdown'>
                    <Link to={`/user/profile/${login.id}`}>Perfil</Link>
                    <Link to='/userbooking'>Mis reservas</Link>
                    <Link to={`/user/homes/${login.id}`}>Mis pisos</Link>
                    <Link to='/createhome'>Sube tu piso</Link>
                    <div onClick={handleLogOut}>Cerrar sesión</div>
                </div>
            }
        </div>
    )
}

export default DropDown