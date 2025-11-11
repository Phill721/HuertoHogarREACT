export function AboutUs() {
    return (
        <>
            <div>
                {/* Sección Nosotros */}
                <div className="container-fluid p-4 mb-5" style={{ backgroundColor: '#2E8B57', color: 'white' }}>
                    <h1 className="text-center">Nosotros</h1>
                </div>
                {/* Misión */}
                <div className="row justify-content-center text-center mb-5">
                    <div className="col-md-8">
                        <h3 style={{ color: '#2E8B57' }}>Misión</h3>
                        <p>
                            Nuestra misión es proporcionar productos frescos y de calidad directamente desde el campo hasta
                            la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos
                            comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores
                            locales, apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en
                            todos los hogares chilenos.
                        </p>
                    </div>
                </div>
                {/* Misión */}
                <div className="row justify-content-center text-center mb-5">
                    <div className="col-md-8">
                        <h3 style={{ color: '#2E8B57' }}>Visión</h3>
                        <p>
                            Nuestra visión es ser la tienda online líder en la distribución de productos frescos y naturales en
                            Chile, reconocida por nuestra calidad excepcional, servicio al cliente y compromiso con la
                            sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional e internacional,
                            estableciendo un nuevo estándar en la distribución de productos agrícolas directos del productor al
                            consumidor.
                        </p>
                    </div>
                </div>
                {/* Banner final */}
                <div className="container-fluid p-0 position-relative">
                    <img src="/bannernosotros.jpg" alt="Huerto Hogar - Nosotros" className="w-100 banner-final-img" />
                </div>
            </div>
        </>
    )
}