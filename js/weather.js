export function weather() {
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const weatherDescription = document.querySelector('.weather-description');
  const city = document.querySelector('.city');
  const weatherTitle = document.querySelectorAll('.weather__title');
  // console.log(weatherTitle.forEach((item) => item));

  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherTitle[1].firstChild.textContent = 'Ветер';
    weatherTitle[2].firstChild.textContent = 'Влажность';
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    wind.textContent = `${data.wind.speed.toFixed(0)}м/с`;
    humidity.textContent = `${data.main.humidity.toFixed(0)}%`;
  }

  document.addEventListener('DOMContentLoaded', getWeather);

  function getCity() {
    if (localStorage.getItem('city') === null) {
      city.textContent = '[Введите]';
    } else {
      city.textContent = localStorage.getItem('city');
      getWeather();
    }
  }

  city.addEventListener('click', () => (city.textContent = null));
  city.addEventListener('blur', (event) => {
    if (city.textContent === '') {
      if (localStorage.getItem('city')) {
        city.textContent = localStorage.getItem('city');
        getWeather();
      } else {
        city.textContent = '[Введите]';
      }
    } else {
      localStorage.setItem('city', event.target.innerText);
      getWeather();
    }
  });

  city.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (city.textContent) {
        localStorage.setItem('city', event.target.innerText);
        getWeather();
        city.blur();
      } else if (localStorage.getItem('city')) {
        city.textContent = localStorage.getItem('city');
        getWeather();
        city.blur();
      } else {
        city.textContent = '[Введите]';
        city.blur();
      }
    }
  });

  getCity();
}
