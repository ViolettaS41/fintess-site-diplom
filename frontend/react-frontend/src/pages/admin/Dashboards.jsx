import EditModal from '../../components/EditModal'
import editIcon from '../../assets/img/edit.svg'
import deleteIcon from '../../assets/img/delete.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboards(){

    const [sessions, setSession] = useState([])
    const [editingSession, setEditingSession] = useState(null)
    const [trainers, setTrainers] = useState([])
    const [rooms, setRooms] = useState([])
    const token = localStorage.getItem('token')

    const loadTrainersAndRooms = async () => {
      try {
          const [trainersRes, roomsRes] = await Promise.all([
              axios.get('http://127.0.0.1:8000/trainers', {
                  headers: { Authorization: `Bearer ${token}` }
              }),
              axios.get('http://127.0.0.1:8000/admin/rooms', {
                  headers: { Authorization: `Bearer ${token}` }
              })
          ])
          setTrainers(trainersRes.data)
          setRooms(roomsRes.data)
      } catch (error) { console.log(error) }
  }

  const loadSession = async ()=>{
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/admin/schedule',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSession(response.data)
    } catch (error){
      console.log(error)
    }
  }
  useEffect(()=> {
    loadSession()
    loadTrainersAndRooms()
  }, [])

  const deleteSession = async (id) => {
    const token = localStorage.getItem("token")
    try {
        await axios.delete(`http://127.0.0.1:8000/admin/schedule/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        alert("Тренировка удалена")
        setSession(prev => prev.filter(s => s.session_id !== id)) // обновляем state
    } catch (error) {
        console.error(error)
    }
}

  const updateSession = async (id, data) => {
    try {
        await axios.patch(`http://127.0.0.1:8000/admin/schedule/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setEditingSession(null) // закрываем модалку
        loadSession()           // обновляем список
    } catch (error) {
        console.error(error)
    }
  }
    
    return (
        <main>
            <div className="main-content-schedule-table">
                <table>
                    <thead>
                        <tr>
                            <th>Время</th>
                            <th>Направление</th>
                            <th>Тренер</th>
                            <th>Зал</th>
                            <th>Свободные места</th>
                            <th>Стоимость</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map(session => (
                            <tr key={session.session_id}>
                                <td>{session.start_time}</td>
                                <td>{session.activity}</td>
                                <td>{session.trainer}</td>
                                <td>{session.room}</td>
                                <td>{session.max_capacity}</td>
                                <td>1200р</td>
                            <td>
                                <button className="action-btn" type="button" onClick={()=> setEditingSession(session)}>
                                    <img src={editIcon} alt="Редактировать" />
                                </button>
                                <button className="action-btn" type="button" onClick={()=> deleteSession(session.session_id)}>
                                    <img src={deleteIcon} alt="Удалить" />
                                </button>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
                </div>
                <div className="main-content-schedule-pagination">
                    <button className="main-content-schedule-pagination-button" type="button">Назад</button>
                    <button className="main-content-schedule-pagination-button" type="button">Вперед</button>
                </div>

                {editingSession && (
                <EditModal
                    session={editingSession}
                    trainers={trainers}
                    rooms={rooms}
                    onClose={() => setEditingSession(null)}
                    onSave={updateSession}
                />
            )}
        </main>
    )
}