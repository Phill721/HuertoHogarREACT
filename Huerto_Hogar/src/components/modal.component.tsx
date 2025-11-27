import { ReactNode, useEffect } from "react";

interface ModalProps {
    title: string;
    message?: ReactNode;
    show: boolean;
    onClose: () => void;
    children?: ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

export function ModalComponent({ title, message, show, onClose, children, size = 'md' }: ModalProps) {
    useEffect(() => {
        if (show) document.body.classList.add("modal-open");
        else document.body.classList.remove("modal-open");
    }, [show]);

    if (!show) return null;

    return (
        <>
            <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                tabIndex={-1}
                role="dialog"
            >
                <div className={`modal-dialog modal-dialog-centered ${size === 'sm' ? 'modal-sm' : size === 'lg' ? 'modal-lg' : ''}`} role="document">
                    <div className="modal-content shadow-lg border-0">
                        <div
                            className="modal-header text-white"
                            style={{ backgroundColor: "#2E8B57" }}
                        >
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {message ? <div className="mb-0">{message}</div> : null}
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn"
                                style={{ backgroundColor: "#2E8B57", color: "white" }}
                                onClick={onClose}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
