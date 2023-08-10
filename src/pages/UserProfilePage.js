import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = ()=>{
    return(
        <Navbar>
        <h1 className="mx-auto text-3xl py-4">My Profile</h1>
        <UserProfile></UserProfile>
        </Navbar>
    )
}
export default UserProfilePage