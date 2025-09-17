// Configuración de enlaces de redes sociales
const socialLinks = {
    whatsapp: "https://wa.me/573172154034", // Reemplaza con tu número de WhatsApp
    linkedin: "https://www.linkedin.com/in/juan-sebastian-lenis-acosta-877262382/", // Reemplaza con tu perfil de LinkedIn
    facebook: "https://www.facebook.com/sebastian.lenisacosta.5" // Reemplaza con tu perfil de Facebook
};

// Configuración de archivos CV
const cvFiles = {
    en: "cv-juan-sebastian-lenis-english.pdf", // Nombre del archivo CV en inglés
    es: "cv-juan-sebastian-lenis-español.pdf"  // Nombre del archivo CV en español
};

// Función para inicializar los enlaces de redes sociales
function initSocialLinks() {
    document.getElementById('whatsappBtn').href = socialLinks.whatsapp;
    document.getElementById('linkedinBtn').href = socialLinks.linkedin;
    document.getElementById('facebookBtn').href = socialLinks.facebook;
}

// Función para descargar CV
function downloadCV(language) {
    const fileName = cvFiles[language];
    
    // Crear un elemento de descarga temporal
    const link = document.createElement('a');
    link.href = fileName;
    link.download = fileName;
    link.style.display = 'none';
    
    // Agregar al DOM, hacer clic y remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar mensaje de descarga
    showDownloadMessage(language);
}

// Función para mostrar mensaje de descarga
function showDownloadMessage(language) {
    const message = language === 'en' 
        ? 'Descargando CV en inglés...' 
        : 'Descargando CV en español...';
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Mostrar notificación
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para agregar efectos de clic
function addClickEffects() {
    const buttons = document.querySelectorAll('.social-btn, .cv-item');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efecto de ondas
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Agregar animación de ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Función para animación de entrada
function animateOnLoad() {
    const elements = document.querySelectorAll('.social-btn, .cv-item');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSocialLinks();
    addClickEffects();
    animateOnLoad();
    
    // Agregar evento de clic para cambiar imagen de perfil
    document.getElementById('profileImage').addEventListener('click', changeProfileImage);
    
    // Mensaje de bienvenida en consola
    console.log('🚀 Página personal de Juan Sebastian Lenis Acosta cargada correctamente!');
});

// Función para validar enlaces antes de abrirlos
function validateAndOpenLink(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank');
    } else {
        console.warn('URL inválida:', url);
    }
}

// Agregar event listeners adicionales para mejorar la accesibilidad
document.addEventListener('DOMContentLoaded', function() {
    // Soporte para navegación por teclado
    const interactiveElements = document.querySelectorAll('.social-btn, .cv-item, .profile-image');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});