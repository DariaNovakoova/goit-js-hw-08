// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми.
// Нехай ключем для сховища буде рядок "feedback-form-state".

// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
// В іншому випадку поля повинні бути порожніми.

// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.

// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
  textarea: document.querySelector('textarea'),
  email: document.querySelector('[name="email"]'),
};

let obj = {};

refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onTextareaInput() {
  obj = {
    email: refs.email.value,
    message: refs.textarea.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(obj));
}

function checkForm() {
  const valInput = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (valInput) {
    refs.email.value = valInput.email || '';
    refs.textarea.value = valInput.message || '';
  }
}
checkForm();

function onFormSubmit(e) {
  e.preventDefault();
  if (refs.email.value && refs.textarea.value) {
    console.log(localStorage.getItem('feedback-form-state'));
    e.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    obj = {};
  } else {
    alert('Please fill out all forms field');
  }
}
