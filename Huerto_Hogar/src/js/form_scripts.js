// ===================== VALIDACIONES =====================

// Validar password coincidente
function validarPassword() {
    let psw = document.getElementById("pass").value;
    let rpw = document.getElementById("repass").value;

    if (psw === rpw) {
        document.getElementById("passcheck").textContent = "";
        return true;
    } else {
        document.getElementById("passcheck").textContent = "Las contraseñas no coinciden";
        return false;
    }
}

// Validar y formatear RUT
function validarYFormatearRUT() {
    const input = document.getElementById("rut");
    let rut = input.value.replace(/[^0-9kK]/g, '').toUpperCase();

    if (rut.length < 2) {
        marcarInvalido(input, "Ingrese un RUT válido");
        return;
    }

    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);

    // Formatear el cuerpo con puntos
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const rutFormateado = `${cuerpo}-${dv}`;
    input.value = rutFormateado;

    // Validar RUT
    if (!validarRUN(cuerpo.replace(/\./g, ""), dv)) {
        marcarInvalido(input, "RUT inválido");
    } else {
        marcarValido(input);
    }
}

function validarRUN(cuerpo, dv) {
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvFinal = "";

    if (dvEsperado === 11) dvFinal = "0";
    else if (dvEsperado === 10) dvFinal = "K";
    else dvFinal = dvEsperado.toString();

    return dv === dvFinal;
}

function marcarValido(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}

function marcarInvalido(input, mensaje = "") {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    const feedback = input.nextElementSibling?.nextElementSibling;
    if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = mensaje;
    }
}

// ===================== NAVBAR =====================

// Verificamos si el usuario ya está logueado en localStorage
let loggedIn = localStorage.getItem("loggedIn");

// Referencias al DOM
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const profileMenu = document.getElementById("profile-menu");
const logoutBtn = document.getElementById("logout-btn");

// Función que actualiza el navbar
function updateNavbar() {
    if (loggedIn === "true") {
        loginLink.style.display = "none";
        registerLink.style.display = "none";
        profileMenu.style.display = "block";
    } else {
        loginLink.style.display = "block";
        registerLink.style.display = "block";
        profileMenu.style.display = "none";
    }
}

// Evento de cerrar sesión
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.setItem("loggedIn", "false");
        loggedIn = "false";
        updateNavbar();
        alert("Cerraste sesión");
    });
}

// Inicializar navbar
updateNavbar();

// ===================== REGISTRO =====================

// Función para validar correos específicos
function validarCorreo(inputElement) {
    const valor = inputElement.value.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (regex.test(valor)) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        return true;
    } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        return false;
    }
}

function guardarTipoUsuario(correo) {
    if (correo.endsWith("@profesor.duoc.cl")) {
        localStorage.setItem("tipoUsuario", "admin");
    } else {
        localStorage.setItem("tipoUsuario", "cliente");
    }
}

function actualizarPerfilLink() {
    const perfilLink = document.getElementById("perfil-link");
    const tipo = localStorage.getItem("tipoUsuario");

    if (!perfilLink || !tipo) return;

    if (tipo === "admin") {
        perfilLink.href = "admin.html";
    } else {
        perfilLink.href = "perfil.html"; // cliente
    }
}


// Registro
const formRegistro = document.getElementById("register-form");
if (formRegistro) {
    formRegistro.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = document.getElementById("user").value;
        const correoInput = document.getElementById("correo");
        const pass = document.getElementById("pass");
        const repass = document.getElementById("repass");

        const correoValido = validarCorreo(correoInput);
        const passValido = validarPassword();

        if (correoValido && passValido) {
            alert("Usuario registrado, Bienvenido " + user);
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", correoInput.value);
            guardarTipoUsuario(correoInput.value);
            if (correoInput.value.endsWith("@profesor.duoc.cl")) {
                window.location.href = "admin.html";
            } else {
                window.location.href = "index.html";
            }
        } else if (!correoValido){
            alert("Correo inválido 😅");
            return;
        }
    });

    // Validar correo al perder el foco
    const correoInput = document.getElementById("correo");
    correoInput.addEventListener("blur", () => validarCorreo(correoInput));
}

// ===================== LOGIN =====================

function logearUsuario(e) {
    e.preventDefault();
    const user = document.getElementById("user2").value;
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", user);
    alert("Inicio de sesión exitoso, Bienvenido " + user);
    actualizarPerfilLink();
    if (correoInput.value.endsWith("@profesor.duoc.cl")) {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
}

const loginForm = document.getElementById("log-form");
if (loginForm) {
    loginForm.addEventListener("submit", logearUsuario);
}

// LOGIN CON VALIDACION DE CORREO
function logearUsuario(e) {
    e.preventDefault();

    const correoInput = document.getElementById("correo-login");
    const passInput = document.getElementById("pass2"); // opcional, solo visual
    const correoValido = validarCorreo(correoInput);

    if (!correoValido) {
        alert("Correo inválido 😅");
        return;
    }

    // Simulación de login exitoso
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", correoInput.value);
    alert("Inicio de sesión exitoso, Bienvenido " + correoInput.value);
    if (correoInput.value.endsWith("@profesor.duoc.cl")) {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
}

// Captura del formulario de login
const loginForm2 = document.getElementById("log-form");
if (loginForm) {
    loginForm.addEventListener("submit", logearUsuario);
}
document.addEventListener("DOMContentLoaded", actualizarPerfilLink);