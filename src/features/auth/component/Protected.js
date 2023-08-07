import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";
import { useSelector } from "react-redux";

const Protected = ({children})=>{
    const user = useSelector(selectLoggedInUser);
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    return children;
}
export default Protected;