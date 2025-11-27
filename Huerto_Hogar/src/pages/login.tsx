import { useState, useContext } from "react";
import { useNavigate } from "react-router"; // 👈 import para navegar
import { ModalComponent } from "../components/modal.component";
import { Button, TextBox } from "../components/input.component";
import usuarioService from '../services/usuarioService';
import { UserContext } from "../context/UserContext"; // 👈 import del contexto

export function Login() {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const navigate = useNavigate(); // 👈 inicializa el hook
    const { login } = useContext(UserContext); // 👈 obtiene la función login del contexto

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!correo.trim() || !contraseña.trim()) {
            setModalTitle("Campos vacíos ❌");
            setModalMessage("Por favor completa todos los campos.");
            setShowModal(true);
            return;
        }

        // Validación mínima de longitud de contraseña (5 caracteres)
        if (contraseña.length < 5) {
            setModalTitle("Contraseña inválida ❌");
            setModalMessage("La contraseña debe tener al menos 5 caracteres.");
            setShowModal(true);
            return;
        }

        const validDomains = ["@gmail.com", "@duoc.cl", "@profesor.duoc.cl"];
        if (!validDomains.some(domain => correo.endsWith(domain))) {
            setModalTitle("Correo inválido ❌");
            setModalMessage("Solo se permiten correos de Gmail, Duoc o Profesor Duoc");
            setShowModal(true);
            return;
        }

        try {
            const foundUser = await usuarioService.login(correo, contraseña);
            // Guardar usuario actual usando el contexto (usar email del backend)
            login(foundUser.nombre || foundUser.email || correo, foundUser.email || correo, (foundUser.rol as any) ?? 'user');

            // Mostrar modal de éxito
            setModalTitle("Bienvenido 🌿");
            setModalMessage(`Hola ${foundUser.nombre || foundUser.email}, has iniciado sesión correctamente`);
            setShowModal(true);

            // Limpiar campos
            setCorreo("");
            setContraseña("");

            // Redirigir después de un pequeño delay
            setTimeout(() => {
                const isDomainAdmin = correo.endsWith("@profesor.duoc.cl");
                const isRoleAdmin = (foundUser.rol && foundUser.rol === 'admin');
                if (isDomainAdmin || isRoleAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }, 1500);
        } catch (err: any) {
            console.error('Login error', err);
            setModalTitle("Error de inicio de sesión ❌");
            if (err && err.message && err.message.includes('401')) {
                setModalMessage("Correo o contraseña incorrectos.");
            } else {
                setModalMessage("Ocurrió un error al conectar con el servidor.");
            }
            setShowModal(true);
            return;
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
                            Iniciar Sesión
                        </h4>

                        <form onSubmit={handleSubmit}>
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
                                id="contraseña"
                                label="Contraseña"
                                name="contraseña"
                                type="password"
                                placeholder="Ingresa una contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />

                            <Button
                                id="btnEnviar"
                                className="btn"
                                type="submit"
                                name="Iniciar Sesión"
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
