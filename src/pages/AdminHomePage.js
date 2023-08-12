import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/AdminProductList";

const AdminHomePage = ()=>{
    return(
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    )
}
export default AdminHomePage