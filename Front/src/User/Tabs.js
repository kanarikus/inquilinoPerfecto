import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Tabs.css'

function Tabs() {
    const [active,setActive] = useState()
    const tabList = ['Tus Pisos','Opiniones','Reservas']
    return(
        <div className='tabs'>
            {tabList.map(tab=>
                <NavLink activeClassName="active" to={"/user/1/" + tab}>
                    {tab}
                </NavLink>
            )}
        </div>
    )
}

export default Tabs;