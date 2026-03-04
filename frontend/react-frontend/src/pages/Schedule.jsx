import './Schedule.css'

export default function Schedule(){
    return(
        <main>
        <div className="container">
            <div className="main-inner">
                <div className="main-content">
                    <h1 className="main-content-title">Расписание тренировок</h1>
                    <div className="main-content-schedule-filter-buttons">
                        <button className="main-content-schedule-filter-button">Все</button>
                        <button className="main-content-schedule-filter-button">Силовые</button>
                        <button className="main-content-schedule-filter-button">Кардио</button>
                        <button className="main-content-schedule-filter-button">Йога</button>
                        <button className="main-content-schedule-filter-button">Групповые</button>
                    </div>
                    <div className="main-content-schedule-table">
                        <table>
                            <tr>
                                <th>Время</th>
                                <th>Направление</th>
                                <th>Тренер</th>
                                <th>Зал</th>
                                <th>Свободные места</th>
                                <th>Действие</th>
                            </tr>
                            <tr>
                                <td>10:00</td>
                                <td>Силовые</td>
                                <td>Иван Иванов</td>
                                <td>Зал 1</td>
                                <td>10</td>
                                <td><button className="main-content-schedule-table-button">Записаться</button></td>
                            </tr>
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