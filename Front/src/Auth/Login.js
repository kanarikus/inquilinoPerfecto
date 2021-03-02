import {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import './Login.css'

function Login () {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(false)

    const login = useSelector(s=>s.login)
    const dispatch = useDispatch()


    const handleSubmit = async e =>{
        e.preventDefault()
        try {

            const res = await fetch('http://localhost:9999/login',{
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,password}),
            method: 'POST'
            })
            const data = await res.json()
            dispatch({type:'login',data})
            console.log(data)
            if(!res){
                setError(true)
            }
        }catch(e) {
            console.warn(e)
            
        }
        
    }
    if(login) return <Redirect to="/"/>

    return(
        <form onSubmit={handleSubmit} className='login-container'>
            <h3><b>Iniciar sesión</b></h3>
            <p>Si ya tienes una cuenta inicia sesión</p>
            <div className='input-container'>
               <label>
                    email:
                </label>
                <input value={email}
                    required
                    placeholder='introduce tu email....'
                    type='email'
                    onChange = {e=>setEmail(e.target.value)}/>
                <label>
                    Contraseña:
                </label> 
                <input value={password}
                    required
                    placeholder='Introduce tu contraseña...'
                    type='password'
                    onChange = {e => setPassword(e.target.value)}/>
            </div>
            {error&&
                <div>
                    Usuario o contraseña incorrecto
                </div>
            }
            <button >Log in</button>
            {error&&
                <div>
                    Usuario o contraseña incorrecto
                </div>
            }
            <div className='link-div'>
                <Link to="/recovery">No recuerdas tu contraseña?</Link>
                <Link to='/register'>No tienes cuenta?</Link>
            </div>
        </form>
    )
}

export default Login