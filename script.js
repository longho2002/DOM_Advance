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
// console.log(document.getElementsByClassName('btn'));
// const v = document.createElement('div');
// v.classList.add('cookie-message');
// v.innerHTML = 'hello .<button class="btn btn--close-cookie">Got it!</button>';
// header.append(v);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function (e) {
//     v.parentElement.removeChild(v);
//   });

// v.style.backgroundColor = 'Orangered';
// console.log(getComputedStyle(v).color);
// console.log(getComputedStyle(v).width);
// document.documentElement.style.setProperty('--color-primary', 'blue');
const logo = document.querySelector('.nav__logo');
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
    // khong co dau cham
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const h1 = document.querySelector('h1');
console.log(h1.parentElement.children);
//h1.closest('h1').style.background = 'red';
console.log(h1.parentElement);
console.log(h1.children);
//h1.closest('.header').style.background = 'cyan';
console.log(h1.childNodes);
console.log(h1.children);

const tab_con = document.querySelector('.operations__tab-container');
const tab_op = document.querySelectorAll('.operations__tab');
const tab_content = document.querySelectorAll('.operations__content');
tab_con.addEventListener('click', function (e) {
  const val = e.target.closest('.operations__tab');
  if (!val) return;
  tab_op.forEach(e => e.classList.remove('operations__tab--active'));
  tab_content.forEach(e => e.classList.remove('operations__content--active'));

  val.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${val.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');

const changeProps = function (e) {
  const val = e.target;
  if (val.classList.contains('nav__link')) {
    const nav_link = val.closest('.nav').querySelectorAll('.nav__link');
    const logo = val.closest('.nav').querySelector('img');
    nav_link.forEach(e => {
      if (e !== val) e.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', changeProps.bind(0.5));

nav.addEventListener('mouseout', changeProps.bind(1));

let beforeY = window.screenY;
window.addEventListener('scroll', function (e) {
  if (window.scrollY < beforeY) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
  beforeY = window.scrollY;
});

const sectionAll = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sectionAll.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserve = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.15,
  rootMargin: '-200px',
});

imgTarget.forEach(e => imgObserve.observe(e));
const makeSlide = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  const maxSlide = slides.length - 1;
  let currentSlide = 0;

  const createDot = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activeDot = function (index) {
    dotContainer.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${index}"]`)
      .classList.add('dots__dot--active');
  };
  const init = function () {
    createDot();
    activeDot(0);
  };
  init();

  const gotoSlide = function (slideNum) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - slideNum)}%)`)
    );
  };
  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else currentSlide++;
    gotoSlide(currentSlide);
  };
  const preSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else currentSlide--;
    gotoSlide(currentSlide);
  };
  gotoSlide(0);
  btnLeft.addEventListener('click', function () {
    preSlide();
    activeDot(currentSlide);
  });

  btnRight.addEventListener('click', function () {
    nextSlide();
    activeDot(currentSlide);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') preSlide();
    activeDot(currentSlide);
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      currentSlide = e.target.dataset.slide;

      gotoSlide(currentSlide);
      activeDot(currentSlide);
    }
  });
};
makeSlide();
