import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/AdminProductList";
import Footer from "../features/common/Footer";

const AdminHomePage = () => {
  return (
    <>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
      <Footer></Footer>
    </>
  );
};
export default AdminHomePage;
