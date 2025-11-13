import { useSideBar } from '../../Contexts/SideBarContext';
import './HeaderComponent.css'
import { FiSidebar } from "react-icons/fi";

function HeaderComponent() {

    const { toggleSideBar } = useSideBar()

    return (
        <div className='header'>
            <button className='header__button'>
                <FiSidebar onClick={toggleSideBar}/>
            </button>
            <h3 className='header__title'>LV</h3>
        </div>
    )
}

export default HeaderComponent