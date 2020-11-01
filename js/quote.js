export const quote = () => {
  const blockquote = document.querySelector('blockquote');
  const figcaption = document.querySelector('figcaption');
  const btn = document.querySelector('.btn__quote');

  async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = `'\'${data.quoteText}'\'`;
    figcaption.textContent = data.quoteAuthor;
  }
  document.addEventListener('DOMContentLoaded', getQuote);
  btn.addEventListener('click', getQuote);
  btn.addEventListener('click', () => {
    btn.style.transform = `rotate(${(btn.d = (btn.d | 0) + 360)}deg)`;
  });
};
