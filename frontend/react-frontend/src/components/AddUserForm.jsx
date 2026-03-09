import { useState } from "react"

export default function AddUserForm({ close, reload}){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const token = localStorage.getItem('token')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await axios.post(
            'http://localhost:8000/users',
            {
                name,
                email,
                phone
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        reload()
        close()
    }

    return(
        <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-grid">
                <label htmlFor="fullname">ФИО</label>
                <input type="text" name="fullname" placeholder="ФИО" value={name} onChange={(e)=> setName(e.target.value)}/>
                <label htmlFor="phone">Телефон</label>
                <input type="tel" name="phone" placeholder="Телефон" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                <label htmlFor="email">Электронная почта</label>
                <input type="email" name="email" placeholder="Электронная почта" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password">Пароль</label>
                <input type="text" name="password" placeholder="Пароль" />
                <label htmlFor="sex">Пол</label>
                <input type="text" name="sex" placeholder="Пол"/>
                <label htmlFor="birthday">Дата рождения</label>
                <input type="date"name="birthday" placeholder="Дата рождения" />
            </div>
            

            <div className="modal-buttons">
                <button type="submit" className="btn-save">Сохранить</button>
                <button type="button" className="btn-cancel" onClick={close}>Отмена</button> 
            </div>
            
        </form>
    )
}