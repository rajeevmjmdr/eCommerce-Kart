import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../authSlice";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../user/userSlice";

const ProtectedAdmin = ({children})=>{
    const user = useSelector(selectLoggedInUserToken);
    const userInfo = useSelector(selectUserInfo);
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    if(user && userInfo.role!=='admin'){
        return <Navigate to="/"></Navigate>
    }
    return children;
}
export default ProtectedAdmin;