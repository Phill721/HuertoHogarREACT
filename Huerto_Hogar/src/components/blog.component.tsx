import { Link } from "react-router";
import { nodeco } from "./navbar.component";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

interface PropsMainBlog {
    imagen: string;
    titulo: string;
    descripcion: string;
    link: string;
}

export function MainBlog({ imagen, titulo, descripcion, link }: PropsMainBlog) {
    return (
        <div className="col-12 col-lg-4">
            <div className="card h-100 shadow-sm bg-success text-white d-flex flex-column">
                <img src={imagen} className="card-img-top" alt={titulo} />
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="card-title">{titulo}</h5>
                        <p className="card-text small mb-4">{descripcion}</p>
                    </div>
                    <Link
                        to={link}
                        style={nodeco}
                        className="btn btn-outline-light btn-sm w-100 mt-auto"
                    >
                        Ver más
                    </Link>
                </div>
            </div>
        </div>
    );
}

interface Comentario {
    autor: string;
    texto: string;
}

interface Post {
    titulo: string;
    contenido: string;
    autor: string;
    comentarios: Comentario[];
}

const STORAGE_KEY = "posts";

export function BlogPosts() {
    const { currentUser } = useContext(UserContext);

    // 🧠 Inicializa desde localStorage directamente (evita sobreescritura con [])
    const [posts, setPosts] = useState<Post[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch {
            console.warn("Error leyendo posts del localStorage, se reinicia.");
        }
        return [];
    });

    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");

    // 🔹 Guarda en localStorage cada vez que cambian los posts
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        } catch (err) {
            console.error("Error guardando posts en localStorage:", err);
        }
    }, [posts]);

    // 🔹 Sincroniza con otras pestañas
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                try {
                    const value = e.newValue;
                    if (value) {
                        const parsed = JSON.parse(value);
                        setPosts(Array.isArray(parsed) ? parsed : []);
                    } else {
                        setPosts([]);
                    }
                } catch (err) {
                    console.error("Error parsing posts desde otra pestaña:", err);
                }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Debes iniciar sesión para publicar un post.");
            return;
        }
        if (titulo.trim() === "" || contenido.trim() === "") return;

        const nuevoPost: Post = {
            titulo,
            contenido,
            autor: currentUser.user,
            comentarios: [],
        };

        setPosts((prev) => [nuevoPost, ...prev]);
        setTitulo("");
        setContenido("");
    };

    const handleComment = (index: number, texto: string) => {
        if (!currentUser) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }
        if (texto.trim() === "") return;

        setPosts((prev) => {
            const nuevos = [...prev];
            nuevos[index] = {
                ...nuevos[index],
                comentarios: [
                    { autor: currentUser.user, texto },
                    ...nuevos[index].comentarios,
                ],
            };
            return nuevos;
        });
    };

    return (
        <>
            {/* Formulario para crear post */}
            <div className="container my-4">
                <h2 className="text-center mb-3">Crea tu post</h2>
                <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="form-control"
                            required
                            disabled={!currentUser}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contenido</label>
                        <textarea
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            className="form-control"
                            rows={3}
                            required
                            disabled={!currentUser}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: "#2E8B57", color: "white" }}
                        disabled={!currentUser}
                    >
                        {currentUser ? "Publicar" : "Inicia sesión para publicar"}
                    </button>
                </form>
            </div>

            {/* Sección de posts */}
            <div className="container my-4">
                <h3 className="text-center">Últimos Posts</h3>
                <div className="row g-3 mt-3">
                    {posts.length === 0 ? (
                        <p className="text-center text-muted">
                            No hay posts todavía 😅
                        </p>
                    ) : (
                        posts.map((post, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{post.titulo}</h5>
                                        <p className="card-text">{post.contenido}</p>
                                        <p className="text-muted small mb-2">
                                            <strong>Autor:</strong> {post.autor}
                                        </p>
                                        <hr />
                                        <h6 className="fw-bold">Comentarios</h6>
                                        <ul className="list-unstyled mb-2">
                                            {post.comentarios.length === 0 ? (
                                                <li className="text-muted small">
                                                    No hay comentarios todavía.
                                                </li>
                                            ) : (
                                                post.comentarios.map((coment, i) => (
                                                    <li key={i} className="mb-1">
                                                        <strong>{coment.autor}:</strong>{" "}
                                                        {coment.texto}
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                        {currentUser && (
                                            <CommentBox
                                                onComment={(texto) =>
                                                    handleComment(index, texto)
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

// Subcomponente para escribir comentarios
function CommentBox({ onComment }: { onComment: (texto: string) => void }) {
    const [texto, setTexto] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComment(texto);
        setTexto("");
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2">
            <textarea
                className="form-control mb-2"
                placeholder="Escribe un comentario..."
                rows={2}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                required
            ></textarea>
            <button
                type="submit"
                className="btn btn-sm w-100"
                style={{ backgroundColor: "#2E8B57", color: "white" }}
            >
                Comentar
            </button>
        </form>
    );
}
