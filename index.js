// слушаю событие когда DOM готов -> чтобы элементы точно были в дереве
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle'); // получаю кнопку по id
  if (!btn) { console.error('theme-toggle not found'); return; } // если кнопки нет — лог и выход

  const setIcon = () => { // функция ставит правильную иконку на кнопке
    btn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️'; // если светлая тема — луна, иначе солнце
  };

  const saved = localStorage.getItem('site-theme'); // читаю сохранённую тему из localStorage
  if (saved === 'light') document.body.classList.add('light'); // если в хранилище было 'light' — включаю класс

  setIcon(); // обновляю иконку при загрузке страницы

  btn.addEventListener('click', () => { // по клику переключаю тему
    document.body.classList.toggle('light'); // переключаю класс 'light' на body
    localStorage.setItem('site-theme', document.body.classList.contains('light') ? 'light' : 'dark'); // сохраняю выбор
    setIcon(); // обновляю иконку после переключения
  });
});
