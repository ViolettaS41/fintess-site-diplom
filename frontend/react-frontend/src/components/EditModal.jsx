import { useState } from "react"
import './EditModal.css'

export default function EditModal({ session, trainers, rooms, onClose, onSave }) {

    const [formData, setFormData] = useState({
        start_time: session.start_time,
        max_capacity: session.max_capacity,
        trainer_id: trainers.find(t => t.fullname === session.trainer)?.trainer_id || "",
        room_id: rooms.find(r => r.name_room === session.room)?.room_id || ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        onSave(session.session_id, formData)
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Редактировать тренировку</h3>

                <label>Время начала:</label>
                <input
                    type="datetime-local"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                />

                <label>Максимум мест:</label>
                <input
                    type="number"
                    name="max_capacity"
                    value={formData.max_capacity}
                    onChange={handleChange}
                />

                <label>Тренер:</label>
                <select name="trainer_id" value={formData.trainer_id} onChange={handleChange}>
                    <option value="">Выберите тренера</option>
                    {trainers.map(tr => (
                        <option key={tr.trainer_id} value={tr.trainer_id}>{tr.fullname}</option>
                    ))}
                </select>

                <label>Зал:</label>
                <select name="room_id" value={formData.room_id} onChange={handleChange}>
                    <option value="">Выберите зал</option>
                    {rooms.map(r => (
                        <option key={r.room_id} value={r.room_id}>{r.name_room}</option>
                    ))}
                </select>

                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Сохранить</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    )
}