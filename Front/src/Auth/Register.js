import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import './register.css'


function Register() {

    const [user,setUser] = useState({})
    const [error,setError] = useState()
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await fetch('http://localhost:9999/usuario',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(user)
            })
            setUser('')
            history.push('/')
        }catch(e) {
            console.warn(e)
            setError(true)
        }
    }


    return(
        <form onSubmit={handleSubmit} className='register-container'>
            <h3>Regístrate!</h3>
            <label>Email</label>
            <input name="email"
            required
            placeholder="Introduce tu email..."
            value={user.email || ''}
            onChange={e=>setUser({...user,email:e.target.value})}
            />
            <label>Contraseña</label>
            <input
            name='password'
            type='password'
            required
            placeholder='Introduce tu contraseña...'
            value={user.password || ''}
            onChange = {e=> setUser({...user,password: e.target.value})}
            />
            <label>Ciudad</label>
            <input
            name='ciudad'
            placeholder='Introduce tu ciudad...'
            required
            value={user.ciudad || ''}
            onChange={e=>setUser({...user,ciudad:e.target.value})}
            />
            <button>Regístrate</button>
            {error&&
                <div>
                    Ya existe ese usuario
                </div>
            }
        </form>
    )
}
export default Register