import { c as createComponent, a as renderTemplate, m as maybeRenderHead, r as renderComponent, b as createAstro } from '../chunks/astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_QvpN_Tye.mjs';
import 'clsx';
import { $ as $$Button } from '../chunks/Button_BRpzlBlR.mjs';
import { $ as $$Input, a as $$PhoneInput, b as $$DNIInput } from '../chunks/phone-input_Dllun-VX.mjs';
import { $ as $$DAILogo } from '../chunks/DAILogo_NxZ-ndM4.mjs';
export { renderers } from '../renderers.mjs';

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$AuthTabs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", "<div class=\"flex justify-center mb-8\"> <div id=\"auth-tabs-button\" class=\"flex gap-5 font-medium bg-color-azul-oscuro border border-dai/30 h-fit w-fit rounded-xl py-2 px-2 items-center relative scale-80 sm:scale-100\"> <div id=\"auth-backdrop\" class=\"-z-10 rounded absolute bg-dai/20\n          translate-x-(--left) translate-y-(--top)\n          h-(--height) w-(--width)\n          transition-all duration-200 \n          ease-in-out left-0 top-0\"></div> <ul class=\"flex flex-row items-center text-white\"> <li> <button id=\"tab-login\" class=\"relative z-10 py-1 px-4 cursor-pointer hover:text-dai transition-colors duration-400\"> <span>Iniciar Sesi\xF3n</span> </button> </li> <li> <button id=\"tab-register\" class=\"relative z-10 py-1 px-4 cursor-pointer hover:text-dai transition-colors duration-400\"> <span>Registrarse</span> </button> </li> </ul> </div> </div> <script type=\"module\">\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const tabLogin = document.querySelector('#tab-login')\n    const tabRegister = document.querySelector('#tab-register')\n    const authBackdrop = document.querySelector('#auth-backdrop')\n\n    // Inicializa el backdrop con el bot\xF3n de Industriales\n    const initicializeBackdrop = (button) => {\n        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = button\n        authBackdrop.style.setProperty('--left', `${offsetLeft}px`)\n        authBackdrop.style.setProperty('--top', `${offsetTop}px`)\n        authBackdrop.style.setProperty('--width', `${offsetWidth}px`)\n        authBackdrop.style.setProperty('--height', `${offsetHeight}px`)\n    }\n\n    // Function to update the backdrop position and size\n    const updateBackdrop = (button) => {\n        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = button\n        authBackdrop.style.setProperty('--left', `${offsetLeft}px`)\n        authBackdrop.style.setProperty('--top', `${offsetTop}px`)\n        authBackdrop.style.setProperty('--width', `${offsetWidth}px`)\n        authBackdrop.style.setProperty('--height', `${offsetHeight}px`)\n    }\n\n    // Estado inicial: Login\n    // Esto asegura que al cargar la p\xE1gina, el backdrop y la tabla de login est\xE9n visibles\n    if (tabLogin) {\n        initicializeBackdrop(tabLogin)\n    }\n\n    tabLogin.addEventListener('click', () => {\n        updateBackdrop(tabLogin)\n    })\n\n    tabRegister.addEventListener('click', () => {\n        updateBackdrop(tabRegister)\n    })\n    });\n<\/script>"], ["", "<div class=\"flex justify-center mb-8\"> <div id=\"auth-tabs-button\" class=\"flex gap-5 font-medium bg-color-azul-oscuro border border-dai/30 h-fit w-fit rounded-xl py-2 px-2 items-center relative scale-80 sm:scale-100\"> <div id=\"auth-backdrop\" class=\"-z-10 rounded absolute bg-dai/20\n          translate-x-(--left) translate-y-(--top)\n          h-(--height) w-(--width)\n          transition-all duration-200 \n          ease-in-out left-0 top-0\"></div> <ul class=\"flex flex-row items-center text-white\"> <li> <button id=\"tab-login\" class=\"relative z-10 py-1 px-4 cursor-pointer hover:text-dai transition-colors duration-400\"> <span>Iniciar Sesi\xF3n</span> </button> </li> <li> <button id=\"tab-register\" class=\"relative z-10 py-1 px-4 cursor-pointer hover:text-dai transition-colors duration-400\"> <span>Registrarse</span> </button> </li> </ul> </div> </div> <script type=\"module\">\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const tabLogin = document.querySelector('#tab-login')\n    const tabRegister = document.querySelector('#tab-register')\n    const authBackdrop = document.querySelector('#auth-backdrop')\n\n    // Inicializa el backdrop con el bot\xF3n de Industriales\n    const initicializeBackdrop = (button) => {\n        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = button\n        authBackdrop.style.setProperty('--left', \\`\\${offsetLeft}px\\`)\n        authBackdrop.style.setProperty('--top', \\`\\${offsetTop}px\\`)\n        authBackdrop.style.setProperty('--width', \\`\\${offsetWidth}px\\`)\n        authBackdrop.style.setProperty('--height', \\`\\${offsetHeight}px\\`)\n    }\n\n    // Function to update the backdrop position and size\n    const updateBackdrop = (button) => {\n        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = button\n        authBackdrop.style.setProperty('--left', \\`\\${offsetLeft}px\\`)\n        authBackdrop.style.setProperty('--top', \\`\\${offsetTop}px\\`)\n        authBackdrop.style.setProperty('--width', \\`\\${offsetWidth}px\\`)\n        authBackdrop.style.setProperty('--height', \\`\\${offsetHeight}px\\`)\n    }\n\n    // Estado inicial: Login\n    // Esto asegura que al cargar la p\xE1gina, el backdrop y la tabla de login est\xE9n visibles\n    if (tabLogin) {\n        initicializeBackdrop(tabLogin)\n    }\n\n    tabLogin.addEventListener('click', () => {\n        updateBackdrop(tabLogin)\n    })\n\n    tabRegister.addEventListener('click', () => {\n        updateBackdrop(tabRegister)\n    })\n    });\n<\/script>"])), maybeRenderHead());
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/auth/AuthTabs.astro", void 0);

