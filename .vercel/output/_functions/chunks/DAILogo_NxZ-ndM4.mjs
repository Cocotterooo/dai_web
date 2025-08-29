import { c as createComponent, b as createAstro, m as maybeRenderHead, f as addAttribute, a as renderTemplate } from './astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$DAILogo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DAILogo;
  const { size = "md", className = "" } = Astro2.props;
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-16 w-auto",
    lg: "h-24 w-auto"
  };
  return renderTemplate`${maybeRenderHead()}<img src="/Símbolo_DAI_texto.png" alt="Delegación de Alumnado de Industriales - Logo"${addAttribute(`${sizeClasses[size]} ${className}`, "class")} loading="lazy">`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/common/DAILogo.astro", void 0);

export { $$DAILogo as $ };
