import { useSelector } from "react-redux"

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
            <div>
                <span onClick={handleAccept}>Aceptar</span>
                <span onClick={handleDecline}>Declinar</span>
            </div>
            }
            {acept&&
            <div>Has aceptado esta reserva</div>
            }
            {declin&&
            <div>Has rechazado esta reserva</div>
            }
        </div>
    )
}
export default AcceptorDeclineBooking;