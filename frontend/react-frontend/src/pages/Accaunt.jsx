import './Accaunt.css'

export default function Accaunt(){
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
                            <p>Иван Иванов</p>
                            <p>ivanov@example.com</p>
                            <p>+7 (123) 456-78-90</p>
                            <p>10:00 20.03.2026 "Восстановительная йога" в зале 1 (Иван Иванов)</p>
                            <p><button className="main-content-data-table-button">Подтвердить</button></p>
                        </div>
                    </div>
                    <div className="main-content-buttons">
                        <button className="main-content-button-schedule">Расписание тренировок</button>
                        <button className="main-content-button-logout">Выйти</button>
                    </div>
                </div>
            </div>
        </div>
     </main>
    )
}