import {useState} from 'react'
import {useParams} from 'react-router-dom'

function Reset() {
    const {code} = useParams()
    const [password,setPassword] = useState('')
    const [sent,setSent] = useState(false)

    const handleSubmit= async e=> {
        e.preventDefault()
        await fetch('http://localhost:9999/usuario/password/reset/'+ code,{
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({password,code}),
            method:'PUT'
        })
        setSent(true)
    }

    if(sent) return(
        <div>
            Contraseña cambiada exitosamente!
        </div>
    )
    
    return(
        <form className='password reset' onSubmit={handleSubmit}>
            Introduce tu nueva contraseña payaso
            <div>
                <input placeholder='Contraseña...' type='password' required
                value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button>Cambiar contraseña</button>
        </form>
    )
}
export default Reset