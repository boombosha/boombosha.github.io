let themeButtonLight = document.querySelector('.theme-button-light');
let themeButtonDark = document.querySelector('.theme-button-dark');
let fontButtonSansSerif = document.querySelector('.font-button-sans-serif');
let fontButtonSerif = document.querySelector('.font-button-serif');

themeButtonDark.onclick = function () {
    document.body.classList.add('dark');
    themeButtonDark.classList.add('active');
    themeButtonLight.classList.remove('active');
  };

themeButtonLight.onclick = function () {
    document.body.classList.remove('dark');
    themeButtonLight.classList.add('active');
    themeButtonDark.classList.remove('active');
  };

fontButtonSansSerif.onclick = function () {
    document.body.classList.remove('serif');
    fontButtonSansSerif.classList.add('active');
    fontButtonSerif.classList.remove('active');
  };

fontButtonSerif.onclick = function () {
    document.body.classList.add('serif');
    fontButtonSansSerif.classList.remove('active');
    fontButtonSerif.classList.add('active');
}

let articleSections = document.querySelectorAll('.blog-article.short');

for (let articleSection of articleSections) {
  let moreButton = articleSection.querySelector('.more');
  moreButton.onclick = function () {
    articleSection.classList.remove('short');
  };
}

/* Элементы кнопок-переключателей раскладки */
let tileViewButton = document.querySelector('.card-view-button-grid');
let standardViewButton = document.querySelector('.card-view-button-list');

/* Элемент списка карточек */
let cardsList = document.querySelector('.cards');

tileViewButton.onclick = function () {
  cardsList.classList.remove('list');
  tileViewButton.classList.add('active');
  standardViewButton.classList.remove('active');
};

standardViewButton.onclick = function () {
  cardsList.classList.add('list');
  tileViewButton.classList.remove('active');
  standardViewButton.classList.add('active');
};

/* Галерея */
let mainImage = document.querySelector('.active-photo');
let previews = document.querySelectorAll('.preview-list li a');

for (let activeImage of previews) {
  activeImage.onclick = function (evt) {
  evt.preventDefault();
  mainImage.src = activeImage.href;

  let currentActive = document.querySelector('.preview-list li img');
  currentActive.classList.remove('active-photo');
  activeImage.classList.add('active-photo');
}
};