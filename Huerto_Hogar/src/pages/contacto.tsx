import { useState } from "react";
import { ModalComponent } from "../components/modal.component";
import { Button, TextBox, TextField } from "../components/input.component";

export default function Contacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contenido, setContenido] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim() || !correo.trim() || !contenido.trim()) {
            setModalTitle("Error al enviar ❌");
            setModalMessage("Por favor completa todos los campos antes de enviar el mensaje.");
            setShowModal(true);
            return;
        }
        // Modal de éxito
        setModalTitle("Mensaje enviado!");
        setModalMessage("Tu mensaje fue enviado con éxito. ¡Gracias por contactarnos!");
        setShowModal(true);
        // Limpiar formulario
        setNombre("");
        setCorreo("");
        setContenido("");
    };

    return (
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
                        Contáctanos
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

                        {/* Campo Contenido */}
                        <TextField
                        id="contenido"
                        label="Contenido"
                        name="contenido"
                        rows={4}
                        placeholder="Escribe tu mensaje aqui"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        />

                        {/* Botón */}
                        <Button
                        id="btnEnviar"
                        className="btn"
                        type="submit"
                        name="Enviar Mensaje"
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
    );
}
