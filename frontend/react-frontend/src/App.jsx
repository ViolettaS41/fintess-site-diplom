import  { Routes, Route } from 'react-router-dom'
import './styles/global.css' 
import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Accaunt from './pages/Accaunt'
import Authtorization from './pages/Authtorization'
import Registration from './pages/Registation'

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/authtorization' element={<Authtorization />}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/accaunt' element={<Accaunt/>}/>
      </Routes>

      <Footer />
    </>
  )
}

export default App 