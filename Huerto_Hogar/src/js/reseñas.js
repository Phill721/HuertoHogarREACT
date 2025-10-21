document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");

    // Obtener el producto actual desde el atributo data-product
    const productId = form.getAttribute("data-product");
    const storageKey = `reviews_${productId}`;

    // Cargar reseñas guardadas de este producto
    let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];

    function renderReviews() {
        reviewsList.innerHTML = "";
        reviews.forEach(r => {
            const item = document.createElement("div");
            item.className = "list-group-item";
            item.innerHTML = `
        <h6 class="mb-1">${r.name} - ${"⭐".repeat(r.rating)}</h6>
        <p class="mb-0">${r.text}</p>
      `;
            reviewsList.prepend(item); // últimas reseñas arriba
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("reviewName").value.trim();
        const rating = parseInt(document.getElementById("reviewRating").value);
        const text = document.getElementById("reviewText").value.trim();

        if (name && rating && text) {
            const newReview = { name, rating, text };
            reviews.push(newReview);
            localStorage.setItem(storageKey, JSON.stringify(reviews));
            renderReviews();
            form.reset();
        }
    });

    renderReviews();
});
