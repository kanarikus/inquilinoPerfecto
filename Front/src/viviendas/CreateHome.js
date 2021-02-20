import {useState} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './CreateHome.css'

function CreateHome() {
    const login = useSelector(l=>l.login)
    //console.log(login.token)
    const [direccion,setDireccion] = useState('')
    const [provincia,setProvincia] = useState('')
    const [ciudad,setCiudad] = useState('')
    const [precio, setPrecio] = useState('')
    const [m2,setM2] = useState('')
    const [habitaciones,setHabitaciones] = useState('')
    const [baños, setBaños] = useState('')
    const [garaje,setGaraje] = useState(false)
    const [jardin,setJardin] = useState(false)
    const [ascensor,setAscensor] = useState(false)
    const [balcon,setBalcon] = useState(false)
    const history = useHistory()

    const handleSubmit= async e => {
        e.preventDefault()
        const headers = {'Content-Type':'application/json'}
        if(login) headers['Authorization'] = login.token
        const res = await fetch('http://localhost:9999/vivienda',{
            headers,
            body: JSON.stringify({direccion,provincia,ciudad,precio,m2,habitaciones,baños,garaje:garaje?'si':'no',jardin:jardin? 'si': 'no',ascensor:ascensor?'si':'no',balcon:balcon?'si':'no'}),
            method:'POST'
        })
        if(res.ok) {
            history.push(`/user/homes/${login.id}`)
        }else {
            console.log('error')
        }
    }

    return(
        <div className='create-home'>
            <form className='create-form' onSubmit={handleSubmit}>
                <label>
                    Dirección
                </label>
                <input name='direccion' value={direccion} placeholder='Dirección' onChange={e=>setDireccion(e.target.value)}/>
                <label>
                    Provincia
                </label>
                <input name='provincia' value={provincia} placeholder='Provincia' onChange={e=>setProvincia(e.target.value)}/>
                <label>
                    Ciudad
                </label>
                <input name='ciudad' value={ciudad} placeholder='Ciudad' onChange={e=>setCiudad(e.target.value)}/>
                <label>
                    Precio
                </label>
                <input name='precio' type='number' value={precio} placeholder='Precio' onChange={e=>setPrecio(e.target.value)}/>
                <label>
                    m2
                </label>
                <input name='m2' type='number' value={m2} placeholder='m2' onChange={e=>setM2(e.target.value)}/>
                <label>
                    Habitaciones
                </label>
                <input name='habitaciones' type='number' value={habitaciones} placeholder='Habitaciones' onChange={e=>setHabitaciones(e.target.value)}/>
                <label>
                    Baños
                </label>
                <input name='baños' type='number' value={baños} placeholder='Baños' onChange={e=>setBaños(e.target.value)}/>
                <div>
                    <label>Garaje</label>
                    <input type='checkbox' checked={garaje} onChange={e=>setGaraje(e.target.checked)}/>
                    <label>Jardin</label>
                    <input type='checkbox' checked={jardin} onChange={e=>setJardin(e.target.checked)}/>
                    <label>Ascensor</label>
                    <input type='checkbox' checked={ascensor} onChange={e=>setAscensor(e.target.checked)}/>
                    <label>Balcon</label>
                    <input type='checkbox' checked={balcon} onChange={e=>setBalcon(e.target.checked)}/>
                </div>
                <label>Descripción</label>
                <textarea cols="40" rows="5"/>
                <button>SUBIR PISO</button>
            </form>
        </div>
    )
}

export default CreateHome;