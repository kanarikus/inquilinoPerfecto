import {useState} from 'react'
// import {useDispatch,useSelector} from 'react-redux'
// import { Redirect } from 'react-router-dom'


function Register() {

    //const dispatch = useDispatch()
    //const register = useSelector(r=>r.register)
    const [user,setUser] = useState({})
    const [error,setError] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await fetch('http://localhost:9999/usuario',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(user)
            })
            setUser('')
        }catch(e) {
            console.warn(e)
            setError(true)
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <h3>Regístrate!</h3>
            <input name="email"
            required
            placeholder="email..."
            value={user.email || ''}
            onChange={e=>setUser({...user,email:e.target.value})}
            />
            <input
            name='password'
            type='password'
            required
            placeholder='Contraseña...'
            value={user.password || ''}
            onChange = {e=> setUser({...user,password: e.target.value})}
            />
            <input
            name='ciudad'
            placeholder='Ciudad...'
            required
            value={user.ciudad || ''}
            onChange={e=>setUser({...user,ciudad:e.target.value})}
            />
            {/* <input
            name='nombre'
            placeholder='Nombre...'
            value={user.nombre || ''}
            onChange={e=>setUser({...user,nombre:e.target.value})}
            />
            <input
            name='Provincia'
            placeholder='Provincia...'
            value={user.Provincia || ''}
            onChange={e=>setUser({...user,Provincia:e.target.value})}
            />
            <input
            name='telf'
            placeholder='Teléfono...'
            value={user.telf || ''}
            onChange={e=>setUser({...user,telf:e.target.value})}
            /> */}
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