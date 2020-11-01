export const randomBg = () => {
  const now = new Date();
  let hours = now.getHours() + 1;

  function getImgDay(period) {
    const images = [
      '01.jpg',
      '02.jpg',
      '03.jpg',
      '05.jpg',
      '06.jpg',
      '07.jpg',
      '08.jpg',
      '09.jpg',
      '10.jpg',
      '11.jpg',
      '12.jpg',
      '13.jpg',
      '14.jpg',
      '15.jpg',
      '16.jpg',
      '17.jpg',
      '18.jpg',
      '19.jpg',
      '20.jpg',
    ];
    for (let i = 0; i < 6; i++) {
      let periodImg =
        period +
        images.splice(Math.floor(Math.random() * images.length), 1).join();
      imgDay.push(periodImg);
    }
  }

  const imgDay = [];
  for (let i = 0; i < 4; i++) {
    if (i == 0) {
      getImgDay('./img/bg/night/');
    } else if (i == 1) {
      getImgDay('./img/bg/morning/');
    } else if (i == 2) {
      getImgDay('./img/bg/day/');
    } else if (i == 3) {
      getImgDay('./img/bg/evening/');
    }
  }

  function getImage() {
    btn.style.transform = `rotate(${(btn.d = (btn.d | 0) - 360)}deg)`;
    const index = hours % imgDay.length;
    const imageSrc = `${imgDay[index]}`;
    viewBgImage(imageSrc);
    hours++;
    btn.disabled = true;
    setTimeout(function () {
      btn.disabled = false;
    }, 1000);
  }

  function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      body.style.backgroundImage = `url(${src})`;
    };
  }

  const btn = document.querySelector('.btn');
  btn.addEventListener('click', getImage);

  return imgDay;
};
