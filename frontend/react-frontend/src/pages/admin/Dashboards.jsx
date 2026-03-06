
import editIcon from '../../assets/img/edit.svg'
import deleteIcon from '../../assets/img/delete.svg'

export default function Dashboards(){
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
                        <tr>
                            <td>10:00</td>
                            <td>Силовые</td>
                            <td>Иван Иванов</td>
                            <td>Зал 1</td>
                            <td>10</td>
                            <td>1200р</td>
                            <td>
                                <button className="action-btn" type="button">
                                    <img src={editIcon} alt="Редактировать" />
                                </button>
                                <button className="action-btn" type="button">
                                    <img src={deleteIcon} alt="Удалить" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="main-content-schedule-pagination">
                    <button className="main-content-schedule-pagination-button" type="button">Назад</button>
                    <button className="main-content-schedule-pagination-button" type="button">Вперед</button>
                </div>
        </main>
    )
}