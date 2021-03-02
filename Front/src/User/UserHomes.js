import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import './UserHomes.css'


function UserHomes() {
    const {id} = useParams()
    const data = useFetch('http://localhost:9999/usuario/vivienda/'
    +`${id}`)
    

    const [page,setPage] = useState(1)
    const paginatedData = data ? data.slice(2*(page-1),page*2) : []
    const max = data ? Math.ceil(data.length/2) : []

    return(
        <div className='main-listhomes'>
            <h1>Mis pisos</h1>
            {data&&paginatedData.map(d=>
            <Link to={`/myhome/${d.id}`}><div id='listhome'>
                <div className='myhomes-image'
                    style={d.image&&{backgroundImage:'url('
                    +`http://localhost:9999/imagen/${d.image}.jpg`
                    +')'}}/>
                <main className='myhomes-content'>
                    <h3> {d.precio_piso}€</h3>
                    <p>{d.ciudad}</p>
                    <p className='atrivutes'>{d.habitaciones}habs. | {d.baños}baños | {d.m2}m2</p>
                    <p>{d.direccion}</p>
                </main>
                <Link className='more-info' to={`/vivienda/${d.id}`}><b>Ver más</b></Link>
            </div>
            </Link>
            )}
            {data&&
            <div className='pagination'>
                <span className='goback' onClick={()=>setPage(page>1? page-1:1)}><div/></span>
                <span>{page}/{max}</span>
                <span className='next' onClick={()=>setPage(page<max ? page+1:max)}><div/></span>
            </div>}
        </div>
    )
}
export default UserHomes