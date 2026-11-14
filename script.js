document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const themePreference = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('arismendy-portfolio-theme');

  function applyTheme(theme) {
    const darkMode = theme === 'dark';

    body.classList.toggle('dark', darkMode);
    themeIcon.className = darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    themeToggle.setAttribute(
      'aria-label',
      darkMode ? 'Activar modo claro' : 'Activar modo oscuro'
    );
    themeToggle.setAttribute(
      'title',
      darkMode ? 'Activar modo claro' : 'Activar modo oscuro'
    );
  }

  // Usa la preferencia guardada; si no existe, consulta el tema del dispositivo.
  applyTheme(savedTheme || (themePreference.matches ? 'dark' : 'light'));

  themeToggle.addEventListener('click', () => {
    const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('arismendy-portfolio-theme', nextTheme);
  });

  // Si el usuario nunca ha elegido un tema, sigue los cambios del dispositivo.
  themePreference.addEventListener('change', (event) => {
    if (!localStorage.getItem('arismendy-portfolio-theme')) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });

  // Cierra el menú móvil después de seleccionar una sección.
  document.querySelectorAll('#menu .nav-link, .navbar-brand[href="#inicio"]').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('menu');
      if (menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Formulario de demostración: no envía datos a un servidor.
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formMessage.textContent =
      '¡Gracias por contactarme! Tu mensaje ha sido recibido. (Demostración: no se envió un correo real).';
    contactForm.reset();
  });

  // Año automático en el pie de página.
  document.getElementById('year').textContent = new Date().getFullYear();
});
