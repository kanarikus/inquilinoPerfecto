import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"

function UpdateHomeWrapper() {
    const {id} = useParams()
    const data = useFetch(`http://localhost:9999/vivienda/${id}`)
    console.log(data)
    return data ? <UpdateHome data={data[0]}/> : false
}

function UpdateHome({data}) {

    const login = useSelector(l=>l.login)
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
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('direccion',direccion)
        fd.append('provincia',provincia)
        fd.append('ciudad',ciudad)
        fd.append('precio',precio)
        fd.append('m2',m2)
        fd.append('habitaciones',habitaciones)
        fd.append('baños',baños)
        // fd.append('garaje',garaje)
        // fd.append('jardin',jardin)
        // fd.append('ascensor',ascensor)
        // fd.append('balcon',balcon)
        fd.append('id_usuario',login.id)
        fetch(`http://localhost:9999/vivienda/${id}`,{
            method:'PUT',
            headers:{'Authorization': login.token},
            body: fd
        })
        history.push(`/vivienda/${id}`)
    }

    return(
        <form onSubmit={handleSubmit}>
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
            <textarea/>
            <button>Editar</button>
        </form>
    )
}

export default UpdateHomeWrapper;