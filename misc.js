// Меню еды

function openMenu(evt, menuItem) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    evt.preventDefault();

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("current", "");
    }
    document.getElementById(menuItem).style.display = "block";
    evt.currentTarget.className += " current";
}


// Переключение фонов

let arrowLeft = document.querySelector('.arrow-left');
let arrowRight = document.querySelector('.arrow-right');
let aboutUs = document.querySelector('.about-us');


arrowLeft.onclick = function() {
  changeBackground();
}

arrowRight.onclick = function() {
  changeBackground();
}

let backgrounds = [
  "url('pic/about/1.jpg')",
  "url('pic/about/2.jpg')",
  "url('pic/about/3.jpg')",
  "url('pic/about/4.jpg')"
];

let currentBackground = 0; // Текущий индекс фоновой картинки

function changeBackground() {
  
  aboutUs.style.transition = "background 0.5s ease-in-out";
  aboutUs.style.background = backgrounds[currentBackground];
  currentBackground = (currentBackground + 1) % backgrounds.length;
}

setInterval(changeBackground, 15000);


// Отлепляем меню до скролла

function toggleSticky() {
  let element = document.querySelector(".menu-main");
  let target = document.getElementById("About");
  let targetTop = target.offsetTop;

  if (window.scrollY >= targetTop) {
    element.style.position = "";
  } else {
    element.style.position = "sticky";
  }
}

window.addEventListener("scroll", toggleSticky);



// Плавный скролл по стрелочке
let arrow = document.querySelector(".arrow");
let target = document.getElementById("food-container-id");
let targetTop = target.offsetTop;

arrow.onclick = function () {
  window.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });
};

// Анимация прогрузки сообщений
let spinButton = document.querySelector('.load-more');
let loadArrows = document.querySelector('.load-arrows');

loadArrows.onclick = function () {
  if (!spinButton.classList.contains('spin-animation'))
    spinButton.classList.add('spin-animation');

  if (spinButton.style.animationName == 'spin')
    spinButton.style.animationName = 'spin1';
  else
    spinButton.style.animationName = 'spin';

  
  
  // spinButton.classList.toggle('spin-animation');
  /*
  let count = Number(spinButton.style.animationIterationCount);

  console.log(Number(spinButton.style.animationIterationCount));
  console.log(spinButton.style.animationIterationCount);
  
  console.log(spinButton.style.animationIterationCount);
  spinButton.style.animationIterationCount = 0;
  spinButton.style.animationIterationCount = 1;
  //spinButton.style.animationIterationCount = String(count + 2);
  spinButton.style.animationPlayState = 'paused';
  console.log(spinButton.style.animationIterationCount);
  spinButton.style.animationPlayState = 'running';
  */

  // spinButton.classList.remove('spin-animation');
  // spinButton.classList.remove('spin-animation-long');
  // spinButton.classList.add('spin-animation');
  // spinButton.classList.add('spin-animation-long');

    // if (spinButton.classList.contains('spin-animation')) {
    //   spinButton.classList.remove('spin-animation');
    //   spinButton.classList.add('spin-animation-long');
    // } else {
    //   spinButton.classList.remove('spin-animation-long');
    //   spinButton.classList.add('spin-animation');
      
    //  }

}

let x1=0, y1=0;
window.client
const 
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  dist_to_draw = 50,
  delay = 1000,
  fsize = [
    '1.1rem', '1.4rem', '.8rem', '1.7rem'
  ],
  colors = [
  '#E23636',
  '#F9F3EE',
  '#E1F8DC',
  '#B8AFE6',
  '#AEE1CD',
  '#5EB0E5'
],
  rand = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min,
  selRand = (o) => o[rand(0, o.length -1)],
  distanceTo =  (x1, y1, x2, y2) => 
    Math.sqrt((Math.pow(x2-x1,2))+(Math.pow(y2-y1,2))),
  shouldDraw = (x, y) => 
    (distanceTo(x1, y1, x, y) >= dist_to_draw),
  addStr = (x, y) => {
    const str = document.createElement("div");
    str.innerHTML = '&#10022;';
    str.className = 'star';
    str.style.top = `${y + rand(-20,20)}px`;
    str.style.left = `${x}px`;
    str.style.color = selRand(colors);
    str.style.fontSize = selRand(fsize);
    document.body.appendChild(str);
    //console.log(rand(0, 3));
    const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);
    //console.log(vh, y, fs);
    //console.log((y+fs)>vh?vh-y:fs);
    str.animate({
      translate: `0 ${(y+fs)>vh?vh-y:fs}px`,
      opacity: 0,
      transform: `rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`
    }, {
      duration: delay,
      fill: 'forwards',

    });
    //could add a animation terminate listener, but why add the additional load
    setTimeout(() => {
        str.remove();
      }, delay);
  }

addEventListener("mousemove", (e) => {
  const {clientX, clientY} = e;
  if(shouldDraw(clientX, clientY)){
    addStr(clientX, clientY);
    x1 = clientX;
    y1 = clientY;
  }
});