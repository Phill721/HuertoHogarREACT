import { ProductosGrid } from "../components/productgrid.components";
import { productos } from "../data/Productos";

export function Home(){
    return(
        <>
            <div className="container-fluid my-2">
                <div className="p-5 rounded" style={{ backgroundColor: '#2E8B57', color: 'white' }}>
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <h3>Desde nuestro Huerto Hogar para ti</h3>
                            <p style={{ fontSize: '0.95rem' }}>
                                HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo
                                directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos
                                en más de 9 puntos del país, incluyendo Santiago, Puerto Montt, Villarica, Nacimiento, Viña del Mar,
                                Valparaíso y Concepción. Promovemos un estilo de vida saludable y sostenible.
                            </p>
                            <a href="productos.html" className="btn btn-outline-light me-2 mb-2">Ver productos</a>
                        </div>
                        <div className="col-md-5 text-center">
                            <img src="/banner1.jpeg" className="img-fluid rounded shadow" alt="Huerto Hogar" style={{ maxHeight: 300, objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </div>
            {/*Banner separador */}
            <div className="container-fluid my-5">
                <div className="p-3" style={{ backgroundColor: '#2E8B57', color: 'white' }}>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Productos más comprados!</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row p-3">
                <ProductosGrid productos={productos.slice(0,3)}/>
            </div>
        </>
    )
}