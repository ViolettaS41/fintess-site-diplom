import { Link } from 'react-router-dom'
import './Auth_Reg.css'
import backup from '../assets/img/backup.svg'

export default function Registration() {
    return (
        <main>
            <div className="container">
                <div className="main-inner">
                    <div className="main-content">
                        <div className="main-content-back-container">
                            <img src={backup} alt="arrow-left" />
                            <Link className="main-content-back" to="/">На главную</Link>
                        </div>
                        
                        <h1 className="main-content-title">Регистрация</h1>
                        <form className="main-content-form" action="">
                            <div className="form-group">
                                <label htmlFor="name">Имя</label>
                                <input type="text" id="name" name="name" required placeholder="Имя" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <input type="password" id="password" name="password" required minLength="8" placeholder="Пароль" />
                            </div>
                            <button type="submit">Зарегистрироваться</button>
                        </form>
                        <Link className="main-content-registration" to="/authtorization">Уже есть аккаунт? Войти</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}