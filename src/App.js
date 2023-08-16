import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import AdminHomePage from "./pages/AdminHomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import Order_SuccessPage from "./pages/Order_SuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import LogoutPage from "./pages/LogoutPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { getItemsByUserIdAsync } from "./features/cart/cartSLice";
import { getLoggedInUserAsync } from "./features/user/userSlice";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage></HomePage>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage></AdminHomePage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/product_detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product_detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product_form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product_form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order_success/:id",
    element: (
      <Protected>
        <Order_SuccessPage></Order_SuccessPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <LogoutPage></LogoutPage>
      </Protected>
    ),
  },
  {
    path: "/forgot_password",
    element: (
      
        <ForgotPasswordPage></ForgotPasswordPage>
      
    ),
  },
  {
    path: "*",
    element: (
        <PageNotFoundPage></PageNotFoundPage>
    ),
  }
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(()=>{
    if(user!=null){
     dispatch(getItemsByUserIdAsync(user.id));
     dispatch(getLoggedInUserAsync(user.id));
    }
  },[dispatch,user])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
