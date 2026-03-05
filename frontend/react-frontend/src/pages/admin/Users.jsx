import './Users.css'

export default function Users(){
    return (
        <main>
            <section id="section-admin-panel">
  <div class="container admin-layout">
    <div class="col-left">
      <div class="card list-card">
        <h2>Список пользователей</h2>
        <ul class="user-list">
          <li class="user-item">
            <span class="user-name">Фамилия Имя Отчество</span>
            <img
              src="${ASSET_PATH}/62_125.svg"
              alt="Active"
              class="status-icon"
            />
          </li>
          <li class="user-item">
            <span class="user-name">Фамилия Имя Отчество</span>
            <img
              src="${ASSET_PATH}/62_123.svg"
              alt="Inactive"
              class="status-icon"
            />
          </li>
          <li class="user-item">
            <span class="user-name">Фамилия Имя Отчество</span>
            <img
              src="${ASSET_PATH}/62_121.svg"
              alt="Active"
              class="status-icon"
            />
          </li>
          <li class="user-item">
            <span class="user-name">Фамилия Имя Отчество</span>
            <img
              src="${ASSET_PATH}/62_116.svg"
              alt="Active"
              class="status-icon"
            />
          </li>
          <li class="user-item">
            <span class="user-name">Фамилия Имя Отчество</span>
            <img
              src="${ASSET_PATH}/62_119.svg"
              alt="Inactive"
              class="status-icon"
            />
          </li>
          <li class="user-item">
            <span class="user-name">Фамилия Имя Отчество</span>
            <img
              src="${ASSET_PATH}/62_113.svg"
              alt="Active"
              class="status-icon"
            />
          </li>
          <li class="user-item">
            <span class="user-name">Фамилия Имя Отчество</span>
            <img
              src="${ASSET_PATH}/62_119.svg"
              alt="Inactive"
              class="status-icon"
            />
          </li>
          <li class="user-item">
            <span class="user-name">Фамилия Имя Отчество</span>
            <img
              src="${ASSET_PATH}/62_119.svg"
              alt="Inactive"
              class="status-icon"
            />
          </li>
        </ul>
      </div>

      <div class="action-buttons">
        <button class="btn btn-dark">Добавить пользователя</button>
        <button class="btn btn-dark">Удалить пользователя</button>
      </div>
    </div>

    <div class="col-right">
      <div class="card form-card">
        <h2>Данные пользователя</h2>
        <form class="edit-user-form">
          <div class="form-group">
            <label class="form-label">Фамилия</label>
            <input type="text" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Имя</label>
            <input type="text" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Отчество</label>
            <input type="text" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Телефон</label>
            <input type="tel" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Электронная почта</label>
            <input type="email" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Следующая запись</label>
            <input type="text" class="form-input" value="" />
          </div>

          <div class="status-row">
            <span class="status-label">Подтверждение записи:</span>
            <img
              src="${ASSET_PATH}/62_143.svg"
              alt="Not Confirmed"
              class="status-indicator"
            />
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-primary">
              Подтвердить вручную
            </button>
            <button type="submit" class="btn btn-secondary">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
        </main>
    )
}