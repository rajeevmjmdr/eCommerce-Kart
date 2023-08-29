import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, selectLoggedInUserToken } from "../authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { resetUserInfo } from "../../user/userSlice";

const Logout = ()=>{
const dispatch = useDispatch();
const user = useSelector(selectLoggedInUserToken);
useEffect(()=>{
    dispatch(logoutUserAsync());
    dispatch(resetUserInfo());
},[dispatch])
    return(
        <>
        {!user && <Navigate to="/login" replace={true}></Navigate>}
        </>
    );
}
export default Logout;