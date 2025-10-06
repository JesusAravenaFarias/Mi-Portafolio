document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement; 
    // logoDark: AHORA es el ID del logo con color oscuro (necesario para el tema CLARO)
    const logoDark = document.getElementById('logo-dark');   
    // logoLight: AHORA es el ID del logo con color claro (necesario para el tema OSCURO)
    const logoLight = document.getElementById('logo-light'); 

    /**
     * Aplica el tema seleccionado al HTML, guarda la preferencia y actualiza UI.
     * @param {string} theme - 'light' o 'dark'.
     */
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
        updateLogo(theme);
    }

    /**
     * Actualiza el ícono del botón (sol o luna) basado en el tema actual.
     * @param {string} currentTheme - El tema actualmente activo.
     */
    function updateToggleIcon(currentTheme) {
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; 
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; 
        }
    }

    /**
     * Controla qué imagen de logo debe mostrarse para mantener el contraste.
     * La lógica se invierte porque los IDs del HTML fueron invertidos.
     * @param {string} currentTheme - El tema actualmente activo.
     */
    function updateLogo(currentTheme) {
        logoLight.classList.remove('active-logo');
        logoDark.classList.remove('active-logo');
        
        // Si el tema es OSCURO, mostramos el logo CLARO (logoLight)
        if (currentTheme === 'dark') {
            logoLight.classList.add('active-logo'); 
        } 
        // Si el tema es CLARO, mostramos el logo OSCURO (logoDark)
        else {
            logoDark.classList.add('active-logo'); 
        }
    }

    // --- Inicialización del Tema ---

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Prioridad: 1. Tema Guardado, 2. Preferencia del Sistema, 3. Default ('light')
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); 
    }

    // --- Event Listener ---
    
    themeToggle.addEventListener('click', () => {
        let currentTheme = html.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });
});
