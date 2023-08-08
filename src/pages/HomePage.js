import { useDispatch, useSelector } from "react-redux";
import ProductList from "../features/product/ProductList"
import { selectLoggedInUser } from "../features/auth/authSlice";
import { getItemsByUserIdAsync } from "../features/cart/cartSLice";
import { useEffect } from "react";

const HomePage = ()=>{
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    useEffect(()=>{
      console.log(user)
      if(user!=null){
       dispatch(getItemsByUserIdAsync(user.id));
      }
    },[dispatch,user.id])
    return(
        <ProductList></ProductList>
    )
}
export default HomePage