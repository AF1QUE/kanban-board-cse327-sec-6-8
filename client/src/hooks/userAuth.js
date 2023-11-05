import { useSelector } from "react-redux";

 
export default function UserAuth() {
    const auth = useSelector((state)=>state.auth)
   if(auth?.token && auth?.user){
    return true
   }else{
    return false
   }

}
