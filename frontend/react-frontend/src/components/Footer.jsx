import { Link } from 'react-router-dom'
import './Footer.css'
import inst from '../assets/img/inst.svg'
import tg from '../assets/img/tg.svg'

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-inner">
                    <div className="footer-menu">
                        <ul>
                            <li><Link to="/">Главная</Link></li>
                            <li><a href="#">О нас</a></li>
                            <li><Link to="/schedule">Расписание</Link></li>
                            <li><a href="#">Тренеры</a></li>
                            <li><a href="#">Контакты</a></li>
                        </ul>
                    </div>
                    <div className="main-content-contacts-info">
                        <ul>
                            <li>Адрес: г. Красноярск ул. Хххххх, д. 1</li>
                            <li>Телефон: +7900ХХХХХХХ</li>
                            <li>Электронная почта: powerzone@email.com</li>
                        </ul>
                    </div>
                    <div className="footer-social-right">
                        <div className="footer-social">
                            <a href="#" className="inst"><img src={inst} alt="inst" /></a>
                            <a href="#" className="tg"><img src={tg} alt="tg" /></a>
                        </div>
                        <div className="footer-right"><p>©PowerZone</p></div>
                    </div>
                </div>
            </div>    
        </footer>
    )
}

export default Footer