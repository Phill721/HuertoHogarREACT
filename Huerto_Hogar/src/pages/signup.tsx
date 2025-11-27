import { useState, useContext } from "react";
import { useNavigate } from "react-router"; // 👈 import para navegar
import { ModalComponent } from "../components/modal.component";
import { Button, TextBox } from "../components/input.component";
import usuarioService from '../services/usuarioService';
import { UserContext } from '../context/UserContext';

export function SignUp() {
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [correoConfirm, setCorreoConfirm] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [contraseñaConfirm, setContraseñaConfirm] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const navigate = useNavigate(); // 👈 inicializa el hook
    const { login } = useContext(UserContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones básicas
        if (!nombre.trim() || !correo.trim() || !usuario.trim() || !contraseña.trim()) {
            setModalTitle("Error al enviar ❌");
            setModalMessage("Por favor completa todos los campos con datos válidos");
            setShowModal(true);
            return;
        }

        // Validación de dominios
        const validDomains = ["@gmail.com", "@duoc.cl", "@profesor.duoc.cl"];
        if (!validDomains.some(domain => correo.endsWith(domain))) {
            setModalTitle("Correo inválido ❌");
            setModalMessage("Solo se permiten correos de Gmail, Duoc o Profesor Duoc");
            setShowModal(true);
            return;
        }

        // Validación mínima de longitud de contraseña (5 caracteres)
        if (contraseña.length < 5) {
            setModalTitle("Contraseña inválida ❌");
            setModalMessage("La contraseña debe tener al menos 5 caracteres");
            setShowModal(true);
            return;
        }

        // Validación de confirmaciones
        if (correo !== correoConfirm) {
            setModalTitle("Error en correo ❌");
            setModalMessage("Los correos no coinciden");
            setShowModal(true);
            return;
        }

        if (contraseña !== contraseñaConfirm) {
            setModalTitle("Error en contraseña ❌");
            setModalMessage("Las contraseñas no coinciden");
            setShowModal(true);
            return;
        }

        try {
            // preparar payload para backend
            const payload = {
                nombre,
                email: correo,
                password: contraseña,
                rol: 'user',
                activo: true
            };

            // comprobar si existe usuario con ese email
            const all = await usuarioService.getAll();
            if (all.some((u: any) => (u.email || '').toLowerCase() === correo.toLowerCase())) {
                setModalTitle("Correo ya registrado ⚠️");
                setModalMessage("Ya existe una cuenta con este correo");
                setShowModal(true);
                return;
            }

            const created = await usuarioService.create(payload);

            // iniciar sesión localmente
            try {
                login(created.nombre || created.email || usuario, created.email || correo, created.rol || 'user');
            } catch (e) {
                // si no hay contexto, guardar currentUser en localStorage como respaldo
                localStorage.setItem('currentUser', JSON.stringify({ user: created.nombre || created.email || usuario, correo: created.email || correo, rol: created.rol || 'user' }));
            }

            // Mostrar modal de éxito
            setModalTitle("Registro exitoso ✅");
            setModalMessage("Tu usuario ha sido registrado correctamente");
            setShowModal(true);

            // Limpiar campos
            setNombre("");
            setUsuario("");
            setCorreo("");
            setCorreoConfirm("");
            setContraseña("");
            setContraseñaConfirm("");

            // 🔀 Redirección según dominio
            setTimeout(() => {
                if (correo.endsWith("@profesor.duoc.cl")) {
                    navigate("/admin"); // 👉 profesores van a /admin
                } else {
                    navigate("/"); // 👉 usuarios normales a la home
                }
            }, 1200);
        } catch (error) {
            console.error('Error registrando usuario:', error);
            setModalTitle('Error en el registro ❌');
            setModalMessage('Ocurrió un problema al registrar el usuario. Intenta de nuevo.');
            setShowModal(true);
        }

    };

    return (
        <>
            <div className="container my-5">
                {/* Título y logo arriba */}
                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: "#2E8B57" }}>
                        Huerto Hogar
                    </h2>
                    <img
                        src="/iconmain.png"
                        alt="Logo Huerto Hogar"
                        style={{ width: "80px" }}
                        className="rounded-pill"
                    />
                </div>

                {/* Contenedor del formulario */}
                <div className="d-flex justify-content-center">
                    <div
                        className="card shadow-lg p-4"
                        style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}
                    >
                        <h4 className="text-center mb-4" style={{ color: "#2E8B57" }}>
                            Registrarse
                        </h4>

                        <form onSubmit={handleSubmit}>
                            <TextBox
                                id="nombre"
                                label="Nombre"
                                name="Nombre Completo"
                                type="text"
                                placeholder="Escribe tu nombre completo"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />

                            <TextBox
                                id="usuario"
                                label="Usuario"
                                name="usuario"
                                type="text"
                                placeholder="Ingresa un nombre de usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />

                            <TextBox
                                id="correo"
                                label="Correo"
                                name="correo"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />

                            <TextBox
                                id="correo-confirm"
                                label="Confirma tu correo"
                                name="correo-confirm"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={correoConfirm}
                                onChange={(e) => setCorreoConfirm(e.target.value)}
                            />

                            <TextBox
                                id="contraseña"
                                label="Contraseña"
                                name="contraseña"
                                type="password"
                                placeholder="Ingresa una contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />

                            <TextBox
                                id="contraseña-confirm"
                                label="Confirma tu contraseña"
                                name="contraseña"
                                type="password"
                                placeholder="Ingresa una contraseña"
                                value={contraseñaConfirm}
                                onChange={(e) => setContraseñaConfirm(e.target.value)}
                            />

                            <Button
                                id="btnEnviar"
                                className="btn"
                                type="submit"
                                name="Registrarse"
                            />
                        </form>
                    </div>
                </div>
                <ModalComponent
                    title={modalTitle}
                    message={modalMessage}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                />
            </div>
        </>
    );
}
