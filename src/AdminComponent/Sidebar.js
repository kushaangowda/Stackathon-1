import React , {useState} from 'react'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import {IconContext } from 'react-icons'

function Sidebar() {
    const [sidebar,setSidebar] = useState(false);
    const showSidebar=()=> setSidebar(!sidebar);
    return (
        <>
        <IconContext.Provider value={{ color:'#fff'}}>
            <div className="nav-bar">
                <Link to="/admin" className="menu-bar">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div >
            <nav className={ sidebar ? 'nav-menu active': 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li class="navbar-toggle">
                        <Link to="#" className="menu-bar">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    { 
                    SidebarData.map((item, index) => {
                      return (
                             <li key={index} className={item.CName}>
                                <Link to={item.path}>
                                  {item.icons}
                                  <span>{item.title}</span>
                                </Link>
                             </li>

                             )
                        } 
                        ) 
                        }
</ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar
