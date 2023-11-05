import UserAuth from "../hooks/userAuth"
import { Navigate } from "react-router-dom"
 

 export default function PublicRoute(children){
    const isLoggeding =  UserAuth()
    return !isLoggeding?children:<Navigate to='/' />
 
 }
