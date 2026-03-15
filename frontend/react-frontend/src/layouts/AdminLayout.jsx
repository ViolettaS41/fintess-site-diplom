import { Link, Outlet, Navigate} from "react-router-dom";
import './AdminLayout.css'
import axios from "axios";

export default function AdminLayout(){

    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.href = "/admin/login"
    }
    return Promise.reject(error)
  }
)

    if (!token){
            return <Navigate to='/admin/login'/>
        }

    if (role!== 'admin'){
        return <Navigate to='/admin/login'/>
    }

    

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="header-top">
                    <h1 className="page-title">Админ-панель</h1>
                    <button className="logout-btn" onClick={()=> 
                            {localStorage.removeItem('token')
                            window.location.href='/admin/login'}} >Выйти</button>
                </div>

                <nav className="admin-nav">
                    <Link to='/admin/users' className="nav-item">Пользователи</Link>
                    <Link to='/admin/trainers' className="nav-item">Тренеры</Link>
                    <Link to='/admin/dashboards' className="nav-item">Расписание</Link>
                    <Link to='/admin/booking' className="nav-item">Тренировки</Link>
                </nav>
            </header>
            
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    )
}