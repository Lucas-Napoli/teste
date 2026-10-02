'use strict';

const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('navigation');

function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'Menu';
}

menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'Fechar' : 'Menu';
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

const applianceInput = document.getElementById('appliance-type');
document.querySelectorAll('[data-appliance]').forEach(link => {
  link.addEventListener('click', () => {
    applianceInput.value = link.dataset.appliance;
  });
});

const form = document.getElementById('orcamento');
const nameInput = document.getElementById('client-name');
nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = nameInput.value.trim();
  nameInput.setCustomValidity(name ? '' : 'Informe seu nome para continuar.');
  if (!form.reportValidity()) return;

  const appliance = applianceInput.value;
  const issue = document.getElementById('issue-description').value.trim();
  const message = [
    `Olá! Meu nome é ${name}.`,
    `Gostaria de solicitar uma visita para ${appliance}.`,
    ...(issue ? [`Problema: ${issue}`] : []),
    'Vocês atendem na minha região?'
  ].join('\n');

  // Same-tab navigation works without popup permissions and never sends automatically.
  window.location.assign('https://wa.me/5515998192331?text=' + encodeURIComponent(message));
});

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();
