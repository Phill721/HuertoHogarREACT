export function CardComponent(){
    return(
        <>
            <div className="col-md-4 col-sm-6 col-12 d-flex">
                <div className="card m-1 rounded h-100 w-100">
                    <img className="card-img-top" src="img/fruit3.jpg" alt="Card image" />
                    <div className="card-body d-flex flex-column">
                        <h4 className="card-title main-text">Plátanos Cavendish</h4>
                        <p className="card-text main-text">Plátanos maduros y dulces, perfectos para desayuno o snack energético.
                            Ricos en potasio y vitaminas.</p>
                        <a href="platanos.html" className="btn mt-auto main-text btn-buy">Comprar: $800 por KG</a>
                    </div>
                </div>
            </div>
        </>
    )
}