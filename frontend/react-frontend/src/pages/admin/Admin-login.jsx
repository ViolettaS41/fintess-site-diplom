export default function Admin_login(){
    return (
        <main>
            <div className="container">
                <div className="main-inner">
                    <div className="main-content">                        
                        <h1 className="main-content-title">Вход в админ-панель</h1>
                        <form className="main-content-form" action="">
                            <div className="form-group">
                                <label htmlFor="email">Логин</label>
                                <input type="text" id="login" name="login" required placeholder="Login" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <input type="password" id="password" name="password" required minLength="8" placeholder="Пароль" />
                            </div>
                            <button type="submit">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}