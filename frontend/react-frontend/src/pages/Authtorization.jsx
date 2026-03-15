import { Link } from 'react-router-dom'
import './Auth_Reg.css'
import backup from '../assets/img/backup.svg'
import axios from 'axios'
import { useState } from 'react'


export default function Authtorization() {

    const [email, setEmail] = useState('')
    const [password_hash, setPassword] = useState('')

    const handleLogin = async (e) =>{
        e.preventDefault()

        try {
            
            const res = await axios.post(
                'http://127.0.0.1:8000/clients/login',
                {
                    email,
                    password_hash
                }
            )

            alert('Вход выполнен')

            localStorage.setItem('token', res.data.access_token)

            window.location.href = '/accaunt'
        } catch (error) {
            alert('Неверный логин или пароль')
        }
    }
    
    return (
        <main>
            <div className="container">
                <div className="main-inner">
                    <div className="main-content">
                        <div className="main-content-back-container">
                            <img src={backup} alt="arrow-left" />
                            <Link className="main-content-back" to="/">На главную</Link>
                        </div>
                        
                        <h1 className="main-content-title">Вход в личный кабинет</h1>
                        <form className="main-content-form" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required placeholder="Email" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <input type="password" id="password" name="password" required minLength="5" placeholder="Пароль" 
                                value={password_hash}
                                onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <button type="submit">Вход</button>
                        </form>
                        <Link className="main-content-registration" to="/registration">Нет аккаунта? Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}