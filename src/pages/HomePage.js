import ProductList from "../features/product/ProductList"
import Navbar from "../features/navbar/Navbar";

const HomePage = ()=>{
    return(
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    )
}
export default HomePage