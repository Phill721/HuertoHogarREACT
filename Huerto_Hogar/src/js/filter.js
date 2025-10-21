document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".category-btn");
    const products = document.querySelectorAll(".row.p-1 .col-md-3");
    const noProductsMsg = document.getElementById("no-products");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            let found = false;

            products.forEach(product => {
                if (product.id.startsWith(category)) {
                    product.style.display = "block";
                    found = true;
                } else {
                    product.style.display = "none";
                }
            });

            // Mostrar mensaje si no se encontró nada
            if (!found) {
                noProductsMsg.style.display = "block";
            } else {
                noProductsMsg.style.display = "none";
            }
        });
    });
    function filterByCategory(category) {
        let found = false;

        products.forEach(product => {
            if (product.id.startsWith(category)) {
                product.style.display = "block";
                found = true;
            } else {
                product.style.display = "none";
            }
        });

        noProductsMsg.style.display = found ? "none" : "block";
    }

    // Eventos para los botones
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            filterByCategory(category);
        });
    });

    // Detectar si la URL trae un parámetro ?category=
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");

    if (categoryParam) {
        filterByCategory(categoryParam);
    }
});