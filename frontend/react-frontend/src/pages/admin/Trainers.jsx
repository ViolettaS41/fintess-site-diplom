import axios from 'axios'
import { useState, useEffect } from 'react'
import editIcon from '../../assets/img/edit.svg'
import deleteIcon from '../../assets/img/delete.svg'
import AddTrainerForm from '../../components/AddTrainerForm'
import EditTrainerForm from '../../components/EditTrainerForm'
import DeleteTrainerModal from '../../components/DeleteTrainerModal'

export default function Trainers() {

  const [trainers, setTrainers] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const token = localStorage.getItem('token')

  const loadTrainers = async ()=>{
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/trainers',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTrainers(response.data)
    } catch (error){
      console.log(error)
    }
  }
  useEffect(()=> {
    loadTrainers()
  }, [])

  return (
    <main>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Email</th>
              <th>Специализация</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map(trainer => (
              <tr key={trainer.trainer_id}>
                <td>{trainer.fullname}</td>
                <td>{trainer.trainer_email}</td>
                <td>{trainer.specialization}</td>
                <td>
                <button className="action-btn" onClick={()=>{
                  setSelectedTrainer(trainer)
                  setShowEditModal(true)
                }}>
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn" onClick={()=>{
                  setSelectedTrainer(trainer)
                  setShowDeleteModal(true)
                }}>
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer-actions">
        <button className="btn-add-trainer" onClick={()=>setShowForm(true)}>Добавить тренера</button>
      </div>

      {showForm &&(
        <div className="modal">
          <div className="modal-content">
            <h2>Добавить тренера</h2>
            <AddTrainerForm onClose={()=> setShowForm(false)} reloadTrainers={loadTrainers}/>
          </div>
        </div>
      )}

      {showDeleteModal && selectedTrainer && (

      <DeleteTrainerModal
        trainer={selectedTrainer}
        onClose={() => setShowDeleteModal(false)}
        reloadTrainers={loadTrainers}
      />
      )}

      {showEditModal && selectedTrainer && (

      <div className="modal">
        <div className="modal-content">

          <h2>Редактирование тренера</h2>

          <EditTrainerForm
            trainer={selectedTrainer}
            onClose={() => setShowEditModal(false)}
            reloadTrainers={loadTrainers}
          />

        </div>
      </div>

      )}
    </main>
  )
}