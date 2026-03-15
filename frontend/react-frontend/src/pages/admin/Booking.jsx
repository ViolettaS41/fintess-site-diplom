import { useState, useEffect } from "react"
import axios from 'axios'

export default function Booking(){

  const [activities, setActivities] = useState([])
  const [trainers, setTrainers] = useState([])
  const [rooms, setRooms] = useState([])

  const [formData, setFormData] = useState({
    activity_id: "",
    trainer_id: "",
    room_id: "",
    start_time: "",
    end_time: "",
    max_capacity: ""
  })

  useEffect(() => {
    loadLists()
  }, [])

  const loadLists = async () => {
    try {
      const token = localStorage.getItem("token")
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
  
      const [activitiesRes, trainersRes, roomsRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/admin/activities", config),
        axios.get("http://127.0.0.1:8000/trainers", config),
        axios.get("http://127.0.0.1:8000/admin/rooms", config)
      ])
  
      setActivities(activitiesRes.data)
      setTrainers(trainersRes.data)
      setRooms(roomsRes.data)
    } catch (error) {
      console.error("Ошибка загрузки списков", error)
      alert("Не удалось загрузить списки")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")

      await axios.post(
        "http://127.0.0.1:8000/admin/sessions",
        {
          activity_id: Number(formData.activity_id),
          trainer_id: Number(formData.trainer_id),
          room_id: Number(formData.room_id),
          start_time: formData.start_time+':00',
          end_time: formData.end_time+':00',
          max_capacity: Number(formData.max_capacity)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Тренировка успешно добавлена")

      setFormData({
        activity_id: "",
        trainer_id: "",
        room_id: "",
        start_time: "",
        end_time: "",
        max_capacity: ""
      })
    } catch (error) {
      console.error("Ошибка создания тренировки", error)

      if (error.response) {
        alert(`Ошибка: ${error.response.data.detail || "Не удалось создать тренировку"}`)
      } else {
        alert("Сервер недоступен")
      }
    }
  }
    return(
        <main>
            <div className="card form-card">
        <h2>Добавить тренировку</h2>
        <form className="edit-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Время начала</label>
            <input type="datetime-local" name="start_time" 
            className="form-input" value= {formData.start_time} onChange={handleChange}
             />
          </div>

          <div className="form-group">
            <label className="form-label">Время окончания</label>
            <input type="datetime-local" name="end_time"
             className="form-input" value= {formData.end_time} onChange={handleChange}
             />
          </div>

          <div className="form-group">
            <label className="form-label">Направление</label>
            <select name="activity_id" id="activity"
            className="form-input"
            value={formData.activity_id}
            onChange={handleChange}>
              <option value="">Выберите Направление</option>
              {activities.map((activity)=>(
                <option
                key={activity.activity_type_id}
                value={activity.activity_type_id}>{activity.name}</option>
              ))}
            </select>
            
          </div>

          <div className="form-group">
            <label className="form-label">Тренер</label>
            <select name="trainer_id" className="form-input"
            value={formData.trainer_id}
            onChange={handleChange}>
              <option value=''>Выберите тренера</option>
              {trainers.map((trainer)=>(
                <option key={trainer.trainer_id} value={trainer.trainer_id}>{trainer.fullname}</option>
              ))}
            </select>
            
          </div>

          <div className="form-group">
            <label className="form-label">Зал</label>
            <select name="room_id" className="form-input"
            value={formData.room_id}
            onChange={handleChange}>
              <option value="">Выберите зал</option>
              {rooms.map((room)=>(
                <option key={room.room_id} value={room.room_id}>{room.name_room}</option>
              ))}
            </select>
            
          </div>

          <div className="form-group">
            <label className="form-label">Свободные места</label>
            <input type="number" name="max_capacity"
            className="form-input" 
            value={formData.max_capacity}
            onChange={handleChange} />
          </div>

          {/* <div className="form-group">
            <label className="form-label">Стоимость</label>
            <input type="number" 
            className="form-input" 
            value='' />
          </div> */}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Запланировать тренировку
            </button>
          </div>
        </form>
      </div>
        </main>
    )
}