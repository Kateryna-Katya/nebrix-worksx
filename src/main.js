document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация иконок
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. Хедер: изменение фона при скролле
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
      } else {
          header.classList.remove('header--scrolled');
      }
  });

  // 3. Анимация HERO (SplitType + GSAP)
  const titleElement = document.querySelector('#hero-title');
  if (titleElement) {
      document.fonts.ready.then(() => {
          // Разбиваем на слова и символы.
          // Конструкция span.word предотвратит разрыв слов.
          const heroTitle = new SplitType('#hero-title', {
              types: 'words, chars',
              tagName: 'span'
          });

          gsap.set('#hero-title', { visibility: 'visible' });

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });

          tl.to('.hero__tagline', { y: 0, opacity: 1, duration: 0.8 })
            .from(heroTitle.chars, {
                opacity: 0,
                y: 30,
                rotateX: -45,
                stagger: 0.02,
                duration: 0.8,
            }, '-=0.4')
            .to('.hero__description', { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
            .to('.hero__actions', { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')
            .to('.hero__image-wrapper', { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');
      });
  }

  // 4. Мобильное меню (Исправлено)
  const burgerBtn = document.querySelector('.burger');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (burgerBtn) {
      burgerBtn.addEventListener('click', () => {
          burgerBtn.classList.toggle('active');
          document.body.classList.toggle('menu-open');
      });

      mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
              burgerBtn.classList.remove('active');
              document.body.classList.remove('menu-open');
          });
      });
  }

  // 5. Ховер-эффект для карточек (Glow)
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach(card => {
      card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--x', `${x}px`);
          card.style.setProperty('--y', `${y}px`);
      });
  });

  // 6. Контактная форма: Капча и валидация
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      const phoneInput = document.getElementById('phone-input');
      const captchaQuestion = document.getElementById('captcha-question');

      let num1 = Math.floor(Math.random() * 10) + 1;
      let num2 = Math.floor(Math.random() * 10) + 1;
      let correctAnswer = num1 + num2;
      if (captchaQuestion) captchaQuestion.textContent = `${num1} + ${num2} = ?`;

      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });

      contactForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const captchaAnswer = document.getElementById('captcha-answer').value;
          const formMessage = document.getElementById('form-message');
          const submitBtn = contactForm.querySelector('button');

          if (parseInt(captchaAnswer) !== correctAnswer) {
              formMessage.textContent = 'Ошибка в примере!';
              formMessage.className = 'form__message form__message--error';
              return;
          }

          submitBtn.disabled = true;
          formMessage.textContent = 'Отправка...';
          formMessage.className = 'form__message';

          // Имитация AJAX
          setTimeout(() => {
              formMessage.textContent = 'Успешно! Мы свяжемся с вами.';
              formMessage.className = 'form__message form__message--success';
              contactForm.reset();
              submitBtn.disabled = false;
          }, 1500);
      });
  }

  // 7. Cookie Popup
  const cookiePopup = document.getElementById('cookie-popup');
  if (cookiePopup && !localStorage.getItem('nebrix_cookies_accepted')) {
      setTimeout(() => cookiePopup.classList.add('show'), 2000);
      document.getElementById('cookie-accept').onclick = () => {
          localStorage.setItem('nebrix_cookies_accepted', 'true');
          cookiePopup.classList.remove('show');
      };
  }
});