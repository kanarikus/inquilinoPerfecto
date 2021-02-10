import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'


function Header() {
    const login = useSelector(s=>s.login)
    const dispatch = useDispatch

    const handleLogOut = () => {
        dispatch({type:'logout'})
    }

    return(
        <header>
            <h1><Link to='/'>Logo</Link></h1>
            {!login&&
                <Link to='/login'>Iniciar sesión</Link>
            }
            {login&&
                <div>
                    
                    <div>{login.nombre}</div>
                    <button onClick={handleLogOut}>Salir</button>
                </div>
            }
        </header>
    )
}

export default Header