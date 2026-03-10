import { useState } from "react"
import axios from "axios"

export default function AddUserForm({ onClose, reloadUsers }){

    const [fullname, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password_hash, setPassword] = useState('')
    const [sex, setSex] = useState('')
    const [birthday, setBirthday] = useState('')

    const token = localStorage.getItem('token')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            await axios.post(
                'http://localhost:8000/users',
                {
                    fullname,
                    email,
                    phone,
                    password_hash,
                    sex,
                    birthday
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await reloadUsers()
            alert('Изменения успешно сохранены')
            onClose()

        } catch (error){
            const msg = error.response?.data?.detail || 'Не удалось сохранить изменения '
            alert(`Ошибка сохранения: ${msg}`)
        }

        
            
        
    }

    return(
        <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-grid">
                <label htmlFor="fullname">ФИО</label>
                <input type="text" name="fullname" placeholder="ФИО" value={fullname} onChange={(e)=> setName(e.target.value)}/>
                <label htmlFor="phone">Телефон</label>
                <input type="tel" name="phone" placeholder="Телефон" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                <label htmlFor="email">Электронная почта</label>
                <input type="email" name="email" placeholder="Электронная почта" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password">Пароль</label>
                <input type="text" name="password" placeholder="Пароль" value={password_hash} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="sex">Пол</label>
                <input type="text" name="sex" placeholder="Пол" value={sex} onChange={(e)=>setSex(e.target.value)}/>
                <label htmlFor="birthday">Дата рождения</label>
                <input type="date" name="birthday" placeholder="Дата рождения" value={birthday} onChange={(e)=>setBirthday(e.target.value)}/>
            </div>
            

            <div className="modal-buttons">
                <button type="submit" className="btn-save">Сохранить</button>
                <button type="button" className="btn-cancel" onClick={onClose}>Отмена</button> 
            </div>
            
        </form>
    )
}