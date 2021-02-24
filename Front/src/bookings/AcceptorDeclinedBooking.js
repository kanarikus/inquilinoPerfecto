import { useSelector } from "react-redux"
import './acceptordecline.css'

const { useState } = require("react")


function AcceptorDeclineBooking({value}) {
    const login = useSelector(s=>s.login)

    const [acept,setAcept] = useState(false)
    const [declin,setDeclin] = useState(false)
    const [done,setDone] = useState(false)

    const handleAccept = async e  => {
        e.preventDefault()
        try{
            await fetch(`http://localhost:9999/reserva/acept/${value}`,{
                method:'PUT',
                headers:{'Authorization': login.token}
            })
            setAcept(true)
            setDone(true)
        }catch(e){
            console.warn(e)
        }
    }

    const handleDecline = async e => {
        e.preventDefault()
        try{
            await fetch(`http://localhost:9999/reserva/decline/${value}`,{
                method:'PUT',
                headers:{'Authorization': login.token}
            })
            setDeclin(true)
            setDone(true)
        }catch(e){
            console.warn(e)
        }
        
    }

    return(
        <div>
            {!done&&
            <div className='aceptor-container'>
                <p className='accept-booking' onClick={handleAccept}><b>Aceptar</b></p>
                <p className='decline-booking' onClick={handleDecline}><b>Declinar</b></p>
            </div>
            }
            {acept&&
            <div className='booking-contested'><b>Has aceptado esta reserva</b></div>
            }
            {declin&&
            <div className='booking-contested'><b>Has rechazado esta reserva</b></div>
            }
        </div>
    )
}
export default AcceptorDeclineBooking;