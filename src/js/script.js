// import diferents modules:
import {isWebp, Modal, burger , Tabs, Accordion, mobileCheck,
  isMobile, isTablet, isDesktop, getHeaderHeight,
  createPopper, right, scrollingAnim, consoleText} from "./imports.js";
import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
import {fade, unfade} from "./libraries/fade-unfade.js";
import LazyLoad from "vanilla-lazyload";
import "focus-visible";
import { validateForms } from './libraries/validate-form.js';
// import "simplebar";
// import * as myfun from "./modules/functions.js"

window.addEventListener('DOMContentLoaded', function () {
  // check webp
  isWebp();
  // connect lazy load
  new LazyLoad({
    elements_selector: '.lazy' ,
  });
  // start modal window
  const modal = new Modal({});
  // my js code
    // dark, light themes
    const themeBtn = document.querySelector('.theme');
    const theme = document.documentElement;
    themeBtn.addEventListener('click', () => {
         themeBtn.classList.toggle('theme-btn--active')
      if(themeBtn.classList.contains('theme-btn--active')) {
        theme.style.setProperty('--light-theme', '#000000');
        theme.style.setProperty('--dark-theme', '#ffffff');
        theme.style.setProperty('--footer-light', '#222222');
        theme.style.setProperty('--footer-dark', '#EFF1F4');
        theme.style.setProperty('--form-light', '#333333');
        theme.style.setProperty('--form-dark', '#606060');
        theme.style.setProperty('--modal', '#ffffff');
        if(window.matchMedia("(min-width: 600px)").matches) {
          document.querySelector('.hero__hawk').style.backgroundImage = "url('./img/hero-light.jpg')"
          document.querySelector('.webp .hero__hawk').style.backgroundImage = "url('./img/hero-light.webp')"
        } else {
          document.querySelector('.hero__hawk').style.backgroundImage = "url('./img/hero-lightMobile.jpg')"
          document.querySelector('.webp .hero__hawk').style.backgroundImage = "url('./img/hero-lightMobile.webp')"
        }
        document.querySelector('.hero__pixels').style.transform = 'none'
        document.querySelector('.dark').style.display = 'none'
        document.querySelector('.light').style.display = 'block'
        document.querySelectorAll('.hero__box').forEach((el) => {
          el.style.backgroundColor = "rgba(255,255,255,0.9)"
        });
      } else {
        theme.style.setProperty('--light-theme', '#ffffff');
        theme.style.setProperty('--dark-theme', '#000000');
        theme.style.setProperty('--footer-light', '#EFF1F4');
        theme.style.setProperty('--footer-dark', '#222222');
        theme.style.setProperty('--form-light', '#606060');
        theme.style.setProperty('--form-dark', '#333333');
        theme.style.setProperty('--modal', '#222222');
        document.querySelector('.hero__pixels').style.transform = 'scale(-1) translateY(-2px)'
        if(window.matchMedia("(min-width: 600px)").matches) {
          document.querySelector('.hero__hawk').style.backgroundImage = "url('./img/hero.jpg')"
          document.querySelector('.webp .hero__hawk').style.backgroundImage = "url('./img/hero.webp')"
        } else {
          document.querySelector('.hero__hawk').style.backgroundImage = "url('./img/heroMobile.jpg')"
          document.querySelector('.webp .hero__hawk').style.backgroundImage = "url('./img/heroMobile.webp')"
        }
        document.querySelector('.dark').style.display = 'block'
        document.querySelector('.light').style.display = 'none'
        document.querySelectorAll('.hero__box').forEach((el) => {
          el.style.backgroundColor = "rgba(0,0,0,0.8)"
        });
      }
    });
    // nav__link--active
    const navLink = document.querySelectorAll('.nav__link')
    navLink.forEach((el) => {
      el.addEventListener('click', () => {
        navLink.forEach((e) =>{e.classList.remove('nav__link--active')})
        el.classList.add('nav__link--active')
      });
    });

    // coloring subtitles function
    const coloring = () => {
      const text = document.querySelectorAll('.color-title');
      text.forEach((el) =>{
        el.innerHTML = el.textContent.replace(/\s+/, " <span style='color: #DC143C;'>").concat("</span>")
      });
    }
    coloring();

    // gallery slider
    new Swiper('.gallery__swiper', {
      // Optional parameters
      direction: 'horizontal',
      effect: 'fade',
      loop:true,
      autoplay: {
        delay: 5000,
      },
      speed:700,
      slidesPerView: 1,
      slidesPerGroup:1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // gallery add more pages
    const more = document?.querySelector('[data-more]');
    const morePages = document?.querySelector('.filter');
    more?.addEventListener('click', () =>{
      more.style.display = 'none';
      fade(morePages,300);
    });

    // gallery adding info to modal
    const modalBtn = document.querySelectorAll('.modal-btn');
    const modalTitle = document.querySelector('.modal__title');
    const modalText = document.querySelector('.modal__text');
    const modalImg = document.querySelector('.modal__picture');

    modalBtn.forEach((el) => {
      el.addEventListener('click', () => {
        modalTitle.innerHTML = el.dataset.description;
        modalText.innerHTML = el.querySelector('span').textContent;
        modalImg.querySelector('source').srcset = `${el.querySelector('picture source').srcset}`;
        modalImg.querySelector('img').src = `${el.querySelector('picture img').src}`;
        modalImg.querySelector('img').alt = `${el.querySelector('picture img').alt}`;
        // add color to title
        coloring();
      });
    });


    // gallery active btns in filter..
    const filterBtn = document.querySelectorAll('.filter__btn');
    filterBtn.forEach((el) => {
      el.addEventListener('click', () => {
        filterBtn.forEach((e) =>{e.classList.remove('filter__btn--active')});
        el.classList.add('filter__btn--active');
      });
    });


    // form validation
      const rules = [{
          ruleSelector: '#name',
          rules: [{
              rule: 'minLength',
              value: 3,
              errorMessage: 'Min 3 letters'
            },{
              rule: 'maxLength',
              value: 20,
              errorMessage: 'Max 20 letters'
            },{
              rule: 'required',
              value: true,
              errorMessage: '*Name is Required'
            }]},{
          ruleSelector: '#email',
          rules: [{
              rule: 'required',
              value: true,
              errorMessage: '*Email is Required'
            },{
              rule: 'email',
              errorMessage: 'Email is invalid!',
            }]},{
          ruleSelector: '#message',
          rules: [{
              rule: 'required',
              value: true,
              errorMessage: '*Message is Required'
            },{
              rule: 'minLength',
              value: 15,
              errorMessage: 'Min 15 letters'
            },{
              rule: 'maxLength',
              value: 500,
              errorMessage: 'Max 500 letters'
            },]},];

      const afterForm = () => {
        console.log('Произошла отправка, тут можно писать любые действия');
      };
      if(document.querySelector('form')) validateForms('#form', rules, afterForm);

      // adding burger menu and fixed header with scroll
      const header = document.querySelector('.header');
      let lastScroll = 0;
      const headerFixed = () => {
        let scrollTop = window.scrollY;
        if(scrollTop > lastScroll && scrollTop > header.offsetHeight) {
          header.style.transform = 'translateY(-100%)';
        } else if(scrollTop > lastScroll || scrollTop === 0) {
          header.classList.remove('is-fixed');
          document.body.style.marginTop = '0px';
        } else{
          header.style.transform = 'none';
          header.classList.add('is-fixed');
          document.body.style.marginTop = `${header.offsetHeight}px`;
        }

        lastScroll = scrollTop;
      }

      window.addEventListener('scroll', () => {headerFixed();});
      burger();
});
