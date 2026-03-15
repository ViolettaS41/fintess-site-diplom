import { Link } from 'react-router-dom'
import './Auth_Reg.css'
import backup from '../assets/img/backup.svg'
import { useState } from 'react'
import axios from 'axios'

export default function Registration() {

const [fullname, setFullname] = useState("")
const [phone, setPhone] = useState("")
const [birthday, setBirthday] = useState("")
const [email, setEmail] = useState("")
const [password_hash, setPassword] = useState("")

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/clients/register", {
        fullname,
        phone,
        birthday,
        email,
        password_hash
      })

      alert(res.data.message)
      // перенаправляем на страницу логина
      window.location.href = "/authtorization"
    } catch (error) {
      const msg = error.response?.data?.detail || "Ошибка регистрации"
      alert(msg)
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
                        
                        <h1 className="main-content-title">Регистрация</h1>
                        <form className="main-content-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">ФИО</label>
                                <input type="text" id="name" name="name" required placeholder="ФИО" 
                                value={fullname} onChange={(e)=> setFullname(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Телефон</label>
                                <input type="text" id="phone" name="phone" required placeholder="Телефон" 
                                value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthday">Дата рождения</label>
                                <input type="date" id="birthday" name="birthday" required placeholder="Дата рождения" 
                                value={birthday} onChange={(e)=> setBirthday(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required placeholder="Email" 
                                value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_hash">Пароль</label>
                                <input type="password" id="password" name="password_hash" required minLength="5" placeholder="Пароль" 
                                value={password_hash} onChange={(e)=> setPassword(e.target.value)}/>
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