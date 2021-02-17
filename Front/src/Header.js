import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import DropDown from './DropDown'


function Header() {
    const login = useSelector(s=>s.login)
    console.log(login)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch({type:'logout'})
    }

    return(
        <header className='headerContainer'>
            <h1><Link to='/'><div className='main-logo'/></Link></h1>
            <div>
               {!login&&
                <div className='loginContainer'>
                    <Link to='/login'>Iniciar sesión</Link>
                    <span>Buscar</span>
                    <span>Idioma</span>
                </div>
                
            }
            {login&&
                <div className='loginContainer'>
                    <Link to='/createhome'>Sube tu piso</Link>
                    <div><DropDown>{login.nombre}</DropDown></div>
                    <button onClick={handleLogOut}>Salir</button>
                </div>
            } 
            </div>
            
        </header>
    )
}

export default Header