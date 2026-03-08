import { Link, Outlet, Navigate} from "react-router-dom";
import './AdminLayout.css'

export default function AdminLayout(){

    const role = localStorage.getItem('role')

    if (role!== 'admin'){
        return <Navigate to='/admin/login'/>
    }

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="header-top">
                    <h1 className="page-title">Админ-панель</h1>
                    <button className="logout-btn">Выйти</button>
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