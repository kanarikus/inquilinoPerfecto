import {useState} from 'react'

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
        <div>
            Mira tu email para recuperar tu contraseña pendejo
        </div>
    )

    return(
        <form className='pass recovery' onSubmit={handleSubmit}>
            Introduce tu email para recuperar contraseña
            <div>
                <input placeholder="Email..." type='email' required
                value={email} onChange={e=>setEmail(e.target.value)}/>
                <button>Recuperar contraseña</button>
            </div>
        </form>
    )
}

export default Recovery