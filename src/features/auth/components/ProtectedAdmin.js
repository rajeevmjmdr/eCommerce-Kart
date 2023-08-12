import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";
import { useSelector } from "react-redux";

const ProtectedAdmin = ({children})=>{
    const user = useSelector(selectLoggedInUser);
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    if(user && user.role!=='admin'){
        return <Navigate to="/"></Navigate>
    }
    return children;
}
export default ProtectedAdmin;