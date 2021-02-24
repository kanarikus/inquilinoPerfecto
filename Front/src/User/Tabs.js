import { NavLink, useParams } from "react-router-dom";
import './Tabs.css'

function Tabs() {
    const {id} = useParams()
    
    const tabList = ['Pisos','Reservas']
    return(
        <div className='tabs'>
            {tabList.map(tab=>
                <NavLink activeClassName="active" to={`/user/profile/${id}/` + tab}>
                    {tab}
                </NavLink>
            )}
        </div>
    )
}

export default Tabs;