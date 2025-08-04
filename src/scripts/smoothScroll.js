/**
 * Smooth scroll utility with navbar offset consideration
 */

/**
 * Scrolls smoothly to a target element with proper offset calculation
 * @param {string} targetSelector - CSS selector for the target element
 * @param {number} customOffset - Additional offset in pixels (optional)
 */
export function scrollToSection(targetSelector, customOffset = 24) {
    const targetElement = document.querySelector(targetSelector);
    
    if (!targetElement) {
        console.warn(`Target element not found: ${targetSelector}`);
        return;
    }
    
    // Get navbar height dynamically in case it changes
    const navbar = document.querySelector('header[class*="fixed"]');
    const navbarHeight = navbar ? navbar.offsetHeight : 56; // fallback to 56px (3.5rem)
    
    const totalOffset = navbarHeight + customOffset;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - totalOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
    });
}

/**
 * Initialize smooth scroll for elements with data-scroll-target attribute
 */
export function initSmoothScroll() {
    const scrollTriggers = document.querySelectorAll('[data-scroll-target]');
    
    scrollTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = trigger.getAttribute('data-scroll-target');
            const customOffset = parseInt(trigger.getAttribute('data-scroll-offset')) || 24;
            
            if (target) {
                scrollToSection(target, customOffset);
            }
        });
    });
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSmoothScroll);
