import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './DeleteButon.css'


function DeleteBooking ({id}) {

    const login = useSelector(s=>s.login)
    const history = useHistory()

    const handleDelete = async e => {
        e.preventDefault()
        const res = await fetch(`http://localhost:9999/reserva/${id}`,{
            method: 'DELETE',
            headers: {'Authorization': login.token}
        })
        if(res.ok){
            history.push(`/userbooking`)
        }else{
            console.log('Ha ocurrido un error en el borrado de la reserva')
        }
    }

    
    return(
        <button className='delete-buton' onClick={(e)=>{if(window.confirm('Quieres borrar esta reserva?'))handleDelete(e)}}>
            <b>Borrar!</b>
        </button>

    )
}

export default DeleteBooking;