import { useState } from "react"
import './butondown.css'

function ButonDown () {
    const [on,setOn] = useState(false)

    return(
        <div
            className={"ButonDown"+(on?'enabled' : 'disabled')}
            onClick = {()=>setOn(!on)}
        />
    )
}

export default ButonDown