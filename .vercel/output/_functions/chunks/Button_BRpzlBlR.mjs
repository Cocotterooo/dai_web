import { c as createComponent, b as createAstro, m as maybeRenderHead, f as addAttribute, h as renderSlot, a as renderTemplate } from './astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    onClick
  } = Astro2.props;
  const baseClasses = "font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-dai hover:bg-azul-brillante text-white focus:ring-dai transform hover:-translate-y-0.5 cursor-pointer",
    secondary: "bg-white/20 hover:bg-white/30 text-white border border-white/30 focus:ring-white/50 cursor-pointer",
    ghost: "text-dai hover:text-azul-brillante hover:bg-white/10 focus:ring-dai/50 cursor-pointer"
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(type, "type")}${addAttribute(`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`, "class")}${addAttribute(disabled, "disabled")}${addAttribute(onClick, "onclick")}> ${renderSlot($$result, $$slots["default"])} </button>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/ui/Button.astro", void 0);

export { $$Button as $ };
