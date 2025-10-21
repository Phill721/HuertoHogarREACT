// Recuperar posts guardados en localStorage
let posts = JSON.parse(localStorage.getItem("posts")) || [];

const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");

function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
        const postCard = document.createElement("div");
        postCard.className = "col-12 col-md-6";
        postCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${post.titulo}</h5>
          <p class="card-text">${post.contenido}</p>
          <hr>
          <div>
            <h6>Comentarios</h6>
            <ul class="list-unstyled" id="comentarios-${index}">
              ${post.comentarios.map(c => `<li class="border rounded p-2 my-1">${c}</li>`).join("")}
            </ul>
            <form onsubmit="addComment(event, ${index})" class="d-flex mt-2">
              <input type="text" class="form-control me-2" id="inputComentario-${index}" placeholder="Escribe un comentario" required>
              <button class="btn btn-sm" style="background-color:#2E8B57;color:white;">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    `;
        postsContainer.appendChild(postCard);
    });
}

function addComment(e, index) {
    e.preventDefault();
    const input = document.getElementById(`inputComentario-${index}`);
    const comentario = input.value.trim();
    if (comentario) {
        posts[index].comentarios.push(comentario);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    }
}

postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const contenido = document.getElementById("contenido").value.trim();
    if (titulo && contenido) {
        posts.unshift({ titulo, contenido, comentarios: [] });
        localStorage.setItem("posts", JSON.stringify(posts));
        postForm.reset();
        renderPosts();
    }
});

// Inicializar renderizado
renderPosts();
