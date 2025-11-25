package React.HuertoHogar.service;

import React.HuertoHogar.model.Venta;
import React.HuertoHogar.model.VentaItem;
import React.HuertoHogar.repository.VentaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;

    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }

    public List<Venta> findAll() {
        return ventaRepository.findAll();
    }

    public Venta findById(Long id) {
        return ventaRepository.findById(id).orElse(null);
    }

    public Venta save(Venta venta) {
        // asegurarse de que cada item tenga referencia a la venta
        if (venta.getItems() != null) {
            for (VentaItem item : venta.getItems()) {
                item.setVenta(venta);
            }
        }
        // calcular total
        double total = 0.0;
        if (venta.getItems() != null) {
            for (VentaItem item : venta.getItems()) {
                total += item.getPrecio() * item.getCantidad();
            }
        }
        venta.setTotal(total);
        return ventaRepository.save(venta);
    }

    public void delete(Long id) { ventaRepository.deleteById(id); }
}
