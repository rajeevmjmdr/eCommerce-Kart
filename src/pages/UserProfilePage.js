import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";
import Footer from "../features/common/Footer";
const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <h1 className="mx-auto text-3xl py-4 px-5">My Profile</h1>
        <UserProfile></UserProfile>
      </Navbar>
      <Footer></Footer>
    </>
  );
};
export default UserProfilePage;
