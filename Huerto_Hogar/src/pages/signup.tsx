import { useState } from "react";
import { ModalComponent } from "../components/modal.component";
import { Button, TextBox } from "../components/input.component";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim() || !correo.trim() || !usuario.trim() || !contraseña.trim()) {
            setModalTitle("Error al enviar ❌");
            setModalMessage("Por favor completa todos los campos con datos validos");
            setShowModal(true);
            return;
        }
        // Modal de éxito
        setModalTitle("Mensaje enviado!");
        setModalMessage("Tu usuario ha sido registrado con exito!");
        setShowModal(true);
        // Limpiar formulario
        setNombre("");
        setUsuario("");
        setCorreo("");
        setCorreoConfirm("");
        setContraseña("");
        setContraseñaConfirm("");
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
                            {/* Campo Nombre Completo */}
                            <TextBox
                                id="nombre"
                                label="Nombre"
                                name="Nombre Completo"
                                type="text"
                                placeholder="Escribe tu nombre completo"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />

                            {/* Campo Nombre de usuario */}
                            <TextBox
                                id="usuario"
                                label="Usuario"
                                name="usuario"
                                type="text"
                                placeholder="Ingresa un nombre de usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />

                            {/* Campo Correo */}
                            <TextBox
                                id="correo"
                                label="Correo"
                                name="correo"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />

                            {/* Campo Correo confirmacion */}
                            <TextBox
                                id="correo-confirm"
                                label="Confirma tu correo"
                                name="correo-confirm"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={correoConfirm}
                                onChange={(e) => setCorreoConfirm(e.target.value)}
                            />

                            {/* Campo Contraseña */}
                            <TextBox
                                id="contraseña"
                                label="Contraseña"
                                name="contraseña"
                                type="password"
                                placeholder="Ingresa una contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />

                            {/* Campo Contraseña confirmacion */}
                            <TextBox
                                id="contraseña-confirm"
                                label="Confirma tu contraseña"
                                name="contraseña"
                                type="password"
                                placeholder="Ingresa una contraseña"
                                value={contraseñaConfirm}
                                onChange={(e) => setContraseñaConfirm(e.target.value)}
                            />

                            {/* Botón */}
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
    )
}