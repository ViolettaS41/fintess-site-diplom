import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css' 

import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Accaunt from './pages/Accaunt'
import Authtorization from './pages/Authtorization'
import Registration from './pages/Registation'

import Admin_login from './pages/admin/Admin-login'
import Users from './pages/admin/Users'
import Trainers from './pages/admin/Trainers'
import Dashboards from './pages/admin/Dashboards'
import Booking from './pages/admin/Booking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Клиентская часть */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/authtorization' element={<Authtorization />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/accaunt' element={<Accaunt />} />
        </Route>

        {/* Логин для админа */}
        <Route path='/admin/login' element={<Admin_login/>}/>

        {/* Админ часть */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='users' element={<Users />} />
          <Route path='trainers' element={<Trainers />} />
          <Route path='dashboards' element={<Dashboards />} />
          <Route path='booking' element={<Booking />} />
        </Route>      
      </Routes>
    </BrowserRouter>
  )
}

export default App 