// Кастомний віджет без React: Оскільки ви використовується Shadow DOM,
// треба підключити сторонню нативну бібліотеку для вибору дати, яка не прив'язана до React.
// Наприклад, npm install flatpickr

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"; // Імпорт локалізації

class CustomDatePicker extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Стилізація всередині Shadow DOM (опціонально)
    const style = document.createElement('style');
    style.textContent = `
      input {
        padding: 12px;
        font-size: 0.875rem;
        border: 2px solid #ccc;
        border-radius: 4px;
        class="p-3 h-11 text-sm rounded border border-gray-300 shadow"
        }      
    `;

    shadow.appendChild(style);

// Створення поля введення
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'MM/DD/YYYY'; // будь-який формат

    // підключити сторонню бібліотеку для вибору дати
    input.addEventListener('focus', () => {
    });

    shadow.appendChild(input);
    // Ініціалізація flatpickr після додавання елемента в DOM
    flatpickr (input, {
      dateFormat: 'm/d/Y', // Налаштування формату дати
      // locale: 'en',         // Можна змінити на інші локалі, наприклад, 'uk' для української
      locale: Ukrainian,
    });
  }
}

// Реєстрація кастомного елемента

customElements.define('custom-date-picker', CustomDatePicker);

// customElements.define - метод для реєстрації кастомного елемента.
// 'custom-date-picker' - перший аргумент - визначає ім'я кастомного компонента в HTML.
// CustomDatePicker - створенний клас кастомного компонента, що реєструємо.