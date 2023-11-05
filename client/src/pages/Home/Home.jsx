import React, { useEffect } from 'react'
import SideBar from '../../components/Home/SideBar'
import Navbar from '../../components/NavBar'
import MiddleLayOut from '../../components/Home/MiddleLayOut'
import Cookies from 'js-cookie';
import axiosInstance from '../../utils/axios'
export default function Home() {
  useEffect(()=>{
        axiosInstance.get('/lists')
                      .then(res=>{
                        // const cookieValue = Cookies.get('Cookie_2');
                        // console.log('Cookie Value:', cookieValue)
                        console.log(res)
                      })
                      .catch(err => console.log(err))
  })
  return (
    <div>
      <Navbar />
      <SideBar/>
      {/* <MiddleLayOut /> */}
    </div>
  )
}
