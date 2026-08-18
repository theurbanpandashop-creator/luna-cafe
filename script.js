/**
 * LUNA CAFÉ - Lógica de Interacción JavaScript
 * Funcionalidades: Menú móvil, navegación fluida, modal de carta completa,
 * validación de formulario y notificaciones.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elementos del DOM
  const header = document.getElementById('header');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentYearSpan = document.getElementById('currentYear');
  
  // Elementos del Modal de Menú
  const openFullMenuBtn = document.getElementById('openFullMenuBtn');
  const menuModal = document.getElementById('menuModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalMenuList = document.getElementById('modalMenuList');
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');

  // Elementos de Formulario y Toast
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const submitBtn = document.getElementById('submitBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Actualizar año en el footer automáticamente
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Control de Header al hacer Scroll
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Chequeo inicial

  // --------------------------------------------------------------------------
  // 3. Menú Móvil (Hamburguesa)
  // --------------------------------------------------------------------------
  const toggleMobileNav = () => {
    const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNavToggle.classList.toggle('open');
    primaryNav.classList.toggle('open');
    document.body.style.overflow = isExpanded ? '' : 'hidden'; // Bloquea scroll en móvil si está abierto
  };

  const closeMobileNav = () => {
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    mobileNavToggle.classList.remove('open');
    primaryNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileNavToggle.addEventListener('click', toggleMobileNav);

  // Cerrar menú al pulsar sobre cualquier enlace de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // --------------------------------------------------------------------------
  // 4. Resaltado de sección activa en la barra de navegación (Scrollspy)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (targetNavLink) targetNavLink.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 5. Datos y Lógica del Modal de Carta Completa
  // --------------------------------------------------------------------------
  const menuData = {
    cafes: [
      { name: 'Espresso Doble (Origen Etiopía)', desc: 'Notas florales, bergamota y final sedoso', price: '2,20 €' },
      { name: 'Flat White Artesanal', desc: 'Doble shot con microespuma de leche fresca', price: '3,20 €' },
      { name: 'Cappuccino Tradicional', desc: 'Espresso con espuma densa y cacao puro espolvoreado', price: '2,90 €' },
      { name: 'Nitro Cold Brew Cítrico', desc: 'Macerado en frío 18h con nitrógeno y naranja', price: '3,90 €' },
      { name: 'Matcha Latte Ceremonial', desc: 'Grado ceremonial de Uji con leche de avena', price: '3,80 €' },
      { name: 'Chai Latte Especiado', desc: 'Té negro con cardamomo, canela y jengibre fresco', price: '3,60 €' }
    ],
    reposteria: [
      { name: 'Croissant Francés de Mantequilla', desc: 'Hojaldre clásico con mantequilla de Normandía', price: '2,80 €' },
      { name: 'Pain au Chocolat con Valrhona', desc: 'Relleno de dos barras de chocolate 70%', price: '3,10 €' },
      { name: 'Roll de Canela Glaseado', desc: 'Masa brioche esponjosa con canela de Ceilán', price: '3,40 €' },
      { name: 'Cookie con Sal Marina y Nueces', desc: 'Horneada al momento con corazón meloso', price: '2,60 €' },
      { name: 'Tarta de Queso Vasca Fluida', desc: 'Nuestra receta estrella horneada a alta temperatura', price: '4,50 €' }
    ],
    salado: [
      { name: 'Tostada de Aguacate y Huevo Poché', desc: 'Pan de masa madre con dukkah casera y aceite AOVE', price: '6,20 €' },
      { name: 'Sandwich Focaccia de Mortadela y Burrata', desc: 'Focaccia de romero, pesto de pistacho y rúcula', price: '7,50 €' },
      { name: 'Tostada de Tomate Confitado y Jamón Ibérico', desc: 'Tomate rallado fresco con jamón 100% bellota', price: '5,80 €' },
      { name: 'Bowl de Açaí y Frutas de Temporada', desc: 'Con granola casera tostada con miel y coco rallado', price: '6,90 €' }
    ]
  };

  const renderMenuItems = (category) => {
    const items = menuData[category] || [];
    modalMenuList.innerHTML = items.map(item => `
      <div class="modal-menu-item">
        <div class="menu-item-info">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
        </div>
        <span class="menu-item-price">${item.price}</span>
      </div>
    `).join('');
  };

  const openMenuModal = () => {
    menuModal.hidden = false;
    renderMenuItems('cafes');
    document.body.style.overflow = 'hidden';
  };

  const closeMenuModal = () => {
    menuModal.hidden = true;
    document.body.style.overflow = '';
  };

  if (openFullMenuBtn) {
    openFullMenuBtn.addEventListener('click', openMenuModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeMenuModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeMenuModal);
  }

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuModal.hidden) {
      closeMenuModal();
    }
  });

  // Cambiar pestañas del menú
  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderMenuItems(category);
    });
  });

  // --------------------------------------------------------------------------
  // 6. Botones "Pedir en barra" (Interactividad y Toasts)
  // --------------------------------------------------------------------------
  const productButtons = document.querySelectorAll('.product-btn');

  const showToast = (message) => {
    toastMessage.textContent = message;
    toastNotification.hidden = false;

    setTimeout(() => {
      toastNotification.hidden = true;
    }, 3500);
  };

  productButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product');
      const price = button.getAttribute('data-price');
      showToast(`¡Añadido! ${productName} (${price}) te espera en barra.`);
    });
  });

  // --------------------------------------------------------------------------
  // 7. Validación y Envío del Formulario de Contacto
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      let isValid = true;

      // Validación de Nombre
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        nameError.classList.remove('visible');
      }

      // Validación de Email (expresión regular estándar)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
        emailError.classList.remove('visible');
      }

      // Validación de Mensaje
      if (!messageInput.value.trim()) {
        messageInput.classList.add('invalid');
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
        messageError.classList.remove('visible');
      }

      if (!isValid) return;

      // Simulación de envío con estado de carga
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      submitBtn.disabled = true;
      btnText.textContent = 'Enviando...';
      btnSpinner.hidden = false;

      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar mensaje';
        btnSpinner.hidden = true;

        // Mostrar confirmación
        formSuccessAlert.hidden = false;
        contactForm.reset();

        // Mostrar Toast adicional
        showToast('✅ ¡Mensaje recibido! Nos pondremos en contacto pronto.');

        // Ocultar mensaje después de 7 segundos
        setTimeout(() => {
          formSuccessAlert.hidden = true;
        }, 7000);
      }, 1000);
    });

    // Limpiar errores mientras el usuario escribe
    ['name', 'email', 'message'].forEach(fieldId => {
      const input = document.getElementById(fieldId);
      const errorSpan = document.getElementById(`${fieldId}Error`);
      if (input && errorSpan) {
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          errorSpan.classList.remove('visible');
        });
      }
    });
  }
});
