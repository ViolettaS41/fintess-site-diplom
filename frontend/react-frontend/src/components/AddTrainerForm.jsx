import { useState } from "react"
import axios from "axios"

export default function AddTrainerForm({ onClose, reloadTrainers }){

    const [fullname, setName] = useState('')
    const [trainer_email, setEmail] = useState('')
    const [specialization, setSpecialization] = useState('')
    

    const token = localStorage.getItem('token')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            await axios.post(
                'http://127.0.0.1:8000/trainers',
                {
                    fullname,
                    specialization,
                    trainer_email                    
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await reloadTrainers()
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
                <label htmlFor="email">Электронная почта</label>
                <input type="email" name="email" placeholder="Электронная почта" value={trainer_email} onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="specialization">Специализация</label>
                <input type="text" name="specialization" placeholder="Специализация" value={specialization} onChange={(e)=>setSpecialization(e.target.value)}/>
            </div>
            

            <div className="modal-buttons">
                <button type="submit" className="btn-save">Сохранить</button>
                <button type="button" className="btn-cancel" onClick={onClose}>Отмена</button> 
            </div>
            
        </form>
    )
}