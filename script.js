//Global Variables
const hamburgerMenu = document.getElementById('hamburger-menu');
const dropdownMainMenu = document.querySelector('#nav ul');
const featuredContainer = document.getElementById('featured-container');
const featuredNavList = document.getElementsByClassName('featured-nav');
const dotArray = Array.from(featuredNavList);
const currentDate = new Date();
const dateDisplay = document.getElementById('date-container');
const contactButton = document.getElementById('contact-btn'); 
const contactModalContainer = document.getElementById('contact-modal-container');
const body = document.querySelector('body');
const faqBtn = document.querySelectorAll('.faq-question-container');  
const faqDropdown = document.querySelectorAll('.faq-dropdown-icon');  
const faqAnswer = document.querySelectorAll('.faq-answer');



//Hamburger Menu Dropdown
hamburgerMenu.addEventListener('click', () => {
    dropdownMainMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
});



//Automatic Carousel for Featured Section
const featuredImages = featuredContainer.querySelectorAll('.featured');

let featuredIndex = 0;

featuredImages[featuredIndex].classList.add('active');
dotArray[featuredIndex].classList.add('active');


//if mouse is not on the featured section, then continue the interval

function showNextImage() {
  featuredImages[featuredIndex].classList.remove('active');
  dotArray[featuredIndex].classList.remove('active');
  featuredIndex++;
  featuredIndex %= featuredImages.length;
  dotArray[featuredIndex].classList.add('active');
  featuredImages[featuredIndex].classList.add('active');
}

function getDotIndex(dot) {    
    return dotArray.indexOf(dot);
  }
  
  dotArray.forEach((dot) => {
    dot.addEventListener('click', () => {
        featuredImages[featuredIndex].classList.remove('active');
        dotArray[featuredIndex].classList.remove('active');

        
      const clickedIndex = getDotIndex(dot);
      featuredIndex = clickedIndex;
      featuredImages[featuredIndex].classList.add('active');
      dotArray[featuredIndex].classList.add('active');
    });
  });

let featuredInterval = setInterval(showNextImage, 3000);

featuredContainer.addEventListener('mouseenter', () => {
    clearInterval(featuredInterval);
});

featuredContainer.addEventListener('mouseleave', () => {
    featuredInterval = setInterval(showNextImage, 3000);
});



//Current Date
function formatDate(date) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${dayOfWeek}, ${month} ${day}, ${year}`;
}

const formattedDate = formatDate(currentDate);

dateDisplay.textContent = formattedDate;



//Contact Modal
contactButton.addEventListener('click', () => {
  contactModalContainer.classList.toggle('active');
  body.classList.toggle('modal-active');
});



//Header Sticky
const header = document.getElementById('header');
const upperContainer = document.getElementById('upper-container');
const hamburgerBar = Array.from(document.querySelectorAll('#hamburger-menu .bar'));
const logo = document.getElementById('logo');
const magnifier = document.getElementById('magnifier');

window.addEventListener('scroll', () => {
  upperContainer.classList.toggle('sticky', window.scrollY > 0);
  logo.classList.toggle('sticky', window.scrollY > 0);
  magnifier.classList.toggle('sticky', window.scrollY > 0);
  
  hamburgerBar.forEach((bar) => {
    bar.classList.toggle('sticky', window.scrollY > 0);
  });
});



//FAQ Dropdown
function getFaqNum(btn) {
  return Array.from(faqBtn).indexOf(btn);
}

faqBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const clickedQuestion = getFaqNum(btn);

    faqAnswer[clickedQuestion].classList.toggle('active');
    faqDropdown[clickedQuestion].classList.toggle('active');

    const showAnswerBtn = faqDropdown[clickedQuestion].innerHTML;
  
    if (showAnswerBtn == '+') {
      faqDropdown[clickedQuestion].innerHTML = '-';
    } else {
      faqDropdown[clickedQuestion].innerHTML = '+';
    }
  });
});



//Countdown Timer
const timerCard = document.getElementById('timer-card');

function countdown() {
  const currentCountdownDate = new Date().getTime();
  const endDate = new Date('August 15, 2024').getTime();
  const countdownTime = endDate - currentCountdownDate;

  const days = Math.floor(countdownTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countdownTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((countdownTime / (1000 * 60)) % 60);
  const seconds = Math.floor((countdownTime / 1000) % 60);

  timerCard.innerText = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

  if (countdownTime == 0) {
    alert('Happy Ajonay!');
    timerCard.innerHTML = 'Happy Ajonay!';
    clearInterval(countdownInterval);
  } else if (countdownTime < 0) {
    timerCard.innerHTML = 'EXPIRED';
    clearInterval(countdownInterval);
  }
}

let countdownInterval = setInterval(countdown, 1000);