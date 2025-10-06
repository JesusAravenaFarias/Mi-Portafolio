document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement; // Accede a la etiqueta <html>
    const logoLight = document.getElementById('logo-light');
    const logoDark = document.getElementById('logo-dark');

    // 1. Función para aplicar el tema y actualizar el logo
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
        updateLogo(theme);
    }

    // 2. Función para actualizar el icono del botón (sol/luna)
    function updateToggleIcon(currentTheme) {
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Mostrar sol para cambiar a claro
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Mostrar luna para cambiar a oscuro
        }
    }

    // 3. Función para cambiar la visibilidad del logo
    function updateLogo(currentTheme) {
        // Removemos la clase 'active-logo' de ambos por seguridad
        logoLight.classList.remove('active-logo');
        logoDark.classList.remove('active-logo');
        
        // Agregamos la clase al logo que corresponde al tema
        if (currentTheme === 'dark') {
            logoDark.classList.add('active-logo'); // Muestra el logo para fondo oscuro (logo claro)
        } else {
            logoLight.classList.add('active-logo'); // Muestra el logo para fondo claro (logo oscuro)
        }
    }

    // 4. Cargar el tema al inicio (Prioridad: Guardado > Sistema > Default)
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); 
    }

    // 5. Manejar el click del botón
    themeToggle.addEventListener('click', () => {
        let currentTheme = html.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });
});
