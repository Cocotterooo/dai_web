import { c as createComponent, b as createAstro, m as maybeRenderHead, f as addAttribute, a as renderTemplate } from './astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Input;
  const {
    type = "text",
    placeholder = "",
    value = "",
    name,
    id,
    required = false,
    disabled = false,
    className = "",
    variant = "default"
  } = Astro2.props;
  const baseClasses = "w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent";
  const variantClasses = {
    default: "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-dai focus:border-dai",
    auth: "bg-white/20 backdrop-blur-sm placeholder-white/80 text-white border border-white/30 focus:ring-dai focus:border-transparent"
  };
  return renderTemplate`${maybeRenderHead()}<input${addAttribute(type, "type")}${addAttribute(placeholder, "placeholder")}${addAttribute(value, "value")}${addAttribute(name, "name")}${addAttribute(id, "id")}${addAttribute(required, "required")}${addAttribute(disabled, "disabled")}${addAttribute(`${baseClasses} ${variantClasses[variant]} ${className}`, "class")}>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/ui/Input.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$DNIInput = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", `<div> <label for="dni" class="block text-sm font-medium text-white/80 mb-1">
DNI *
</label> <input type="text" id="dni" name="dni" required pattern="[0-9]{8}[A-Za-z]" maxlength="9" class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="12345678A"> <p id="dni-feedback" class="text-xs mt-1 transition-colors duration-300"> <span class="text-white/60">Formato: 8 n\xFAmeros + 1 letra</span> </p> </div> <script type="module">
    // Validaci\xF3n del DNI en tiempo real
    document.getElementById('dni').addEventListener('input', function() {
        const dniInput = this.value.toUpperCase();
        const dniNumber = dniInput.slice(0, 8);
        const dniLetter = dniInput[8];
        const feedback = document.getElementById('dni-feedback');
        
        // Limpiar validaci\xF3n personalizada
        this.setCustomValidity('');
        
        if (dniInput.length === 0) {
        // Campo vac\xEDo
        feedback.innerHTML = '<span class="text-white/60">Formato: 8 n\xFAmeros + 1 letra</span>';
        this.classList.remove('border-green-400', 'border-red-400');
        this.classList.add('border-white/20');
        return;
        }
        
        if (dniInput.length < 8) {
        // Menos de 8 caracteres
        feedback.innerHTML = '<span class="text-yellow-400">Introduce el n\xFAmero completo del DNI.</span>';
        this.classList.remove('border-green-400', 'border-red-400');
        this.classList.add('border-yellow-400');
        return;
        }
        
        if (dniInput.length === 8) {
        // Exactamente 8 n\xFAmeros, esperar la letra
        if (/^[0-9]{8}$/.test(dniNumber)) {
            feedback.innerHTML = '<span class="text-blue-400">Ahora introduce la letra del DNI</span>';
            this.classList.remove('border-green-400', 'border-red-400');
            this.classList.add('border-blue-400');
        } else {
            feedback.innerHTML = '<span class="text-red-400">Los primeros 8 caracteres deben ser n\xFAmeros</span>';
            this.classList.remove('border-green-400', 'border-blue-400');
            this.classList.add('border-red-400');
            this.setCustomValidity('Los primeros 8 caracteres deben ser n\xFAmeros.');
        }
        return;
        }
        
        if (dniInput.length === 9) {
        // DNI completo, validar
        const dniPattern = /^[0-9]{8}[A-Z]$/;
        
        if (dniPattern.test(dniInput)) {
            const expectedLetter = calculateDNILetter(parseInt(dniNumber));
            
            if (dniLetter === expectedLetter) {
            // DNI v\xE1lido
            feedback.innerHTML = '<span class="text-green-400">\u2713 DNI v\xE1lido</span>';
            this.classList.remove('border-red-400', 'border-blue-400', 'border-yellow-400');
            this.classList.add('border-green-400');
            } else {
            // DNI incorrecto
            feedback.innerHTML = \`<span class="text-red-400">\u2717 DNI inv\xE1lido.</span>\`;
            this.classList.remove('border-green-400', 'border-blue-400', 'border-yellow-400');
            this.classList.add('border-red-400');
            this.setCustomValidity(\`DNI inv\xE1lido.\`);
            }
        } else {
            // Formato incorrecto
            feedback.innerHTML = '<span class="text-red-400">\u2717 Formato incorrecto. Debe ser 8 n\xFAmeros + 1 letra</span>';
            this.classList.remove('border-green-400', 'border-blue-400', 'border-yellow-400');
            this.classList.add('border-red-400');
            this.setCustomValidity('Formato incorrecto. Debe ser 8 n\xFAmeros y 1 letra.');
        }
        }
        
        if (dniInput.length > 9) {
        // M\xE1s de 9 caracteres
        feedback.innerHTML = '<span class="text-red-400">\u2717 Demasiados caracteres. M\xE1ximo 9</span>';
        this.classList.remove('border-green-400', 'border-blue-400', 'border-yellow-400');
        this.classList.add('border-red-400');
        this.setCustomValidity('El DNI no puede tener m\xE1s de 9 caracteres.');
        }
    });

    // Tambi\xE9n validar cuando pierda el foco para asegurar consistencia
    document.getElementById('dni').addEventListener('blur', function() {
        if (this.value.length > 0 && this.value.length < 9) {
        this.setCustomValidity('El DNI debe tener exactamente 9 caracteres.');
        }
    });

    // Funci\xF3n para calcular la letra correcta del DNI
    function calculateDNILetter(dni) {
        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        return letters[dni % 23];
    }
<\/script>`], ["", `<div> <label for="dni" class="block text-sm font-medium text-white/80 mb-1">
DNI *
</label> <input type="text" id="dni" name="dni" required pattern="[0-9]{8}[A-Za-z]" maxlength="9" class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="12345678A"> <p id="dni-feedback" class="text-xs mt-1 transition-colors duration-300"> <span class="text-white/60">Formato: 8 n\xFAmeros + 1 letra</span> </p> </div> <script type="module">
    // Validaci\xF3n del DNI en tiempo real
    document.getElementById('dni').addEventListener('input', function() {
        const dniInput = this.value.toUpperCase();
        const dniNumber = dniInput.slice(0, 8);
        const dniLetter = dniInput[8];
        const feedback = document.getElementById('dni-feedback');
        
        // Limpiar validaci\xF3n personalizada
        this.setCustomValidity('');
        
        if (dniInput.length === 0) {
        // Campo vac\xEDo
        feedback.innerHTML = '<span class="text-white/60">Formato: 8 n\xFAmeros + 1 letra</span>';
        this.classList.remove('border-green-400', 'border-red-400');
        this.classList.add('border-white/20');
        return;
        }
        
        if (dniInput.length < 8) {
        // Menos de 8 caracteres
        feedback.innerHTML = '<span class="text-yellow-400">Introduce el n\xFAmero completo del DNI.</span>';
        this.classList.remove('border-green-400', 'border-red-400');
        this.classList.add('border-yellow-400');
        return;
        }
        
        if (dniInput.length === 8) {
        // Exactamente 8 n\xFAmeros, esperar la letra
        if (/^[0-9]{8}$/.test(dniNumber)) {
            feedback.innerHTML = '<span class="text-blue-400">Ahora introduce la letra del DNI</span>';
            this.classList.remove('border-green-400', 'border-red-400');
            this.classList.add('border-blue-400');
        } else {
            feedback.innerHTML = '<span class="text-red-400">Los primeros 8 caracteres deben ser n\xFAmeros</span>';
            this.classList.remove('border-green-400', 'border-blue-400');
            this.classList.add('border-red-400');
            this.setCustomValidity('Los primeros 8 caracteres deben ser n\xFAmeros.');
        }
        return;
        }
        
        if (dniInput.length === 9) {
        // DNI completo, validar
        const dniPattern = /^[0-9]{8}[A-Z]$/;
        
        if (dniPattern.test(dniInput)) {
            const expectedLetter = calculateDNILetter(parseInt(dniNumber));
            
            if (dniLetter === expectedLetter) {
            // DNI v\xE1lido
            feedback.innerHTML = '<span class="text-green-400">\u2713 DNI v\xE1lido</span>';
            this.classList.remove('border-red-400', 'border-blue-400', 'border-yellow-400');
            this.classList.add('border-green-400');
            } else {
            // DNI incorrecto
            feedback.innerHTML = \\\`<span class="text-red-400">\u2717 DNI inv\xE1lido.</span>\\\`;
            this.classList.remove('border-green-400', 'border-blue-400', 'border-yellow-400');
            this.classList.add('border-red-400');
            this.setCustomValidity(\\\`DNI inv\xE1lido.\\\`);
            }
        } else {
            // Formato incorrecto
            feedback.innerHTML = '<span class="text-red-400">\u2717 Formato incorrecto. Debe ser 8 n\xFAmeros + 1 letra</span>';
            this.classList.remove('border-green-400', 'border-blue-400', 'border-yellow-400');
            this.classList.add('border-red-400');
            this.setCustomValidity('Formato incorrecto. Debe ser 8 n\xFAmeros y 1 letra.');
        }
        }
        
        if (dniInput.length > 9) {
        // M\xE1s de 9 caracteres
        feedback.innerHTML = '<span class="text-red-400">\u2717 Demasiados caracteres. M\xE1ximo 9</span>';
        this.classList.remove('border-green-400', 'border-blue-400', 'border-yellow-400');
        this.classList.add('border-red-400');
        this.setCustomValidity('El DNI no puede tener m\xE1s de 9 caracteres.');
        }
    });

    // Tambi\xE9n validar cuando pierda el foco para asegurar consistencia
    document.getElementById('dni').addEventListener('blur', function() {
        if (this.value.length > 0 && this.value.length < 9) {
        this.setCustomValidity('El DNI debe tener exactamente 9 caracteres.');
        }
    });

    // Funci\xF3n para calcular la letra correcta del DNI
    function calculateDNILetter(dni) {
        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        return letters[dni % 23];
    }
<\/script>`])), maybeRenderHead());
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/ui/DNI-input.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$PhoneInput = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<div> <label for="phone" class="block text-sm font-medium text-white/80 mb-1">
Tel\xE9fono *
</label> <input type="tel" id="phone" name="phone" required pattern="[0-9]{9}" maxlength="9" class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="123456789"> <p id="phone-feedback" class="text-xs mt-1 transition-colors duration-300"> <span class="text-white/60">9 d\xEDgitos sin prefijo</span> </p> </div> <script type="module">
    // Validaci\xF3n del tel\xE9fono en tiempo real
    document.getElementById('phone').addEventListener('input', function() {
        const phoneInput = this.value;
        const feedback = document.getElementById('phone-feedback');
        
        // Limpiar validaci\xF3n personalizada
        this.setCustomValidity('');
        
        if (phoneInput.length === 0) {
        // Campo vac\xEDo
        feedback.innerHTML = '<span class="text-white/60">9 d\xEDgitos sin prefijo</span>';
        this.classList.remove('border-green-400', 'border-red-400', 'border-yellow-400');
        this.classList.add('border-white/20');
        return;
        }
        
        // Verificar que solo contenga n\xFAmeros
        const hasNonDigits = /[^0-9]/.test(phoneInput);
        if (hasNonDigits) {
        feedback.innerHTML = '<span class="text-red-400">\u2717 Solo se permiten n\xFAmeros</span>';
        this.classList.remove('border-green-400', 'border-yellow-400');
        this.classList.add('border-red-400');
        this.setCustomValidity('El tel\xE9fono solo puede contener n\xFAmeros.');
        return;
        }
        
        // Verificar longitud
        if (phoneInput.length < 9) {
        const remaining = 9 - phoneInput.length;
        feedback.innerHTML = \`<span class="text-blue-400">Introduce el n\xFAmero completo.</span>\`;
        this.classList.remove('border-green-400', 'border-red-400');
        this.classList.add('border-yellow-400');
        return;
        }
        
        if (phoneInput.length === 9) {

        // Verificar que sea un n\xFAmero v\xE1lido espa\xF1ol (empiece por 6, 7, 8, 9)
        const firstDigit = phoneInput[0];
        if (['6', '7', '8', '9'].includes(firstDigit)) {
            feedback.innerHTML = '<span class="text-green-400">\u2713 Tel\xE9fono v\xE1lido</span>';
            this.classList.remove('border-red-400', 'border-yellow-400');
            this.classList.add('border-green-400');
        } else {
            feedback.innerHTML = '<span class="text-red-400">\u2717 Debe empezar por 6, 7, 8 o 9</span>';
            this.classList.remove('border-green-400', 'border-yellow-400');
            this.classList.add('border-red-400');
            this.setCustomValidity('\u2717 Tel\xE9fono inv\xE1lido.');
        }
        }
        
        if (phoneInput.length > 9) {
        feedback.innerHTML = '<span class="text-red-400">\u2717 M\xE1ximo 9 d\xEDgitos</span>';
        this.classList.remove('border-green-400', 'border-yellow-400');
        this.classList.add('border-red-400');
        this.setCustomValidity('El tel\xE9fono no puede tener m\xE1s de 9 d\xEDgitos.');
        }
    });
    // Prevenir caracteres no num\xE9ricos en el tel\xE9fono
    document.getElementById('phone').addEventListener('keypress', function(e) {
        const isNumber = /[0-9]/.test(e.key);
        const isControlKey = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight', 'Clear', 'Copy', 'Paste'].includes(e.key);
        
        if (!isNumber && !isControlKey) {
        e.preventDefault();
        }
    });
<\/script>`], ["", `<div> <label for="phone" class="block text-sm font-medium text-white/80 mb-1">
Tel\xE9fono *
</label> <input type="tel" id="phone" name="phone" required pattern="[0-9]{9}" maxlength="9" class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50" placeholder="123456789"> <p id="phone-feedback" class="text-xs mt-1 transition-colors duration-300"> <span class="text-white/60">9 d\xEDgitos sin prefijo</span> </p> </div> <script type="module">
    // Validaci\xF3n del tel\xE9fono en tiempo real
    document.getElementById('phone').addEventListener('input', function() {
        const phoneInput = this.value;
        const feedback = document.getElementById('phone-feedback');
        
        // Limpiar validaci\xF3n personalizada
        this.setCustomValidity('');
        
        if (phoneInput.length === 0) {
        // Campo vac\xEDo
        feedback.innerHTML = '<span class="text-white/60">9 d\xEDgitos sin prefijo</span>';
        this.classList.remove('border-green-400', 'border-red-400', 'border-yellow-400');
        this.classList.add('border-white/20');
        return;
        }
        
        // Verificar que solo contenga n\xFAmeros
        const hasNonDigits = /[^0-9]/.test(phoneInput);
        if (hasNonDigits) {
        feedback.innerHTML = '<span class="text-red-400">\u2717 Solo se permiten n\xFAmeros</span>';
        this.classList.remove('border-green-400', 'border-yellow-400');
        this.classList.add('border-red-400');
        this.setCustomValidity('El tel\xE9fono solo puede contener n\xFAmeros.');
        return;
        }
        
        // Verificar longitud
        if (phoneInput.length < 9) {
        const remaining = 9 - phoneInput.length;
        feedback.innerHTML = \\\`<span class="text-blue-400">Introduce el n\xFAmero completo.</span>\\\`;
        this.classList.remove('border-green-400', 'border-red-400');
        this.classList.add('border-yellow-400');
        return;
        }
        
        if (phoneInput.length === 9) {

        // Verificar que sea un n\xFAmero v\xE1lido espa\xF1ol (empiece por 6, 7, 8, 9)
        const firstDigit = phoneInput[0];
        if (['6', '7', '8', '9'].includes(firstDigit)) {
            feedback.innerHTML = '<span class="text-green-400">\u2713 Tel\xE9fono v\xE1lido</span>';
            this.classList.remove('border-red-400', 'border-yellow-400');
            this.classList.add('border-green-400');
        } else {
            feedback.innerHTML = '<span class="text-red-400">\u2717 Debe empezar por 6, 7, 8 o 9</span>';
            this.classList.remove('border-green-400', 'border-yellow-400');
            this.classList.add('border-red-400');
            this.setCustomValidity('\u2717 Tel\xE9fono inv\xE1lido.');
        }
        }
        
        if (phoneInput.length > 9) {
        feedback.innerHTML = '<span class="text-red-400">\u2717 M\xE1ximo 9 d\xEDgitos</span>';
        this.classList.remove('border-green-400', 'border-yellow-400');
        this.classList.add('border-red-400');
        this.setCustomValidity('El tel\xE9fono no puede tener m\xE1s de 9 d\xEDgitos.');
        }
    });
    // Prevenir caracteres no num\xE9ricos en el tel\xE9fono
    document.getElementById('phone').addEventListener('keypress', function(e) {
        const isNumber = /[0-9]/.test(e.key);
        const isControlKey = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight', 'Clear', 'Copy', 'Paste'].includes(e.key);
        
        if (!isNumber && !isControlKey) {
        e.preventDefault();
        }
    });
<\/script>`])), maybeRenderHead());
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/ui/phone-input.astro", void 0);

export { $$Input as $, $$PhoneInput as a, $$DNIInput as b };
