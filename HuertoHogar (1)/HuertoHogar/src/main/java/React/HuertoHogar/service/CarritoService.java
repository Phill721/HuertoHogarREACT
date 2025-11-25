package React.HuertoHogar.service;

import React.HuertoHogar.model.*;
import React.HuertoHogar.repository.CarritoRepository;
import React.HuertoHogar.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final VentaService ventaService;

    public CarritoService(CarritoRepository carritoRepository, UsuarioRepository usuarioRepository, VentaService ventaService) {
        this.carritoRepository = carritoRepository;
        this.usuarioRepository = usuarioRepository;
        this.ventaService = ventaService;
    }

    public Carrito getOrCreateCart(Long usuarioId) {
        Optional<Carrito> opt = carritoRepository.findByUsuarioId(usuarioId);
        if (opt.isPresent()) return opt.get();

        Usuario u = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Carrito c = new Carrito();
        c.setUsuario(u);
        return carritoRepository.save(c);
    }

    public Carrito addItem(Long usuarioId, CarritoItem item) {
        Carrito c = getOrCreateCart(usuarioId);
        item.setCarrito(c);
        // si existe el mismo producto, incrementar cantidad
        for (CarritoItem ci : c.getItems()) {
            if (ci.getProductoId().equals(item.getProductoId())) {
                ci.setCantidad(ci.getCantidad() + item.getCantidad());
                return carritoRepository.save(c);
            }
        }
        c.getItems().add(item);
        return carritoRepository.save(c);
    }

    public Carrito clearCart(Long usuarioId) {
        Carrito c = getOrCreateCart(usuarioId);
        c.getItems().clear();
        return carritoRepository.save(c);
    }

    public void removeItem(Long usuarioId, Long itemId) {
        Carrito c = getOrCreateCart(usuarioId);
        c.getItems().removeIf(i -> i.getId().equals(itemId));
        carritoRepository.save(c);
    }

    public Venta checkout(Long usuarioId) {
        Carrito c = getOrCreateCart(usuarioId);
        Venta v = new Venta();
        v.setUsuario(c.getUsuario());
        for (CarritoItem ci : c.getItems()) {
            VentaItem vi = new VentaItem();
            vi.setProductoId(ci.getProductoId());
            vi.setNombre(ci.getNombre());
            vi.setPrecio(ci.getPrecio());
            vi.setCantidad(ci.getCantidad());
            v.getItems().add(vi);
        }
        Venta saved = ventaService.save(v);
        // limpiar carrito
        c.getItems().clear();
        carritoRepository.save(c);
        return saved;
    }
}
