
export default function AddUserForm({onClose}){
    return(
        <form className="admin-form" action="">
            <div className="form-grid">
                <label htmlFor="first-name">Фамилия</label>
                <input type="text" name="first-name" placeholder="Фамилия"/>
                <label htmlFor="name">Имя</label>
                <input type="text" name="name" placeholder="Имя"/>
                <label htmlFor="last-name">Отчество</label>
                <input type="text" name="last-name" placeholder="Отчество"/>
                <label htmlFor="phone">Телефон</label>
                <input type="tel" name="phone" placeholder="Телефон" />
                <label htmlFor="email">Электронная почта</label>
                <input type="email" name="email" placeholder="Электронная почта" />
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