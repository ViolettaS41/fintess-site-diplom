import './Schedule.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Schedule(){

    const [sessions, setSessions] = useState([])

    const [filter, setFilter] = useState("Все")


    const filteredSessions = sessions.filter(session => {
        if (filter === "Все") return true
        return session.activity === filter
    })

    const fetchSchedule = async () => {
        try{

            const res = await axios.get("http://127.0.0.1:8000/clients/schedule")

            setSessions(res.data)

        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchSchedule()
    }, [])

    const bookTraining = async (sessionId) => {

        const token = localStorage.getItem("token")

        try{

            await axios.post(
                `http://127.0.0.1:8000/clients/booking/${sessionId}`,
                {},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            alert("Вы успешно записались на тренировку")
            fetchSchedule()

        }catch(error){
            console.error(error)
            alert('Вы не вошли в аккаунт! Для записи на тренировку войдите или зарегистрируйтесь.')
        }

    }

    return(
        <main>
        <div className="container">
            <div className="main-inner">
                <div className="main-content">
                    <h1 className="main-content-title">Расписание тренировок</h1>
                    <div className="main-content-schedule-filter-buttons">
                        <button className="main-content-schedule-filter-button" onClick={() => setFilter("Все")}>Все</button>
                        <button className="main-content-schedule-filter-button" onClick={() => setFilter("Силовые")}>Силовые</button>
                        <button className="main-content-schedule-filter-button" onClick={() => setFilter("Кардио")}>Кардио</button>
                        <button className="main-content-schedule-filter-button" onClick={() => setFilter("Йога")}>Йога</button>
                        <button className="main-content-schedule-filter-button" onClick={() => setFilter("Пилатес")}>Пилатес</button>
                    </div>
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
                            {filteredSessions.map((session)=>
                                (
                                    <tr key={session.session_id}>
                                    <td>{session.time}</td>
                                    <td>{session.activity}</td>
                                    <td>{session.trainer}</td>
                                    <td>{session.room}</td>
                                    <td>{session.free_places}</td>
                                    <td>{session.price}</td>
                                    <td>
                                    {session.free_places > 0 ? (
                                            <button
                                                className="main-content-schedule-table-button"
                                                onClick={() => bookTraining(session.session_id)}
                                            >
                                                Записаться
                                            </button>
                                        ) : (
                                            <button
                                                className="main-content-schedule-table-button disabled"
                                                disabled
                                            >
                                                Нет мест
                                            </button>
                                        )}
                                    </td>
                                </tr>
                                )
                            )}
                                
                           </tbody>
                            
                        </table>
                    </div>
                    <div className="main-content-schedule-pagination">
                        <button className="main-content-schedule-pagination-button">Назад</button>
                        <button className="main-content-schedule-pagination-button">Вперед</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}