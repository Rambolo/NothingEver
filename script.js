// Mouse tracking for parallax effect
let mouseX = 0;
let mouseY = 0;

// Track mouse movement
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Apply parallax effect to floating text elements
    const floatingTexts = document.querySelectorAll('.floating-text');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    floatingTexts.forEach(text => {
        const speed = parseFloat(text.dataset.speed) || 0.5;
        const deltaX = (mouseX - centerX) * speed * 0.02;
        const deltaY = (mouseY - centerY) * speed * 0.02;
        
        text.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
});

// Enhanced ash particle interactions
document.addEventListener('DOMContentLoaded', function() {
    const ashParticles = document.querySelectorAll('.ash-particle');
    
    // Add subtle mouse interaction to ash particles
    document.addEventListener('mousemove', function(e) {
        ashParticles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - particleX, 2) + Math.pow(e.clientY - particleY, 2)
            );
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(particleY - e.clientY, particleX - e.clientX);
                const moveX = Math.cos(angle) * force * 10;
                const moveY = Math.sin(angle) * force * 10;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.3})`;
                particle.style.opacity = Math.min(0.8, 0.3 + force * 0.5);
            } else {
                particle.style.transform = 'translate(0px, 0px) scale(1)';
                particle.style.opacity = '';
            }
        });
    });
});

// Smooth scroll prevention (maintain the floating effect)
document.addEventListener('wheel', function(e) {
    e.preventDefault();
}, { passive: false });

// Handle window resize
window.addEventListener('resize', function() {
    // Reset any transforms on resize to prevent layout issues
    const floatingTexts = document.querySelectorAll('.floating-text');
    floatingTexts.forEach(text => {
        text.style.transform = 'translate(0px, 0px)';
    });
});