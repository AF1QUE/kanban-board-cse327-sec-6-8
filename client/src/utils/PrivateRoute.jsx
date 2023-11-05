 import { useSelector } from 'react-redux'
import {Outlet,Navigate}from'react-router-dom'

 const PrivateRoutes =()=>{
  let auth = useSelector(state=>state.auth)
 
  return(
     auth.token ? <Outlet />:<Navigate to='/login' />
  )
 }

 export default PrivateRoutes