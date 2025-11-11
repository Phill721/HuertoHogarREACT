import { MainBlog } from "../components/blog.component";
import { BlogPosts } from "../components/blog.component";

export function Blogs() {
    return (
        <>
            {/* Bloques de blogs principales */}
            <div className="container my-4">
                <div className="row g-4">
                    <MainBlog
                        imagen="/blog1.jpg"
                        titulo="Alimentación Saludable"
                        descripcion="Descubre cómo incorporar más frutas y verduras en tu dieta diaria, disfrutando de todo su sabor
                            y beneficios para tu salud."
                        link="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
                    />
                    <MainBlog
                        imagen="/blog2.webp"
                        titulo="Sostenibilidad"
                        descripcion="Adopta un estilo de vida más sostenible con pequeñas acciones que generan un gran impacto en el
                            planeta."
                        link="https://images7.memedroid.com/images/UPLOADED293/614398d290f70.jpeg"
                    />
                    <MainBlog
                        imagen="/blog3.jpg"
                        titulo="Recetas"
                        descripcion="Explora recetas saludables y transforma ingredientes frescos en platos llenos de sabor y
                            nutrición."
                        link="https://www.youtube.com/watch?v=A51XH7C8Xv0"
                    />
                </div>
            </div>

            {/* Sección de posts creados por usuarios */}
            <BlogPosts />
        </>
    );
}
