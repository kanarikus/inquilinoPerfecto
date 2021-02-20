import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import DropDown from './DropDown'


function Header() {
    const login = useSelector(s=>s.login)

    const avatarUrl = login&&login.image && (`http://localhost:9999/imagen/${login.image}.jpg`)
    const  avatarStyle = login&&login.image&&{backgroundImage: 'url('+ avatarUrl+')'}
    console.log(avatarUrl)

    return(
        <header className='headerContainer'>
            <h1><Link to='/'><div className='main-logo'/></Link></h1>
            <div>
               {!login&&
                <div className='loginContainer'>
                    <Link to='/login'>Iniciar sesión</Link>
                    <span>Buscar</span>
                </div>
                
            }
            {login&&
                <div className='loginContainer'>
                    <div className='avatar' style={avatarStyle}></div>
                    <div>{login.nombre}</div>
                    <DropDown><span className='flecha-abajo'/></DropDown>
                </div>
            } 
            </div>
            
        </header>
    )
}

export default Header