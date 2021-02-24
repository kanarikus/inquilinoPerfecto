import { useState} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import NewMap from '../utils/NewMap'
import './CreateHome.css'

function CreateHome() {

    const center = {
        lat: 42.2260838,
        lng: -8.7604452,
      }

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
    const [descripcion,setDescripcion] = useState('')
    const [position,setPosition] = useState(center)
    const latitude = position.lat 
    const longitude = position.lng
    const history = useHistory()

    const handleSubmit= async e => {
        e.preventDefault()
        const avatar = e.target.homeimage.files[0]
        const fd = new FormData()
        fd.append('direccion',direccion)
        fd.append('image',avatar)
        fd.append('provincia',provincia)
        fd.append('ciudad',ciudad)
        fd.append('precio',precio)
        fd.append('m2',m2)
        fd.append('habitaciones', habitaciones)
        fd.append('baños',baños)
        fd.append('garaje',garaje?'si':'no')
        fd.append('jardin',jardin?'si':'no')
        fd.append('ascensor',ascensor?'si':'no')
        fd.append('balcon',balcon?'si':'no')
        fd.append('latitude',latitude)
        fd.append('longitude',longitude)
        fd.append('descripcion',descripcion)
        const res = await fetch('http://localhost:9999/vivienda',{
            headers: {'Authorization': login.token},
            body: fd,
            method:'POST'
        })
        if(res.ok) {
            history.push(`/user/homes/${login.id}`)
        }else {
            console.log('error')
        }
    }
    
    const handlePosition = newposition => {
        setPosition(newposition)
    }

    return(
        <div className='create-home'>
            <form className='create-form' onSubmit={handleSubmit}>
                <label>
                    <span>Foto del piso</span>
                    <div>
                        <div/>
                        <input name='homeimage' type='file' accept='image/*'/>
                    </div>
                </label>
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
                <textarea value={descripcion} onChange={e=>setDescripcion(e.target.value)} cols="40" rows="5"/>
                <button>SUBIR PISO</button>
            </form>
            <NewMap position={position} center={center} onChange={handlePosition}/>
        </div>
    )
}

export default CreateHome;