import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, selectLoggedInUser } from "../authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ()=>{
const dispatch = useDispatch();
const user = useSelector(selectLoggedInUser);
useEffect(()=>{
    dispatch(logoutUserAsync(user.id));
},[dispatch,user.id])
    return(
        <>
        {!user && <Navigate to="/login" replace={true}></Navigate>}
        </>
    );
}
export default Logout;