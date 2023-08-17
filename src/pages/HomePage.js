import ProductList from "../features/product/ProductList";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
const HomePage = () => {
  return (
    <>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Footer></Footer>
    </>
  );
};
export default HomePage;
