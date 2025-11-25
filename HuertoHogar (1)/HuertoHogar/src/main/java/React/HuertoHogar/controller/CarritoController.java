package React.HuertoHogar.controller;

import React.HuertoHogar.model.Carrito;
import React.HuertoHogar.model.CarritoItem;
import React.HuertoHogar.model.Venta;
import React.HuertoHogar.service.CarritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:5173")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<Carrito> getCart(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(carritoService.getOrCreateCart(usuarioId));
    }

    @PostMapping("/{usuarioId}/items")
    public ResponseEntity<Carrito> addItem(@PathVariable Long usuarioId, @RequestBody CarritoItem item) {
        return ResponseEntity.ok(carritoService.addItem(usuarioId, item));
    }

    @DeleteMapping("/{usuarioId}/items/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long usuarioId, @PathVariable Long itemId) {
        carritoService.removeItem(usuarioId, itemId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{usuarioId}/checkout")
    public ResponseEntity<Venta> checkout(@PathVariable Long usuarioId) {
        Venta v = carritoService.checkout(usuarioId);
        return ResponseEntity.ok(v);
    }
}