const $$LoginForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="form-login" class="tab-content space-y-6"> <h2 class="text-3xl font-bold text-center text-white mb-6">Bienvenido de nuevo</h2> <form action="/api/auth/signin" method="POST" class="space-y-6"> <div class="space-y-4"> ${renderComponent($$result, "Input", $$Input, { "type": "email", "placeholder": "Correo electr\xF3nico", "variant": "auth", "name": "email", "required": true })} ${renderComponent($$result, "Input", $$Input, { "type": "password", "placeholder": "Contrase\xF1a", "variant": "auth", "name": "password", "required": true })} </div> <div class="flex items-center justify-between text-sm"> <label class="flex items-center gap-2 cursor-pointer"> <input type="checkbox" class="accent-dai rounded"> <span class="text-white/90">Recordarme</span> </label> <a href="#" class="text-dai hover:text-azul-brillante transition-colors duration-300">
¿Olvidaste tu contraseña?
</a> </div> ${renderComponent($$result, "Button", $$Button, { "type": "submit", "variant": "primary", "size": "md", "className": "w-full" }, { "default": ($$result2) => renderTemplate`
Iniciar sesión
` })} </form> </div>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/auth/LoginForm.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$RegisterForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div id="form-register" class="tab-content hidden space-y-6"> <h2 class="text-3xl font-bold text-center text-white mb-6">Crea tu cuenta</h2> <form id="register-form" action="/api/auth/register" method="POST" class="space-y-4"> <div id="form-error" class="hidden mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"> <p id="error-message" class="text-red-200 text-sm"></p> </div> <!-- MARK: Nombre --> <div> <label for="fullName" class="block text-sm font-medium text-white/80 mb-1">\nNombre completo *\n</label> <input type="text" id="fullName" name="fullName" required class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="Tu nombre completo"> </div> <!-- MARK: Email --> <div> <label for="register-email" class="block text-sm font-medium text-white/80 mb-1">\nEmail *\n</label> <input type="email" id="register-email" name="email" required class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="holacaracola@gmail.com"> <p id="email-feedback" class="text-xs mt-1 transition-colors duration-300"> <span class="text-white/60">Introduce un email v\xE1lido</span> </p> </div> <!-- MARK: DNI --> ', " <!-- MARK: Tel\xE9fono --> ", ' <!-- MARK: Contrase\xF1a --> <div> <label for="register-password" class="block text-sm font-medium text-white/80 mb-1">\nContrase\xF1a *\n</label> <input type="password" id="register-password" name="password" required minlength="6" class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="M\xEDnimo 6 caracteres"> </div> <!-- MARK: OK --> ', ` </form> </div> <script type="module">
  // Validaci\xF3n del email en tiempo real
  document.getElementById('register-email').addEventListener('input', function() {
    const emailInput = this.value.trim();
    const feedback = document.getElementById('email-feedback');
    
    // Limpiar validaci\xF3n personalizada
    this.setCustomValidity('');
    
    if (emailInput.length === 0) {
      // Campo vac\xEDo
      feedback.innerHTML = '<span class="text-white/60">Introduce un email v\xE1lido</span>';
      this.classList.remove('border-green-400', 'border-red-400', 'border-yellow-400');
      this.classList.add('border-white/20');
      return;
    }
    
    // Verificar si contiene @
    if (!emailInput.includes('@')) {
      feedback.innerHTML = '<span class="text-yellow-400">Falta el s\xEDmbolo @</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    const parts = emailInput.split('@');
    if (parts.length !== 2) {
      feedback.innerHTML = '<span class="text-red-400">\u2717 Solo debe haber un s\xEDmbolo @</span>';
      this.classList.remove('border-green-400', 'border-yellow-400');
      this.classList.add('border-red-400');
      this.setCustomValidity('Formato de email incorrecto.');
      return;
    }
    
    const [localPart, domainPart] = parts;
    
    // Verificar parte local (antes del @)
    if (localPart.length === 0) {
      feedback.innerHTML = '<span class="text-yellow-400">Falta el nombre antes del @</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    // Verificar dominio
    if (domainPart.length === 0) {
      feedback.innerHTML = '<span class="text-yellow-400">Falta el dominio despu\xE9s del @</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    if (!domainPart.includes('.')) {
      feedback.innerHTML = '<span class="text-yellow-400">El dominio necesita un punto (.)</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    const domainParts = domainPart.split('.');
    if (domainParts.some(part => part.length === 0)) {
      feedback.innerHTML = '<span class="text-red-400">\u2717 Formato de dominio incorrecto</span>';
      this.classList.remove('border-green-400', 'border-yellow-400');
      this.classList.add('border-red-400');
      this.setCustomValidity('Formato de dominio incorrecto.');
      return;
    }
    
    // Verificar que la extensi\xF3n tenga al menos 2 caracteres
    const extension = domainParts[domainParts.length - 1];
    if (extension.length < 2) {
      feedback.innerHTML = '<span class="text-yellow-400">La extensi\xF3n debe tener al menos 2 caracteres</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    // Validaci\xF3n completa con regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(emailInput)) {
      feedback.innerHTML = '<span class="text-green-400">\u2713 Email v\xE1lido</span>';
      this.classList.remove('border-red-400', 'border-yellow-400');
      this.classList.add('border-green-400');
    } else {
      feedback.innerHTML = '<span class="text-red-400">\u2717 Formato de email inv\xE1lido</span>';
      this.classList.remove('border-green-400', 'border-yellow-400');
      this.classList.add('border-red-400');
      this.setCustomValidity('Formato de email inv\xE1lido.');
    }
  });

  // Funci\xF3n para mostrar error
  function showError(message) {
    const errorDiv = document.getElementById('form-error');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
    
    // Scroll al error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Funci\xF3n para ocultar error
  function hideError() {
    document.getElementById('form-error').classList.add('hidden');
  }

  // Manejar env\xEDo del formulario
  document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    hideError();

    const formData = new FormData(this);
    const email = formData.get('email');
    const phone = formData.get('phone');
    const dni = formData.get('dni');
    const fullName = formData.get('fullName');
    const password = formData.get('password');

    // Validar que todos los campos est\xE9n llenos
    if (!email || !phone || !dni || !fullName || !password) {
      showError('Todos los campos son obligatorios');
      return;
    }

    // Mostrar loading en el bot\xF3n
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creando cuenta...';
    submitBtn.disabled = true;

    try {
      // Enviar el formulario directamente
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Redirigir al \xE9xito
        window.location.href = '/auth?message=check_email';
      } else {
        const errorText = await response.text();
        showError(errorText || 'Error al crear la cuenta');
      }

    } catch (error) {
      console.error('Error en el registro:', error);
      showError('Error de conexi\xF3n. Int\xE9ntalo de nuevo.');
    } finally {
      // Restaurar bot\xF3n
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
<\/script>`], ["", '<div id="form-register" class="tab-content hidden space-y-6"> <h2 class="text-3xl font-bold text-center text-white mb-6">Crea tu cuenta</h2> <form id="register-form" action="/api/auth/register" method="POST" class="space-y-4"> <div id="form-error" class="hidden mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"> <p id="error-message" class="text-red-200 text-sm"></p> </div> <!-- MARK: Nombre --> <div> <label for="fullName" class="block text-sm font-medium text-white/80 mb-1">\nNombre completo *\n</label> <input type="text" id="fullName" name="fullName" required class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="Tu nombre completo"> </div> <!-- MARK: Email --> <div> <label for="register-email" class="block text-sm font-medium text-white/80 mb-1">\nEmail *\n</label> <input type="email" id="register-email" name="email" required class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="holacaracola@gmail.com"> <p id="email-feedback" class="text-xs mt-1 transition-colors duration-300"> <span class="text-white/60">Introduce un email v\xE1lido</span> </p> </div> <!-- MARK: DNI --> ', " <!-- MARK: Tel\xE9fono --> ", ' <!-- MARK: Contrase\xF1a --> <div> <label for="register-password" class="block text-sm font-medium text-white/80 mb-1">\nContrase\xF1a *\n</label> <input type="password" id="register-password" name="password" required minlength="6" class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="M\xEDnimo 6 caracteres"> </div> <!-- MARK: OK --> ', ` </form> </div> <script type="module">
  // Validaci\xF3n del email en tiempo real
  document.getElementById('register-email').addEventListener('input', function() {
    const emailInput = this.value.trim();
    const feedback = document.getElementById('email-feedback');
    
    // Limpiar validaci\xF3n personalizada
    this.setCustomValidity('');
    
    if (emailInput.length === 0) {
      // Campo vac\xEDo
      feedback.innerHTML = '<span class="text-white/60">Introduce un email v\xE1lido</span>';
      this.classList.remove('border-green-400', 'border-red-400', 'border-yellow-400');
      this.classList.add('border-white/20');
      return;
    }
    
    // Verificar si contiene @
    if (!emailInput.includes('@')) {
      feedback.innerHTML = '<span class="text-yellow-400">Falta el s\xEDmbolo @</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    const parts = emailInput.split('@');
    if (parts.length !== 2) {
      feedback.innerHTML = '<span class="text-red-400">\u2717 Solo debe haber un s\xEDmbolo @</span>';
      this.classList.remove('border-green-400', 'border-yellow-400');
      this.classList.add('border-red-400');
      this.setCustomValidity('Formato de email incorrecto.');
      return;
    }
    
    const [localPart, domainPart] = parts;
    
    // Verificar parte local (antes del @)
    if (localPart.length === 0) {
      feedback.innerHTML = '<span class="text-yellow-400">Falta el nombre antes del @</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    // Verificar dominio
    if (domainPart.length === 0) {
      feedback.innerHTML = '<span class="text-yellow-400">Falta el dominio despu\xE9s del @</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    if (!domainPart.includes('.')) {
      feedback.innerHTML = '<span class="text-yellow-400">El dominio necesita un punto (.)</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    const domainParts = domainPart.split('.');
    if (domainParts.some(part => part.length === 0)) {
      feedback.innerHTML = '<span class="text-red-400">\u2717 Formato de dominio incorrecto</span>';
      this.classList.remove('border-green-400', 'border-yellow-400');
      this.classList.add('border-red-400');
      this.setCustomValidity('Formato de dominio incorrecto.');
      return;
    }
    
    // Verificar que la extensi\xF3n tenga al menos 2 caracteres
    const extension = domainParts[domainParts.length - 1];
    if (extension.length < 2) {
      feedback.innerHTML = '<span class="text-yellow-400">La extensi\xF3n debe tener al menos 2 caracteres</span>';
      this.classList.remove('border-green-400', 'border-red-400');
      this.classList.add('border-yellow-400');
      return;
    }
    
    // Validaci\xF3n completa con regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(emailInput)) {
      feedback.innerHTML = '<span class="text-green-400">\u2713 Email v\xE1lido</span>';
      this.classList.remove('border-red-400', 'border-yellow-400');
      this.classList.add('border-green-400');
    } else {
      feedback.innerHTML = '<span class="text-red-400">\u2717 Formato de email inv\xE1lido</span>';
      this.classList.remove('border-green-400', 'border-yellow-400');
      this.classList.add('border-red-400');
      this.setCustomValidity('Formato de email inv\xE1lido.');
    }
  });

  // Funci\xF3n para mostrar error
  function showError(message) {
    const errorDiv = document.getElementById('form-error');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
    
    // Scroll al error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Funci\xF3n para ocultar error
  function hideError() {
    document.getElementById('form-error').classList.add('hidden');
  }

  // Manejar env\xEDo del formulario
  document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    hideError();

    const formData = new FormData(this);
    const email = formData.get('email');
    const phone = formData.get('phone');
    const dni = formData.get('dni');
    const fullName = formData.get('fullName');
    const password = formData.get('password');

    // Validar que todos los campos est\xE9n llenos
    if (!email || !phone || !dni || !fullName || !password) {
      showError('Todos los campos son obligatorios');
      return;
    }

    // Mostrar loading en el bot\xF3n
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creando cuenta...';
    submitBtn.disabled = true;

    try {
      // Enviar el formulario directamente
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Redirigir al \xE9xito
        window.location.href = '/auth?message=check_email';
      } else {
        const errorText = await response.text();
        showError(errorText || 'Error al crear la cuenta');
      }

    } catch (error) {
      console.error('Error en el registro:', error);
      showError('Error de conexi\xF3n. Int\xE9ntalo de nuevo.');
    } finally {
      // Restaurar bot\xF3n
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
<\/script>`])), maybeRenderHead(), renderComponent($$result, "DNIInput", $$DNIInput, {}), renderComponent($$result, "PhoneInput", $$PhoneInput, {}), renderComponent($$result, "Button", $$Button, { "type": "submit", "variant": "primary", "size": "md", "className": "w-full" }, { "default": async ($$result2) => renderTemplate`
Register
` }));
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/auth/RegisterForm.astro", void 0);

const $$SocialLogin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="w-full space-y-4"> <!-- Botón de Google --> <form action="/api/auth/signin" method="post"> <input type="hidden" name="provider" value="google"> <button type="submit" class="w-full flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed font-medium py-3 px-4 rounded-lg border border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"> <!-- Google Icon SVG --> <svg class="w-5 h-5" viewBox="0 0 24 24"> <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path> <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path> <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path> <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path> </svg> <span>Continuar con Google</span> </button> </form> </div>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/auth/SocialLogin.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Auth = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Auth;
  console.log("=== P\xC1GINA AUTH ===");
  console.log("URL:", Astro2.request.url);
  const url = new URL(Astro2.request.url);
  const errorParam = url.searchParams.get("error");
  const messageParam = url.searchParams.get("message");
  if (errorParam) {
    console.log("\u274C Error detectado en URL:", errorParam, messageParam);
  }
  return renderTemplate(_a || (_a = __template(["---\n", `<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', () => {
    const tabLogin = document.querySelector('#tab-login');
    const tabRegister = document.querySelector('#tab-register');
    const formLogin = document.querySelector('#form-login');
    const formRegister = document.querySelector('#form-register');

    // Verificar que todos los elementos existen
    if (!tabLogin || !tabRegister || !formLogin || !formRegister) {
      console.error('No se pudieron encontrar todos los elementos necesarios para los tabs');
      return;
    }

    // Estado inicial - mostrar login
    let currentTab = 'login';

    // Funci\xF3n para cambiar entre tabs
    const switchTab = (tab) => {
      if (tab === 'login') {
        // Mostrar formulario de login
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');
        
        // Actualizar estado visual de los tabs
        tabLogin.classList.add('text-dai');
        tabRegister.classList.remove('text-dai');
        
        currentTab = 'login';
      } else if (tab === 'register') {
        // Mostrar formulario de registro
        formLogin.classList.add('hidden');
        formRegister.classList.remove('hidden');
        
        // Actualizar estado visual de los tabs
        tabRegister.classList.add('text-dai');
        tabLogin.classList.remove('text-dai');
        
        currentTab = 'register';
      }
    };

    // Event listeners para los tabs
    tabLogin.addEventListener('click', () => {
      if (currentTab !== 'login') {
        switchTab('login');
      }
    });

    tabRegister.addEventListener('click', () => {
      if (currentTab !== 'register') {
        switchTab('register');
      }
    });

    // Establecer estado inicial
    switchTab('login');
    
    // Remover verificaci\xF3n autom\xE1tica de sesi\xF3n para evitar bucles
    // La verificaci\xF3n se hace en el componente SocialLogin
  });
<\/script>`])), renderComponent($$result, "AuthLayout", $$AuthLayout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="w-full max-w-md"><!-- Logo de la DAI --><div class="flex justify-center mb-8">${renderComponent($$result2, "DAILogo", $$DAILogo, { "size": "md" })}</div><!-- Contenedor principal del formulario --><div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">${renderComponent($$result2, "AuthTabs", $$AuthTabs, {})}${renderComponent($$result2, "LoginForm", $$LoginForm, {})}${renderComponent($$result2, "RegisterForm", $$RegisterForm, {})}<!-- Divisor --><div class="flex items-center my-6"><div class="flex-1 border-t border-white/20"></div><span class="px-4 text-white/60 text-sm">o continúa con</span><div class="flex-1 border-t border-white/20"></div></div><!-- Botón de Google OAuth con Supabase -->${renderComponent($$result2, "SocialLogin", $$SocialLogin, {})}</div><!-- Enlace para volver al inicio --><div class="text-center mt-6"><a href="/" class="text-white/80 hover:text-white transition-colors duration-300 text-sm">
← Volver al inicio
</a></div></div>` }));
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth.astro", void 0);

const $$file = "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth.astro";
const $$url = "/auth";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Auth,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
