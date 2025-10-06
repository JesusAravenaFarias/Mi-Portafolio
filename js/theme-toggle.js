// Si ves este mensaje en la Consola (F12) de tu navegador, el script está cargando.
console.log("Script de Theme Toggle cargado correctamente.");

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement; // Accede a la etiqueta <html>

    // 1. Cargar el tema guardado o el preferido por el sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateToggleIcon(savedTheme);
    } else if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
        updateToggleIcon('dark');
    } else {
        // Si no hay preferencia guardada ni del sistema, se asume light (definido en HTML)
        updateToggleIcon('light'); 
    }

    // 2. Función para actualizar el icono del botón
    function updateToggleIcon(currentTheme) {
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Mostrar sol para cambiar a claro
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Mostrar luna para cambiar a oscuro
        }
    }

    // 3. Manejar el click del botón
    themeToggle.addEventListener('click', () => {
        let currentTheme = html.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Guardar preferencia
        updateToggleIcon(newTheme); // Actualizar icono
    });
});
