import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogIn from './pages/UserLogIn'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import PaymentPage from './components/PaymentForm'
import PaymentSuccess from './components/PaymentSuccess'
import CaptainDashboard from './components/CaptainDashboard'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path='/login' element={<UserLogIn/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/riding' element={<Riding/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-riding' element={<CaptainRiding/>}/>
        <Route path="/captain-dashboard" element={<CaptainDashboard />} />
        <Route path='/captain-signup' element={<CaptainSignUp/>}/>
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path='/home' element={<UserProtectWrapper>
         

          <Home/>
        
        </UserProtectWrapper>}/>
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
        }/>
 <Route path='/captain-home' element={
  <CaptainProtectWrapper>
  <CaptainHome/>
  </CaptainProtectWrapper>}/>
      </Routes>
    </div>
  )
}

export default App