import './Accaunt.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Accaunt(){

    const [user, setUser] = useState(null)
    const [training, setTraining] = useState(null)
    const [status, setStatus] = useState(null)

    const [bookingId, setBookingId] = useState(null)

    useEffect(() => {

        const token = localStorage.getItem("token")

        const fetchData = async () => {
            try {

                const userRes = await axios.get(
                    "http://localhost:8000/clients/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setUser(userRes.data)

                const trainingRes = await axios.get(
                    "http://127.0.0.1:8000/clients/me/training",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if(trainingRes.data.training){
                    setTraining(trainingRes.data.training)
                    setStatus(trainingRes.data.status)
                    setBookingId(trainingRes.data.booking_id)
                }

            } catch(error){
                console.error(error)
            }
        }

        fetchData()

    }, [])

    if(!user) return <p>Загрузка...</p>

    const confirmTraining = async () => {

        const token = localStorage.getItem("token")
    
        try{
    
            await axios.put(
                `http://127.0.0.1:8000/admin/booking/${bookingId}/confirm`,
                {
                    status: 'confirmed'
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
    
            setStatus("confirmed")
    
        }catch(error){
            console.error(error.response.data)
            console.error('booking id', bookingId)
            alert('Ошибка подтверждения записи')
        }
    }

    return (
        <main>
        <div className="container">
            <div className="main-content">
                <h1 className="main-content-title">Личный кабинет</h1>
                <div className="main-content-data-table">
                    <div className="main-content-columns">
                        <div className="left">
                            <p>ФИО</p>
                            <p>Email</p>
                            <p>Телефон</p>
                            <p>Следующая тренировка</p>
                            <p>Запись подтверждена?</p>
                        </div>
                        <div className="right">
                            <p>{user.fullname}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <p>
                                {training 
                                ? `${new Date(training.start_time).toLocaleString()} "${training.activity}" ${training.room} (${training.trainer})`
                                : "Нет записи"}
                            </p>
                            <p> 
                                {training
                                ? status === 'confirmed'
                                    ? "Подтверждена"
                                    : <button 
                                    className="main-content-data-table-button"
                                    onClick={confirmTraining}
                                    
                                    >Подтвердить</button>
                                : '-'}
                                </p>
                        </div>
                    </div>
                    <div className="main-content-buttons">
                        <button className="main-content-button-schedule" onClick={()=> window.location.href='/schedule'}>Расписание тренировок</button>
                        <button className="main-content-button-logout" 
                        onClick={()=> 
                            {localStorage.removeItem('token')
                            window.location.href='/'
                        }}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
     </main>
    )
}