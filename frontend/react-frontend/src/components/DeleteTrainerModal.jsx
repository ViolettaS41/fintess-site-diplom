import axios from "axios"

export default function DeleteTrainerModal({ trainer, onClose, reloadTrainers }) {

  const deleteTrainer = async () => {

    const token = localStorage.getItem("token")

    try {

      await axios.delete(
        `http://127.0.0.1:8000/trainers/${trainer.trainer_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      await reloadTrainers()

      alert("Тренер удален")

      onClose()

    } catch(error){

      const msg =
        error.response?.data?.detail ||
        "Не удалось удалить тренера"

      alert(`Ошибка: ${msg}`)
    }
  }

  return (

    <div className="modal">

      <div className="modal-content">

        <h2>Удаление тренера</h2>

        <p>
          Удалить тренера <b>{trainer.fullname}</b>?
        </p>

        <div className="modal-buttons">

          <button
            className="btn btn-danger"
            onClick={deleteTrainer}
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