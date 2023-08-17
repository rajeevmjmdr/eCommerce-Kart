import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/ProductDetail";

const ProductDetailPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
      <Footer></Footer>
    </>
  );
};
export default ProductDetailPage;
