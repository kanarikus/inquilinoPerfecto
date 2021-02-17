import { useState } from "react";
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
    
    const [name,setName] = useState(data.nombre ||'')
    //const [email,setEmail] = useState(data.email||'')
    const [provincia,setProvincia] = useState(data.Provincia|| '')
    const [ciudad,setCiudad] = useState(data.ciudad || '')
    const [telf,setTelf] = useState(data.telf || '')
    const [descripcion,setDescripcion] = useState(data.descripcion || '')

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
        history.push(`/user/${id}`)
    }

    const avatarUrl = data.image && `http://localhost:9999/imagen/${data.image}.jpg`
    const  avatarStyle = login&&data.image&&{backgroundImage: 'url('+ avatarUrl+')'}
    return(
        <div>
            <h2>Edita tu Perfil</h2>
            <form onSubmit={handleSubmit}>
                <label className='avatar-picker'>
                    <span>Foto de perfil:</span>
                    <div className='value'>
                        <div className='avatar' style={avatarStyle}/>
                        <input name='avatar' type='file' accept='image/*'/>
                    </div>
                </label>
                <label>
                    <span>Nombre</span>
                    <input
                    name='name'
                    value = {name}
                    onChange={e=>setName(e.target.value)}/>
                </label>
                {/* <label>
                    <span>email:</span>
                    <input
                    type='email'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}/>
                </label> */}
                <label>
                    <span>Provincia:</span>
                    <input
                    value={provincia}
                    onChange={e=>setProvincia(e.target.value)}
                    />
                </label>
                <label>
                    <span>Ciudad:</span>
                    <input
                    value={ciudad}
                    onChange={e=>setCiudad(e.target.value)}
                    />
                </label>
                <label>
                    <span>teléfono:</span>
                    <input
                    value={telf}
                    onChange={e=>setTelf(e.target.value)}
                    />
                </label>
                <label>
                    <span>Descripción:</span>
                    <textarea
                    value={descripcion}
                    onChange={e=>setDescripcion(e.target.value)}
                    />
                </label>
                <button>Guardar</button>
            </form>
        </div>
    )
}
export default UpdateUserWrapper;