import { useState, useContext } from "react";
import { useNavigate } from "react-router"; // 👈 import para navegar
import { ModalComponent } from "../components/modal.component";
import { Button, TextBox } from "../components/input.component";
import { UserContext } from "../context/UserContext"; // 👈 import del contexto

export function Login() {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const navigate = useNavigate(); // 👈 inicializa el hook
    const { login } = useContext(UserContext); // 👈 obtiene la función login del contexto

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!correo.trim() || !contraseña.trim()) {
            setModalTitle("Campos vacíos ❌");
            setModalMessage("Por favor completa todos los campos.");
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

        // Obtener todos los usuarios registrados
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Buscar coincidencia
        const foundUser = users.find(
            (user: any) => user.correo === correo && user.contraseña === contraseña
        );

        if (!foundUser) {
            setModalTitle("Error de inicio de sesión ❌");
            setModalMessage("Correo o contraseña incorrectos.");
            setShowModal(true);
            return;
        }

        // ✅ Guardar usuario actual usando el contexto (si existe rol en el registro, usarlo)
        login(foundUser.nombre, foundUser.correo, foundUser.rol ?? 'user');

        // Mostrar modal de éxito
        setModalTitle("Bienvenido 🌿");
        setModalMessage(`Hola ${foundUser.nombre}, has iniciado sesión correctamente`);
        setShowModal(true);

        // Limpiar campos
        setCorreo("");
        setContraseña("");

        // Redirigir después de un pequeño delay
        // 🔀 Redirección según dominio
        setTimeout(() => {
            // Redirigir a admin si el correo pertenece al dominio de profesores o el usuario tiene rol 'admin'
            const isDomainAdmin = correo.endsWith("@profesor.duoc.cl");
            const isRoleAdmin = (foundUser.rol && foundUser.rol === 'admin');
            if (isDomainAdmin || isRoleAdmin) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }, 1500);

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
