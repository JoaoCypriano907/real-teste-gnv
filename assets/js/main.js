/**
 * REAL TESTE GNV - Scripts Interativos
 * Localização: Rua Murundu, 382 - Padre Miguel, RJ
 * Telefone: (21) 3336-6624
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações gerais da empresa
  const COMPANY_PHONE = '552133366624'; // Número para links de WhatsApp
  const COMPANY_DISPLAY_PHONE = '(21) 3336-6624';

  // 1. NAVBAR SCROLL EFFECT
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. MENU MOBILE RESPONSIVO COM BACKDROP
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backdrop = document.querySelector('.menu-backdrop');

  const setMenuState = (isOpen) => {
    if (!navMenu) return;
    navMenu.classList.toggle('active', isOpen);
    if (backdrop) backdrop.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    if (mobileToggle) {
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    }
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = !navMenu.classList.contains('active');
      setMenuState(isOpen);
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        setMenuState(false);
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        setMenuState(false);
      }
    });
  }

  // 3. HIGHLIGHT DO MENU AO ROLAR A PÁGINA
  const sections = document.querySelectorAll('section[id]');
  const highlightNavLink = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // 4. CALCULADORA DE VALIDADE DO RETESTE GNV
  const calcForm = document.getElementById('calc-form');
  const calcResultBox = document.getElementById('calc-result');

  if (calcForm && calcResultBox) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const lastYearInput = document.getElementById('calc-year');
      const capacitySelect = document.getElementById('calc-capacity');
      const lastYear = parseInt(lastYearInput.value, 10);
      const capacity = capacitySelect.value;
      const currentYear = new Date().getFullYear();

      if (isNaN(lastYear) || lastYear < 1990 || lastYear > currentYear) {
        alert('Por favor, informe um ano válido gravado no cilindro.');
        return;
      }

      // O reteste é obrigatório a cada 5 anos conforme norma Inmetro
      const expirationYear = lastYear + 5;
      const isExpired = currentYear >= expirationYear;
      const isDueSoon = expirationYear === currentYear || expirationYear === currentYear + 1;

      let statusHtml = '';
      let msg = '';

      if (isExpired) {
        msg = `Atenção: O reteste do seu cilindro de ${capacity} venceu em ${expirationYear}! O veículo não passa na vistoria do Detran e os postos podem recusar o abastecimento por segurança.`;
        statusHtml = `
          <div class="calc-result-status due-alert">
            ⚠️ RETESTE VENCIDO (Venceu em ${expirationYear})
          </div>
          <p style="color: #CBD5E1; font-size: 0.95rem; margin-bottom: 18px; line-height: 1.6;">
            ${msg}
          </p>
          <a href="https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(`Olá! Fiz a simulação no site da Real Teste GNV. Meu cilindro de ${capacity} teve o último reteste em ${lastYear} (venceu em ${expirationYear}) e preciso fazer o reteste urgente. Qual o valor e disponibilidade?`)}" 
             target="_blank" class="btn btn-primary btn-sm" style="width: 100%;">
            Agendar Reteste Urgente no WhatsApp
          </a>
        `;
      } else if (isDueSoon) {
        msg = `Fique atento: O reteste do seu cilindro de ${capacity} vence em ${expirationYear}. Antecipe seu reteste para evitar filas e multas.`;
        statusHtml = `
          <div class="calc-result-status due-soon">
            ⏳ VENCIMENTO PRÓXIMO (${expirationYear})
          </div>
          <p style="color: #CBD5E1; font-size: 0.95rem; margin-bottom: 18px; line-height: 1.6;">
            ${msg}
          </p>
          <a href="https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(`Olá! Meu cilindro GNV de ${capacity} vence o reteste em ${expirationYear}. Gostaria de consultar orçamento e agendar na Real Teste GNV.`)}" 
             target="_blank" class="btn btn-primary btn-sm" style="width: 100%;">
            Consultar Valor do Reteste
          </a>
        `;
      } else {
        msg = `Tudo em dia! O reteste do seu cilindro de ${capacity} é válido até ${expirationYear}. Lembre-se apenas de realizar a vistoria anual do kit GNV.`;
        statusHtml = `
          <div class="calc-result-status ok-status">
            ✅ RETESTE EM DIA (Válido até ${expirationYear})
          </div>
          <p style="color: #CBD5E1; font-size: 0.95rem; margin-bottom: 18px; line-height: 1.6;">
            ${msg}
          </p>
          <a href="https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(`Olá Real Teste GNV! Meu cilindro vence em ${expirationYear}, mas tenho dúvidas sobre inspeção e manutenção de válvulas.`)}" 
             target="_blank" class="btn btn-secondary btn-sm" style="width: 100%;">
            Tirar Dúvidas com Técnico
          </a>
        `;
      }

      calcResultBox.innerHTML = statusHtml;
    });
  }

  // 5. FORMULÁRIO DE CONTATO / ORÇAMENTO
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const veiculo = document.getElementById('veiculo').value.trim();
      const servico = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      const text = `*SOLICITAÇÃO DE ORÇAMENTO - REAL TESTE GNV*\n` +
                   `👤 *Nome:* ${nome}\n` +
                   `📱 *Telefone:* ${telefone}\n` +
                   `🚗 *Veículo:* ${veiculo || 'Não informado'}\n` +
                   `🔧 *Serviço desejado:* ${servico}\n` +
                   `💬 *Mensagem:* ${mensagem || 'Gostaria de mais detalhes e orçamento.'}\n\n` +
                   `_Enviado pelo site Real Teste GNV_`;

      const whatsappUrl = `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 6. FILTRO DA GALERIA
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 7. LIGHTBOX MODAL PARA GALERIA
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Foto da Oficina Real Teste GNV';
          lightboxModal.classList.add('active');
          document.body.classList.add('modal-open');
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // 8. ANIMAÇÃO DE CONTADORES NUMÉRICOS
  const statNumbers = document.querySelectorAll('.counter-val');
  let animated = false;

  const animateCounters = () => {
    const triggerBottom = window.innerHeight * 0.95;
    statNumbers.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < triggerBottom && !animated) {
        animated = true;
        statNumbers.forEach(c => {
          const target = +c.getAttribute('data-target');
          const duration = 1800;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              c.textContent = target.toLocaleString('pt-BR');
              clearInterval(timer);
            } else {
              c.textContent = Math.floor(current).toLocaleString('pt-BR');
            }
          }, stepTime);
        });
      }
    });
  };

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  // 9. FAQ ACCORDION INTERATIVO
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Fecha todos os outros itens para um comportamento sanfona limpo
        faqItems.forEach(i => i.classList.remove('active'));
        // Alterna o clicado
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});
