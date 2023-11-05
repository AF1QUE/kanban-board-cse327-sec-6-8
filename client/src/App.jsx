 
 import Home from'./pages/Home/Home'
 import {BrowserRouter,Routes,Route}from'react-router-dom'
import SignUp from './components/SignUp'
import Signing from './components/Signing'
import PrivateRoutes from './utils/PrivateRoute'
import useAuthCheck from './hooks/useAuthCheck'
import Loading from './components/Loading'
import SecondPage from './pages/Home/SecondPage'
 export default function App() {
  const authChekced = useAuthCheck()

   return !authChekced ?(<Loading />):(
    <div>
     <BrowserRouter>
     <Routes>
      <Route element={<PrivateRoutes/>}>
       <Route element={<Home />} path='/' exact/>
      </Route>
      <Route element={<PrivateRoutes/>}>
       <Route element={<SecondPage />} path='/item/:id' exact/>
      </Route>
     
       <Route path='/login' element={<Signing />}/>
       <Route path='/register' element={<SignUp />}/>

     </Routes>
     </BrowserRouter>
    
    </div>
  ) 
 }
 