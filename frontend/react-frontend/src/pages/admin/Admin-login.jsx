import { useState } from "react"
import axios from 'axios'



export default function Admin_login(){

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) =>{
        e.preventDefault()

        try {
            const res = await axios.post(
                'http://localhost:8000/auth/login',
                {
                    login,
                    password
                }
            )

            alert('Вход выполнен')

            localStorage.setItem('token', res.data.acces_token)
            localStorage.setItem('role', res.data.role)

            window.location.href = '/admin'
        } catch (error) {
            alert('Неверный логин или пароль')
        }
    }

    return (
        <main>
            <div className="container">
                <div className="main-inner">
                    <div className="main-content">                        
                        <h1 className="main-content-title">Вход в админ-панель</h1>
                        <form className="main-content-form" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Логин</label>
                                <input type="text" id="login" name="login" required placeholder="Login" 
                                value={login}
                                onChange={(e)=>setLogin(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <input type="password" id="password" name="password" required minLength="8" placeholder="Пароль" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <button type="submit">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}