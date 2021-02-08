import {useState} from 'react'
import {login} from '../api'
import {useHistory} from 'react-router-dom'
import { useLogin } from '../LoginContext'

function Login () {
    const [error,setError] = useState(false)
    const [email,setMail] = useState('')
    const [password,setPassword] = useState('')
    const [,setLogin] = useLogin()

    const history = useHistory()

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            const data = await login(email,password);
            console.log(data)
            setLogin(data)
            history.push('/')
        }catch(e) {
            console.warn(e)
            setError(true)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                email:
                <input value={email}
                required
                onChange = {e=>setMail(e.target.value)}/>
            </label>
            <label>
                Contraseña:
                <input value={password}
                required
                onChange = {e => setPassword(e.target.value)}/>
            </label>
            <button >Log in</button>
            {error&&
                <div>
                    Usuario o contraseña incorrecto
                </div>
            }
        </form>
    )
}

export default Login