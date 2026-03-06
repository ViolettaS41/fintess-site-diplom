
export default function Booking(){
    return(
        <main>
            <div class="card form-card">
        <h2>Добавить тренировку</h2>
        <form class="edit-user-form">
          <div class="form-group">
            <label class="form-label">Время тренировки</label>
            <input type="date" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Направление</label>
            <input type="text" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Тренер</label>
            <input type="text" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Свободные места</label>
            <input type="number" class="form-input" value="" />
          </div>

          <div class="form-group">
            <label class="form-label">Стоимость</label>
            <input type="number" class="form-input" value="" />
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-primary">
              Запланировать тренировку
            </button>
          </div>
        </form>
      </div>
        </main>
    )
}