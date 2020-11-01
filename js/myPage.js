import { randomBg } from './randomBg.js';
export function myPage() {
  const time = document.getElementById('time');
  const greeting = document.getElementById('greeting');
  const name = document.getElementById('name');
  const focus = document.getElementById('focus');
  function showData() {
    let today = new Date();
    let day = today.getDate();

    const days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];

    const months = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ];

    let currentDay = days[today.getDay()];
    let currentMonth = months[today.getMonth()];

    date.innerHTML = `${currentDay}, ${day} ${currentMonth}`;
  }

  function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    time.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)}`;

    if (min === 0) {
      addBgGreet();
    }
    setTimeout(showTime, 1000);
  }

  function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

  const imgArr = randomBg();

  function getImgForHour() {
    const now = new Date();
    let hours = now.getHours();
    for (let i = 0; i < imgArr.length; i++) {
      return imgArr[hours];
    }
  }

  function addBgGreet() {
    let today = new Date();
    let hour = today.getHours();
    let img = `url(${getImgForHour()})`;

    if (hour < 6) {
      document.body.style.backgroundImage = img;
      greeting.textContent = 'Доброй ночи,';
    } else if (hour > 5 && hour < 12) {
      document.body.style.backgroundImage = img;
      greeting.textContent = 'Доброе утро,';
    } else if (hour > 11 && hour < 18) {
      document.body.style.backgroundImage = img;
      greeting.textContent = 'Добрый день,';
    } else if (hour >= 17 && hour < 24) {
      document.body.style.backgroundImage = img;
      greeting.textContent = 'Добрый вечер,';
    }
  }

  function getName() {
    if (
      localStorage.getItem('name') === null ||
      localStorage.getItem('name') === ''
    ) {
      name.textContent = '[Введите имя]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  }

  function getFocus() {
    if (localStorage.getItem('focus') === null) {
      focus.textContent = '[Введите цель]';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  }

  name.addEventListener('click', () => (name.textContent = null));
  name.addEventListener('blur', (event) => {
    if (name.textContent === '') {
      if (localStorage.getItem('name')) {
        name.textContent = localStorage.getItem('name');
      } else {
        name.textContent = '[Введите имя]';
      }
    } else {
      localStorage.setItem('name', event.target.innerText);
    }
  });

  name.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (name.textContent) {
        localStorage.setItem('name', event.target.innerText);
        name.blur();
      } else if (localStorage.getItem('name')) {
        name.textContent = localStorage.getItem('name');
        name.blur();
      } else {
        name.textContent = '[Введите имя]';
        name.blur();
      }
    }
  });

  focus.addEventListener('click', () => (focus.textContent = null));
  focus.addEventListener('blur', () => {
    focus.addEventListener('blur', (event) => {
      if (focus.textContent === '') {
        if (localStorage.getItem('focus')) {
          focus.textContent = localStorage.getItem('focus');
        } else {
          focus.textContent = '[Введите цель]';
        }
      } else {
        localStorage.setItem('focus', event.target.innerText);
      }
    });
  });

  focus.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (focus.textContent) {
        localStorage.setItem('focus', event.target.innerText);
        focus.blur();
      } else if (localStorage.getItem('focus')) {
        focus.textContent = localStorage.getItem('focus');
        focus.blur();
      } else {
        focus.textContent = '[Введите цель]';
        focus.blur();
      }
    }
  });

  showData();
  showTime();
  addBgGreet();
  getName();
  getFocus();
}
