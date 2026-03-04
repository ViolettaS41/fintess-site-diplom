import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/img/logo.svg'

function Header() {
    return (
        <header>
            <div className="container">
                <div className="header-inner">
                    <div className="header-logo">
                        <img src={logo} alt="logo" />
                        <p>PowerZone</p>
                    </div>
                    <div className="header-menu">
                        <ul>
                            <li><Link to="/">Главная</Link></li>
                            <li><a href="#">О нас</a></li>
                            <li><Link to="/schedule">Расписание</Link></li>
                            <li><a href="#">Тренеры</a></li>
                            <li><a href="#">Контакты</a></li>
                        </ul>
                    </div>
                    <div className="header-buttons">
                        <div className="header-button-login">
                            <Link to="/registration">Войти</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header