
import editIcon from '../../assets/img/edit.svg'
import deleteIcon from '../../assets/img/delete.svg'

export default function Trainers() {
  return (
    <main>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Дата рождения</th>
              <th>Специализация</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Фамилия Имя Отчество</td>
              <td></td>
              <td></td>
              <td>
                <button className="action-btn">
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn">
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
            </tr>
            <tr>
              <td>Фамилия Имя Отчество</td>
              <td></td>
              <td></td>
              <td>
                <button className="action-btn">
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn">
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
            </tr>
            <tr>
              <td>Фамилия Имя Отчество</td>
              <td></td>
              <td></td>
              <td>
                <button className="action-btn">
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn">
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
            </tr>
            <tr>
              <td>Фамилия Имя Отчество</td>
              <td></td>
              <td></td>
              <td>
                <button className="action-btn">
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn">
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
            </tr>
            <tr>
              <td>Фамилия Имя Отчество</td>
              <td></td>
              <td></td>
              <td>
                <button className="action-btn">
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn">
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
            </tr>
            <tr>
              <td>Фамилия Имя Отчество</td>
              <td></td>
              <td></td>
              <td>
                <button className="action-btn">
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn">
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
            </tr>
            <tr>
              <td>Фамилия Имя Отчество</td>
              <td></td>
              <td></td>
              <td>
                <button className="action-btn">
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn">
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
            </tr>
            <tr>
              <td>Фамилия Имя Отчество</td>
              <td></td>
              <td></td>
              <td>
                <button className="action-btn">
                  <img src={editIcon} alt="Редактировать" />
                </button>
                <button className="action-btn">
                  <img src={deleteIcon} alt="Удалить" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="footer-actions">
        <button className="btn-add-trainer">Добавить тренера</button>
      </div>
    </main>
  )
}