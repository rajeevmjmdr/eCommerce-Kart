import Cart from "../features/cart/Cart";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

const CartPage = () => {
  return (
    <>
      <Navbar>
        <Cart></Cart>
      </Navbar>
      <Footer></Footer>
    </>
  );
};
export default CartPage;
