import { Outlet } from 'react-router-dom'
import UserProfileScreen from '../../Screens/UserProfileScreen/UserProfileScreen'
import './UserProfileLayout.css'

function UserProfileLayout() {
	

	return (
		<div className="user-profile-layout">
            <UserProfileScreen />
            <Outlet />
		</div>
	)
}

export default UserProfileLayout