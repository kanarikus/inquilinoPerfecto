import {useState} from 'react'
import './recovery.css'

function Recovery() {
    const [email,setEmail] = useState('')
    const [sent,setSent] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        await fetch('http://localhost:9999/usuario/recover-password',{
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email}),
            method: 'POST'
        })
        setSent(true)
    }
    if(sent) return(
        <div className='mailsended-container'>
            <h4>Revisa tu email para recuperar la contraseña</h4>
            <div className='mail-sended'/>
        </div>
    )

    return(
        <form className='pass-recovery' onSubmit={handleSubmit}>
            <h3>Introduce tu email para recuperar contraseña</h3>
            <input placeholder="Email..." type='email' required
                value={email} onChange={e=>setEmail(e.target.value)}/>
            <button>Recuperar contraseña</button>
            <div className='spinner-login'/>

        </form>
    )
}

export default Recovery