document.addEventListener("DOMContentLoaded", () => {
    // Simula el correo del usuario logueado (debería venir de login/registro)
    const loggedInEmail = localStorage.getItem("username");

    if (!loggedInEmail) {
        alert("No hay un usuario logueado. Redirigiendo al login...");
        window.location.href = "iniciosesion.html";
        return;
    }

    // Clave única por correo
    const storageKey = `profile_${loggedInEmail}`;

    // Obtener datos guardados del perfil
    let profile = JSON.parse(localStorage.getItem(storageKey)) || {
        email: loggedInEmail,
        username: "",
        password: ""
    };

    // Mostrar los datos en los inputs
    document.getElementById("profileEmail").value = profile.email;
    document.getElementById("profileUsername").value = profile.username || "";
    document.getElementById("profilePassword").value = "";

    // Guardar cambios
    document.getElementById("saveProfileBtn").addEventListener("click", () => {
        const username = document.getElementById("profileUsername").value.trim();
        const password = document.getElementById("profilePassword").value.trim();

        if (username) profile.username = username;
        if (password) profile.password = password; // simulado

        localStorage.setItem(storageKey, JSON.stringify(profile));

        alert("Perfil actualizado correctamente ✅");
        document.getElementById("profilePassword").value = ""; // limpiar campo
    });
});
