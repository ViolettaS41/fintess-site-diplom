import { useState } from "react"
import axios from "axios"

export default function EditTrainerForm({ trainer, onClose, reloadTrainers }) {

  const [fullname, setName] = useState(trainer.fullname)
  const [email, setEmail] = useState(trainer.trainer_email)
  const [specialization, setSpecialization] = useState(trainer.specialization)

  const token = localStorage.getItem("token")

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.put(
        `http://127.0.0.1:8000/trainers/${trainer.trainer_id}`,
        {
          fullname,
          email,
          specialization
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      await reloadTrainers()

      alert("Данные тренера обновлены")

      onClose()

    } catch(error){

      const msg =
        error.response?.data?.detail ||
        "Ошибка обновления"
      console.log(msg, error)
      alert(msg)
    }
  }

  return (

    <form onSubmit={handleSubmit} className="admin-form">
    <label htmlFor="fullname">ФИО</label>
      <input
        name="fullname"
        value={fullname}
        onChange={(e)=>setName(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        name="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

    <label htmlFor="specialization">Специализация</label>
      <input
      name="specialization"
        value={specialization}
        onChange={(e)=>setSpecialization(e.target.value)}
      />

    <div className="modal-buttons">
        <button type="submit">Сохранить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
      

    </form>

  )
}