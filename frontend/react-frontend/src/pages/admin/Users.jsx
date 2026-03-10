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

  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editEmail, setEditEmail] = useState('')

  const selectUser = (user) =>{
    setSelectUser(user)

    setEditName(user.fullname)
    setEditEmail(user.email)
    setEditPhone(user.phone)
  }

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
        }
      )

      await loadUsers()
      alert('Изменения успешно сохранены')
    } catch(error){
      const msg = error.response?.data?.detail || 'Не удалось сохранить изменения '
      alert(`Ошибка сохранения: ${msg}`)
    }
  }


  const loadUsers = async () =>{
    
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/users'
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
            <img
              src=""
              alt="Active"
              className="status-icon"
            />
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
            <input type="text" className="form-input" value="" />
          </div>

          <div className="status-row">
            <span className="status-label">Подтверждение записи:</span>
            <img
              src="${ASSET_PATH}/62_143.svg"
              alt="Not Confirmed"
              className="status-indicator"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-primary">
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