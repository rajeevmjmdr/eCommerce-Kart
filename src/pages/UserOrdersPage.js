import Navbar from "../features/navbar/Navbar";
import { UserOrder } from "../features/user/components/UserOrder";
import Footer from "../features/common/Footer";
const UserOrdersPage = () => {
  return (
    <>
      <Navbar>
        <h1 className="mx-auto text-3xl py-4">My Orders</h1>
        <UserOrder></UserOrder>
      </Navbar>
      <Footer></Footer>
    </>
  );
};
export default UserOrdersPage;
