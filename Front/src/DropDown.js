import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function DropDown ({children}) {
    const [visible,setVisible] = useState()
    const login = useSelector(s=>s.login)

    return(
        <div>
            <button onClick={()=>setVisible(!visible)}>{children}</button>
            {visible &&
                <div>
                    <Link to={`/user/${login.id}`}>Perfil</Link>
                    <Link to='/userbooking'>Mis reservas</Link>
                    <Link to={`/user/homes/${login.id}`}>Mis pisos</Link>
                </div>
            }
        </div>
    )
}

export default DropDown