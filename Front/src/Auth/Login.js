import {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

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
        }catch(e) {
            console.warn(e)
            setError(true)
        }
        
    }
    if(login) return <Redirect to="/"/>

    return(
        <form onSubmit={handleSubmit}>
            <h3>Iniciar sesión :D</h3>
            <label>
                email:
                <input value={email}
                required
                type='email'
                onChange = {e=>setEmail(e.target.value)}/>
            </label>
            <label>
                Contraseña:
                <input value={password}
                required
                type='password'
                onChange = {e => setPassword(e.target.value)}/>
            </label>
            <button >Log in</button>
            {error&&
                <div>
                    Usuario o contraseña incorrecto
                </div>
            }
            <div>
                <Link to="/recovery">No recuerdas tu contraseña?</Link>
            </div>
        </form>
    )
}

export default Login