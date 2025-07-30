/* Mobile Device Detection and Optimizations */

/* Detect and optimize for mobile devices */
const MobileOptimizations = {
  // Check if device is mobile
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Check if device supports touch
  isTouch: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  // Optimize viewport for mobile
  optimizeViewport: () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, viewport-fit=cover'
      );
    }
  },

  // Prevent iOS zoom on input focus
  preventInputZoom: () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (input.style.fontSize !== '16px') {
          input.style.fontSize = '16px';
        }
      });
    }
  },

  // Add touch-friendly classes
  addTouchClasses: () => {
    if (MobileOptimizations.isTouch()) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.add('no-touch');
    }

    if (MobileOptimizations.isMobile()) {
      document.body.classList.add('mobile-device');
    }
  },

  // Optimize scroll behavior for mobile
  optimizeScrolling: () => {
    // Smooth scrolling for mobile
    if (MobileOptimizations.isMobile()) {
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Prevent overscroll bounce on iOS
      document.body.style.overscrollBehavior = 'none';
    }
  },

  // Initialize all mobile optimizations
  init: () => {
    MobileOptimizations.optimizeViewport();
    MobileOptimizations.addTouchClasses();
    MobileOptimizations.optimizeScrolling();
    
    // Run on DOM content loaded
    document.addEventListener('DOMContentLoaded', () => {
      MobileOptimizations.preventInputZoom();
    });

    // Re-run on window resize (orientation change)
    window.addEventListener('resize', () => {
      setTimeout(() => {
        MobileOptimizations.preventInputZoom();
      }, 500);
    });
  }
};

// Auto-initialize mobile optimizations
MobileOptimizations.init();

export default MobileOptimizations;
