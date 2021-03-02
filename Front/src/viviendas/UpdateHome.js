import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import HomeBookings from "./HomeBookings"
import './updatehome.css'

function UpdateHomeWrapper() {
    const {id} = useParams()
    const data = useFetch(`http://localhost:9999/vivienda/${id}`)
    console.log(data)
    return data ? <UpdateHome data={data[0]}/> : false
}

function UpdateHome({data}) {

    const login = useSelector(l=>l.login)
    const id_usuario = login.id

    const ref = useRef()
    const refa = useRef()
    const {id} = useParams()

    const [direccion,setDireccion] = useState(data.direccion ||'')
    const [provincia,setProvincia] = useState(data.provincia||'')
    const [ciudad,setCiudad] = useState(data.ciudad||'')
    const [precio, setPrecio] = useState(data.precio_piso||'')
    const [m2,setM2] = useState(data.m2||'')
    const [habitaciones,setHabitaciones] = useState(data.habitaciones||'')
    const [baños, setBaños] = useState(data.baños||'')
    const [garaje,setGaraje] = useState(data.garaje||'')
    const [jardin,setJardin] = useState(data.jardin||'')
    const [ascensor,setAscensor] = useState(data.ascensor||'')
    const [balcon,setBalcon] = useState(data.balcon||'')
    const [descripcion,setDescripcion] = useState(data.descripcion || '')
    const [preview,setPreview] = useState(null)
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        const avatar = e.target.avatar.files[0]
        const fd = new FormData()
        fd.append('image',avatar)
        fd.append('direccion',direccion)
        fd.append('provincia',provincia)
        fd.append('ciudad',ciudad)
        fd.append('precio',precio)
        fd.append('m2',m2)
        fd.append('habitaciones',habitaciones)
        fd.append('baños',baños)
        fd.append('garaje',garaje?'si':'no')
        fd.append('jardin',jardin?'si':'no')
        fd.append('ascensor',ascensor?'si':'no')
        fd.append('balcon',balcon?'si':'no')
        fd.append('id_usuario',login.id)
        fd.append('descripcion',descripcion)
        fetch(`http://localhost:9999/vivienda/${id}`,{
            method:'PUT',
            headers:{'Authorization': login.token},
            body: fd
        })
        history.push(`/vivienda/${id}`)
    }

    const handlePreview= e =>{
        e.preventDefault()
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
    
    const handlePick = e => {
        e.preventDefault()
        ref.current.click()
    }

    const handlePhoto = e => {
        e.preventDefault()
        refa.current.click()
    }

    return(
        <div className='homendbookings'>
            {data&&(id_usuario!==data.id_usuario)&&<span>No tienes permisos para acceder a esta dirección</span>}
            {data&&(id_usuario === data.id_usuario)&&
            <form onSubmit={handleSubmit} className='form-container'>
                <h1>Mi piso</h1>
                {preview?<div className='image-preview' style={{backgroundImage: `url(${preview})`}}/>:
                    <div className='updatehome-image'
                    style={data.image&&{backgroundImage:'url('
                    +`http://localhost:9999/imagen/${data.image}.jpg`
                    +')'}}/>}
                <input ref={refa} name='avatar' onChange={handlePreview} className='uploadimage-home' type='file' accept='image/*'/>
                <div className='upload-image' onClick={handlePhoto}/>
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
                <div className='booleans'>
                    <label className='booleans-label'>Garaje<input type='checkbox' checked={garaje} onChange={e=>setGaraje(e.target.checked)}/></label>
                    
                    <label className='booleans-label'>Jardin<input type='checkbox' checked={jardin} onChange={e=>setJardin(e.target.checked)}/></label>
                    
                    <label className='booleans-label'>Ascensor<input type='checkbox' checked={ascensor} onChange={e=>setAscensor(e.target.checked)}/></label>
                    
                    <label className='booleans-label'>Balcon<input type='checkbox' checked={balcon} onChange={e=>setBalcon(e.target.checked)}/></label>
                    
                </div>
                <label>Descripción</label>
                <textarea className='descripcion-update' cols="50" rows="10" value={descripcion} onChange={e=>setDescripcion(e.target.value)}/>
                <button ref={ref} onChange={handleSubmit}></button>
                <div className='savebutton' onClick={handlePick}/>
            </form>}
            <div>
                {data&&data.id_usuario===id_usuario?<HomeBookings/>:''}
                
            </div>
        </div>
    )
}

export default UpdateHomeWrapper;