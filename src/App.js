import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import CartPage from './pages/CartPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>
  },
  { 
    path: "/cart",
    element: <CartPage></CartPage>
  }
]);
function App() {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
