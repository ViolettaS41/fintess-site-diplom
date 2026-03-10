import axios from "axios"

export default function DeleteUserModal({ user, onClose, reloadUsers }) {

  const deleteUser = async () => {

    if (!user) {
        alert("Пользователь не выбран")
        return
      }

    try {

      await axios.delete(
        `http://127.0.0.1:8000/users/${user.client_id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }
      )

      await reloadUsers()
      alert('Пользователь успешно удален')
      onClose()

    } catch(error){
        const msg = error.response?.data?.detail || 'Не удалось удалить пользователя '
        console.log(user.client_id, typeof user.client_id)
        alert(`Ошибка сохранения: ${msg}`)
        
    }

  }

  return (

    <div className="modal">

      <div className="modal-content">

        <h2>Удаление пользователя</h2>

        <p>
          Вы действительно хотите удалить пользователя
          <b> {user.fullname}</b>?
        </p>

        <div className="modal-buttons">

          <button
            className="btn btn-danger"
            onClick={deleteUser}
          >
            Удалить
          </button>

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Отмена
          </button>

        </div>

      </div>

    </div>

  )
}