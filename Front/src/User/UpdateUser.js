import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import './updateuser.css'

function UpdateUserWrapper () {
    const {id} = useParams()
    const data = useFetch(`http://localhost:9999/usuario/${id}`)
    console.log(data)
    return data ? <UpdateUser data={data}/> : false
}

function UpdateUser({ data }) {
    const history = useHistory()
    const login = useSelector(s=>s.login)
    
    const {id} = useParams()
    const ref= useRef()
    console.log(login.id,id)
    const [name,setName] = useState(data.nombre ||'')
    //const [email,setEmail] = useState(data.email||'')
    const [provincia,setProvincia] = useState(data.Provincia|| '')
    const [ciudad,setCiudad] = useState(data.ciudad || '')
    const [telf,setTelf] = useState(data.telf || '')
    const [descripcion,setDescripcion] = useState(data.descripcion || '')
    const [preview,setPreview]= useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        const avatar = e.target.avatar.files[0]
        const fd = new FormData()
        fd.append('image',avatar)
        fd.append('nombre',name)
        //fd.append('email',email)
        fd.append('provincia',provincia)
        fd.append('ciudad',ciudad)
        fd.append('telf',telf)
        fd.append('descripcion',descripcion)
        fetch(`http://localhost:9999/usuario/${id}`,{
            method: 'PUT',
            headers: {'Authorization': login.token},
            body: fd
        })
        history.push(`/user/profile/${id}`)
    }

    const handlePreview= e =>{
        e.preventDefault()
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handlePick = e => {
        e.preventDefault()
        ref.current.click()
    }

    if(parseInt(id) !== login.id) {
        throw new Error()
    }

    const avatarUrl = data.image && `http://localhost:9999/imagen/${data.image}.jpg`
    const avatarStyle = login&&data.image&&{backgroundImage: 'url('+ avatarUrl+')'}
    return(
        <div className='main-updateuser'>
            <h2>Edita tu Perfil</h2>
            <form onSubmit={handleSubmit} className='updateuser-form'>
                <label className='avatar-picker'>
                    <span>Foto de perfil:</span>
                    <div className='value'>
                        {preview? <div className='image-preview' style={{backgroundImage: `url(${preview})`}}/>:
                        <div className='updateuser-image' style={avatarStyle}/>}
                        <input ref={ref} name='avatar' onChange={handlePreview} className='uploadimage-input' type='file' accept='image/*'/>
                        <button className='uploadimage' onClick={handlePick}/>
                    </div>
                </label>
                <label>
                    <span>Nombre</span><br/>
                    <input
                    name='name'
                    value = {name}
                    onChange={e=>setName(e.target.value)}/>
                </label>
                <label>
                    <span>Provincia:</span><br/>
                    <input
                    value={provincia}
                    onChange={e=>setProvincia(e.target.value)}
                    />
                </label>
                <label>
                    <span>Ciudad:</span><br/>
                    <input
                    value={ciudad}
                    onChange={e=>setCiudad(e.target.value)}
                    />
                </label>
                <label>
                    <span>teléfono:</span><br/>
                    <input
                    value={telf}
                    onChange={e=>setTelf(e.target.value)}
                    />
                </label>
                <label>
                    <span>Descripción:</span><br/>
                    <textarea
                    cols="50" rows="8"
                    value={descripcion}
                    onChange={e=>setDescripcion(e.target.value)}
                    />
                </label>
                <button className='save-uploadedprofile'/>
            </form>
        </div>
    )
}
export default UpdateUserWrapper;