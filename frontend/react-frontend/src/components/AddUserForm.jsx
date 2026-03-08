
export default function AddUserForm({onClose}){
    return(
        <form className="admin-form" action="">
            <div className="form-grid">
                <label htmlFor="fullname">ФИО</label>
                <input type="text" name="fullname" placeholder="ФИО"/>
                <label htmlFor="phone">Телефон</label>
                <input type="tel" name="phone" placeholder="Телефон" />
                <label htmlFor="email">Электронная почта</label>
                <input type="email" name="email" placeholder="Электронная почта" />
                <label htmlFor="password">Пароль</label>
                <input type="text" name="password" placeholder="Пароль" />
                <label htmlFor="sex">Пол</label>
                <input type="text" name="sex" placeholder="Пол"/>
                <label htmlFor="birthday">Дата рождения</label>
                <input type="date"name="birthday" placeholder="Дата рождения" />
            </div>
            

            <div className="modal-buttons">
                <button type="submit" className="btn-save">Сохранить</button>
                <button type="button" className="btn-cancel" onClick={onClose}>Отмена</button> 
            </div>
            
        </form>
    )
}