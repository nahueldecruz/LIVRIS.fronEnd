import { Outlet } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent.jsx";
import './MainLayout.css'
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent.jsx";
import { useSideBar } from "../../Contexts/SideBarContext.jsx";

function MainLayout() {
	const { isSideBarOpen } = useSideBar()

	return (
		<div className="main__layout">
			{
				isSideBarOpen && (
					<aside className='main__sidebar'>
						<SideBarComponent />
					</aside>
				)
			}
			<div className="main__header">
				<HeaderComponent />
			</div>
			<main className="main__content">
				<Outlet />
			</main>
		</div>
	)
}

export default MainLayout