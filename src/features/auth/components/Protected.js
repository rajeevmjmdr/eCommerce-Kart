import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../authSlice";
import { useSelector } from "react-redux";

const Protected = ({children})=>{
    const user = useSelector(selectLoggedInUserToken);
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    return children;
}
export default Protected;