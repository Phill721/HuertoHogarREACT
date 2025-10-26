import { useEffect, useState, useRef } from "react";

interface Review {
    name: string;
    rating: number;
    text: string;
}

interface ReviewSectionProps {
    productId: string;
}

export function ReviewSection({ productId }: ReviewSectionProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState("");
    const [rating, setRating] = useState<number | "">("");
    const [text, setText] = useState("");

    // 🔹 este ref evita que se guarde en el primer render
    const isInitialLoad = useRef(true);

    // Cargar reseñas guardadas
    useEffect(() => {
        const stored = localStorage.getItem(`reviews-${productId}`);
        if (stored) {
            setReviews(JSON.parse(stored));
        }
    }, [productId]);

    // Guardar reseñas después del primer render
    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return;
        }
        localStorage.setItem(`reviews-${productId}`, JSON.stringify(reviews));
    }, [reviews, productId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !rating || !text.trim()) return;

        const newReview: Review = {
            name: name.trim(),
            rating: Number(rating),
            text: text.trim(),
        };

        setReviews((prev) => [newReview, ...prev]);
        setName("");
        setRating("");
        setText("");
    };

    return (
        <div className="container my-5">
            <h4 className="mb-3">Reseñas de clientes</h4>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label htmlFor="reviewName" className="form-label">Tu nombre</label>
                    <input
                        id="reviewName"
                        className="form-control"
                        placeholder="Escribe tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="reviewRating" className="form-label">Calificación</label>
                    <select
                        id="reviewRating"
                        className="form-select"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    >
                        <option value="" disabled>Elige...</option>
                        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                        <option value="4">⭐⭐⭐⭐ (4)</option>
                        <option value="3">⭐⭐⭐ (3)</option>
                        <option value="2">⭐⭐ (2)</option>
                        <option value="1">⭐ (1)</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="reviewText" className="form-label">Comentario</label>
                    <textarea
                        id="reviewText"
                        className="form-control"
                        rows={3}
                        placeholder="Escribe tu reseña"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Enviar reseña
                </button>
            </form>

            {/* Lista de reseñas */}
            <div className="list-group">
                {reviews.length > 0 ? (
                    reviews.map((r, i) => (
                        <div key={i} className="list-group-item">
                            <h6 className="mb-1">
                                {r.name} — {"⭐".repeat(r.rating)}
                            </h6>
                            <p className="mb-0">{r.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">Aún no hay reseñas, sé el primero 😎</p>
                )}
            </div>
        </div>
    );
}