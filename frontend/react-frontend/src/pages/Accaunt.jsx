import './Accaunt.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Accaunt(){

    const [user, setUser] = useState(null)
    const [training, setTraining] = useState(null)
    const [status, setStatus] = useState(null)

    const [bookingId, setBookingId] = useState(null)

    const [showEditModal, setShowEditModal] = useState(false)
    const [editName, setEditName] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [editEmail, setEditEmail] = useState('')

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
                `http://127.0.0.1:8000/clients/booking/confirm/${bookingId}`,
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

    const cancelTraining = async () => {
        const token = localStorage.getItem("token")
        try{
            await axios.put(
                `http://127.0.0.1:8000/clients/booking/cancel/${bookingId}`,
                {
                    status: 'cancelled'
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setTraining(null)
            setStatus(null)
            setBookingId(null)

            alert('Запись отменена')
        }
        catch(error){
            console.error(error.response.data)
            console.error('booking id', bookingId)
            alert('Ошибка отмены записи')
        }
    }

    const updateProfile = async () => {

        const token = localStorage.getItem("token")
    
        try {
    
            await axios.put(
                "http://127.0.0.1:8000/clients/me",
                {
                    fullname: editName,
                    email: editEmail,
                    phone: editPhone
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            
            // await fetchData()
            alert("Данные обновлены")
            setShowEditModal(false)
    
        } catch (error) {
            console.error(error)
            alert("Ошибка обновления данных")
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
                            {training ? (
                                status === 'confirmed' ? (
                                    <>
                                        Подтверждена
                                        <br />
                                        <button
                                            className="main-content-data-table-button cancel"
                                            onClick={cancelTraining}
                                        >
                                            Отменить запись
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="main-content-data-table-button"
                                            onClick={confirmTraining}
                                        >
                                            Подтвердить
                                        </button>

                                        <button
                                            className="main-content-data-table-button cancel"
                                            onClick={cancelTraining}
                                        >
                                            Отменить
                                        </button>
                                    </>
                                )
                            ) : (
                                '-'
                            )}
                        </p>
                        </div>
                    </div>
                    <div className="main-content-buttons">
                        <button className="main-content-button-schedule" onClick={()=> window.location.href='/schedule'}>Расписание тренировок</button>
                        <button className="main-content-button-schedule" onClick={()=> setShowEditModal(true)}>Редактировать данные</button>
                        <button className="main-content-button-logout" 
                        onClick={()=> 
                            {localStorage.removeItem('token')
                            window.location.href='/'
                        }}>Выйти</button>
                        
                    </div>
                </div>
            </div>
        </div>
        {showEditModal && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Редактировать данные</h2>

                    <input type="text"
                    value= {editName} 
                    onChange={(e)=> setEditName(e.target.value)}
                    placeholder='ФИО' 
                    required/>

                    <input type="email"
                    value= {editEmail} 
                    onChange={(e)=> setEditEmail(e.target.value)}
                    placeholder='Email' 
                    required/>

                    <input type="text"
                    value= {editPhone} 
                    onChange={(e)=> setEditPhone(e.target.value)}
                    placeholder='Телефон' 
                    required/>

                    <div className="modal-buttons">
                        <button onClick={updateProfile}>Сохранить</button>
                        <button onClick={() => setShowEditModal(false)}>Отмена</button>
                    </div>
                </div>
            </div>
        )}
     </main>
    )
}