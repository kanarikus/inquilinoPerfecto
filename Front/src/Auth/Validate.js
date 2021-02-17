import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Login from "./Login";

function Validate() {
    const {code} =useParams()
    console.log(code)

    const validated = useFetch(`http://localhost:9999/usuario/validar/${code}`)
    console.log(validated)
    return(
        <div>
            Has sido validado correctamente,entra de nuevo para finalizar el proceso
            <Login/>
        </div>
    )
}

export default Validate;