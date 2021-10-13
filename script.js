'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');
console.log(document.getElementsByClassName('btn'));
const v = document.createElement('div');
v.classList.add('cookie-message');
v.innerHTML = 'hello .<button class="btn btn--close-cookie">Got it!</button>';
header.append(v);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (e) {
    v.parentElement.removeChild(v);
  });

// v.style.backgroundColor = 'Orangered';
// console.log(getComputedStyle(v).color);
// console.log(getComputedStyle(v).width);
// document.documentElement.style.setProperty('--color-primary', 'blue');
// const logo = document.querySelector('.nav__logo');
// console.log(logo);
// console.log(logo.alt);
// console.log(logo.design);
// logo.alt = 'Beautiful minimalist logo';
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('designer', 'Cozark');
// console.log(logo.scr);

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sec1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // cách 1
  const s1 = sec1.getBoundingClientRect();
  console.log('s1: ', s1.x, s1.y);
  console.log('window: ', window.pageXOffset, window.pageYOffset);
  window.scroll({
    left: s1.x + window.pageXOffset,
    top: s1.y + window.pageYOffset,
    behavior: 'smooth',
  });
  // cách 2 apply with browser support ?? 🤣
  //sec1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log('id: ', id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
