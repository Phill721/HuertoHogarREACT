package React.HuertoHogar.config;

import React.HuertoHogar.model.Producto;
import React.HuertoHogar.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductoRepository productoRepository;

    public DataInitializer(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        long count = productoRepository.count();
        System.out.println("[DataInitializer] productos en DB: " + count);
        if (count == 0) {
            System.out.println("[DataInitializer] insertando productos de ejemplo...");
            Producto p1 = new Producto();
            p1.setNombre("Lechuga Hidropónica");
            p1.setCategoria("verduras");
            p1.setPrecio(990.0);
            p1.setStock(30);
            p1.setDescripcion("Lechuga fresca cultivada en sistema hidropónico");
            p1.setActivo(true);

            Producto p2 = new Producto();
            p2.setNombre("Tomate Orgánico");
            p2.setCategoria("verduras");
            p2.setPrecio(1290.0);
            p2.setStock(25);
            p2.setDescripcion("Tomates orgánicos cultivados sin pesticidas");
            p2.setActivo(true);

            productoRepository.saveAll(List.of(p1, p2));
            System.out.println("[DataInitializer] productos guardados.");
        } else {
            System.out.println("[DataInitializer] no se requieren inserciones.");
        }

        // Mostrar tablas existentes (consultando el repositorio para forzar inicialización)
        try {
            productoRepository.findAll().forEach(p -> {});
            System.out.println("[DataInitializer] findAll ejecutado correctamente.");
        } catch (Exception ex) {
            System.err.println("[DataInitializer] error al ejecutar findAll: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}
