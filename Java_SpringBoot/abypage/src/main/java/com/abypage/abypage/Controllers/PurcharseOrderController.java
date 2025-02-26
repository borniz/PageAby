package com.abypage.abypage.Controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abypage.abypage.Models.IPurchaseOrder;
import com.abypage.abypage.Repository.PurchaseOrdenRepository;

@RestController
@RequestMapping("/purchaseorder")
public class PurcharseOrderController {
    @Autowired
    private com.abypage.abypage.Service.PurchaseOrderService PurchaseOrderService;
    @Autowired
    private PurchaseOrdenRepository PurchaseOrdenRepository;

    @GetMapping
    public ResponseEntity<List<IPurchaseOrder>> findAllPurchaseOrden() {
        try {
            List<IPurchaseOrder> purchaseOrders = PurchaseOrderService.getfindallPurchaseOrder();
            return ResponseEntity.ok(purchaseOrders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<IPurchaseOrder> findPurcheseOrdenbyId(@PathVariable UUID id) {
        return PurchaseOrderService.getFindById(id);
    }

    @PostMapping
    private IPurchaseOrder createPurchaseOrden(@RequestBody IPurchaseOrder purchaseOrder) {
        System.out.println("estamos en controller");
        return PurchaseOrderService.createPurchaseOrder(purchaseOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePurchaseOrden(@PathVariable UUID id) {
        if (this.PurchaseOrdenRepository.existsById(id)) {
            this.PurchaseOrdenRepository.deleteById(id);
            return ResponseEntity.ok("Se elimino la Orden de Compra numero: " + id);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha Encontrado esa Numero de Orden " + id);
        }
    }

    @PutMapping("/{id}")
    private ResponseEntity<IPurchaseOrder> updatePurchaseOrden(@PathVariable UUID id,
            @RequestBody IPurchaseOrder updatePurchaseOrder) {
        return PurchaseOrdenRepository.findById(id).map(order -> {
            order.setState(updatePurchaseOrder.getState());
            order.setTotal(updatePurchaseOrder.getTotal());

            IPurchaseOrder updatedPurchaseOrder = this.PurchaseOrdenRepository.save(order);
            return ResponseEntity.ok(updatedPurchaseOrder);
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
