/**
 * Script para optimizar las View Transitions y hacerlas más rápidas
 * Este script se ejecuta para mejorar la experiencia de navegación
 */

// Verificar soporte para View Transitions
if (document.startViewTransition) {
    console.log('✅ View Transitions API soportada');
    
    // Interceptar navegación para optimizar transiciones
    document.addEventListener('astro:before-preparation', () => {
        console.log('🔄 Preparando view transition...');
    });
    
    document.addEventListener('astro:after-preparation', () => {
        console.log('✅ View transition preparada');
    });
    
    // Optimizar transiciones reduciendo la duración por defecto
    const style = document.createElement('style');
    style.textContent = `
        ::view-transition-old(*),
        ::view-transition-new(*) {
            animation-duration: 0.25s !important;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        ::view-transition-old(root),
        ::view-transition-new(root) {
            animation-duration: 0.2s !important;
        }
    `;
    document.head.appendChild(style);
    
} else {
    console.log('❌ View Transitions API no soportada');
    
    // Fallback para navegadores que no soportan View Transitions
    document.addEventListener('astro:page-load', () => {
        // Añadir clase temporal para animaciones de fallback
        document.body.classList.add('page-transition');
        setTimeout(() => {
            document.body.classList.remove('page-transition');
        }, 300);
    });
}

// Funciones de utilidad para view transitions
window.fastViewTransitions = {
    /**
     * Forzar una transición específica
     */
    forceTransition: (callback) => {
        if (document.startViewTransition) {
            document.startViewTransition(callback);
        } else {
            callback();
        }
    },
    
    /**
     * Configurar nombres de transición dinámicamente
     */
    setTransitionName: (element, name) => {
        if (element) {
            element.style.viewTransitionName = name;
        }
    },
    
    /**
     * Remover nombre de transición
     */
    clearTransitionName: (element) => {
        if (element) {
            element.style.viewTransitionName = 'none';
        }
    }
};

console.log('🚀 FastViewTransitions inicializado');
