import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import DropDown from '../utils/DropDown'
import ButonDown from '../utils/butondown'


function Header() {
    const login = useSelector(s=>s.login)
    
    const avatarUrl = login&&login.image && (`http://localhost:9999/imagen/${login.image}.jpg`)
    const  avatarStyle = login&&login.image&&{backgroundImage: 'url('+ avatarUrl+')'}
   

    return(
        <header className='headerContainer'>
            <h1><Link to='/'><div className='main-logo'/></Link></h1>
            <div className='loginContainer'>
               {!login&&
                <div>
                    <Link to='/login'>Iniciar sesión</Link>
                </div>
                
            }
            {login&&
                <DropDown >
                    <div className='login-info'>
                        <div className='avatar' style={avatarStyle}></div>
                        {login.nombre?<div>{login.nombre}</div>:<div>{login.mail}</div>}
                        <ButonDown/>
                    </div>
                </DropDown>
                
            }
            </div>
            
        </header>
    )
}

export default Header