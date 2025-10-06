document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement; 
    const logoLight = document.getElementById('logo-light'); // Logo con colores oscuros (para fondo claro)
    const logoDark = document.getElementById('logo-dark');   // Logo con colores claros (para fondo oscuro)

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
        // Muestra el icono opuesto al tema activo, sugiriendo el cambio.
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; 
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; 
        }
    }

    /**
     * Controla qué imagen de logo debe mostrarse para mantener el contraste.
     * @param {string} currentTheme - El tema actualmente activo.
     */
    function updateLogo(currentTheme) {
        // Remueve la clase activa de ambos logos para asegurar un solo visible.
        logoLight.classList.remove('active-logo');
        logoDark.classList.remove('active-logo');
        
        // La lógica se invierte para garantizar el contraste:
        // Fondo oscuro (dark) necesita el logo claro (logoDark).
        if (currentTheme === 'dark') {
            logoDark.classList.add('active-logo'); 
        } 
        // Fondo claro (light) necesita el logo oscuro (logoLight).
        else {
            logoLight.classList.add('active-logo'); 
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
