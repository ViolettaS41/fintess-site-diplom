import './Users.css'
import { useState, useEffect } from 'react'
import AddUserForm from '../../components/AddUserForm'
import axios from 'axios'
import DeleteUserModal from '../../components/DeleteUserModal'

export default function Users(){

  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedUser, setSelectUser] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false) 

  const [nextBooking, setNextBooking] = useState(null)

  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editEmail, setEditEmail] = useState('')

  const selectUser = async (user) =>{
    setSelectUser(user)

    setEditName(user.fullname)
    setEditEmail(user.email)
    setEditPhone(user.phone)

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/users/${user.client_id}/next_booking`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
  
      setNextBooking(response.data)
  
    } catch (error) {
      console.error(error)
      setNextBooking(null)
    }
  }

  const token = localStorage.getItem('token')

  const updateUser = async (e) =>{
    e.preventDefault()

    if (!selectedUser) return

    try {

      await axios.put(
        `http://127.0.0.1:8000/users/${selectedUser.client_id}`,
        {
          fullname: editName,
          phone: editPhone,
          email: editEmail
        },
        {
        headers: {
          Authorization: `Bearer ${token}`
        }}
      )

      await loadUsers()
      alert('Изменения успешно сохранены')
    } catch(error){
      const msg = error.response?.data?.detail || 'Не удалось сохранить изменения '
      alert(`Ошибка сохранения: ${msg}`)
    }
  }

  const confirmBooking = async () => {

    if (!nextBooking) return
  
    try {
  
      await axios.put(
        `http://127.0.0.1:8000/admin/booking/${nextBooking.booking_id}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
  
      setNextBooking(prev => ({
        ...prev,
        status: "confirmed"
      }))
  
    } catch (error) {
      console.error(error)
      alert("Ошибка подтверждения записи")
    }
  }

  const loadUsers = async () =>{
   
    try {
      
      const response = await axios.get(
        'http://127.0.0.1:8000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }}
      )

      setUsers(response.data)
    } catch(error){
      console.error(error)
    }
  }

  useEffect(() =>{
    loadUsers()
  }, [])

    return (
        <main>
            <section id="section-admin-panel">
  <div className="container admin-layout">
    <div className="col-left">
      <div className="card list-card">
        <h2>Список пользователей</h2>
        <ul className="user-list">
          {users.map(user => (
            <li className= {`user-item ${selectedUser?.client_id === user.client_id ? 'active' : ''}`} 
            key={user.client_id} 
            onClick={()=> selectUser(user)}>
            <span className="user-name">{user.fullname}</span>
            <span
              className={`status-dot ${
                selectedUser?.client_id === user.client_id &&
                nextBooking?.status === 'confirmed'
                  ? 'green'
                  : 'gray'
              }`}
            ></span>
          </li>
          ))}
          
        </ul>
      </div>

      <div className="action-buttons">
        <button className="btn btn-dark" onClick={()=>setShowForm(true)}>Добавить пользователя</button>
        <button className="btn btn-dark" disabled={!selectedUser} onClick={()=> setShowDeleteModal(true)}>Удалить пользователя</button>
      </div>

      {showForm &&(
        <div className="modal">
          <div className="modal-content">
            <h2>Добавить пользователя</h2>
            <AddUserForm onClose={()=> setShowForm(false)} reloadUsers={loadUsers}/>
          </div>
        </div>
      )}
    </div>

    {showDeleteModal && selectedUser && (

      <DeleteUserModal 
        user={selectedUser}
        onClose={() => setShowDeleteModal(false)}
        reloadUsers={loadUsers}
      />
    )}

    <div className="col-right">
      <div className="card form-card">
        <h2>Данные пользователя</h2>
        <form className="edit-user-form" onSubmit={updateUser}>
          <div className="form-group">
            <label className="form-label">ФИО</label>
            <input type="text" className="form-input" value={editName} onChange={(e)=>setEditName(e.target.value)}/>
          </div>

          <div className="form-group">
            <label className="form-label">Телефон</label>
            <input type="tel" className="form-input" value={editPhone} onChange={(e)=>setEditPhone(e.target.value)}/>
          </div>

          <div className="form-group">
            <label className="form-label">Электронная почта</label>
            <input type="email" className="form-input" value={editEmail} onChange={(e)=>setEditEmail(e.target.value)}/>
          </div>

          <div className="form-group">
            <label className="form-label">Следующая запись</label>
            <input type="text" className="form-input" readOnly value={
              nextBooking?.training 
              ? `${new Date(nextBooking.training.start_time).toLocaleString()} - ${nextBooking.training.activity}`
              : 'Нет записей'
            } />
          </div>

          <div className="status-row">
              <span className="status-label">Статус записи:</span>

              <span
                className={
                  nextBooking?.status === "confirmed"
                    ? "status-confirmed"
                    : "status-not-confirmed"
                }
              >
                {nextBooking?.status === "confirmed"
                  ? "Подтверждено"
                  : "Не подтверждено"}
              </span>
            </div>

          <div className="form-actions">
            <button type="button" className="btn btn-primary" onClick={confirmBooking} disabled={!nextBooking || nextBooking.status === 'confirmed'}>
              Подтвердить вручную
            </button>
            <button type="submit" className="btn btn-secondary">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
        </main>
    )
}