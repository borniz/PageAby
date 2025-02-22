package com.abypage.abypage.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.abypage.abypage.Models.IPurchaseOrder;
import com.abypage.abypage.Repository.PurchaseOrdenRepository;

@Service
public class PurchaseOrderService {
    @Autowired
    private PurchaseOrdenRepository PurchaseOrdenRepository;

    public List<IPurchaseOrder> getfindallPurchaseOrder() {
        System.out.println("estamos en service");
        return PurchaseOrdenRepository.findAll();
    }

    public ResponseEntity<IPurchaseOrder> getFindById(UUID id) {
        try {
            Optional<IPurchaseOrder> purchaseOrder = this.PurchaseOrdenRepository.findById(id);
            return purchaseOrder.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public IPurchaseOrder createPurchaseOrder(IPurchaseOrder purchaseOrder) {
        return PurchaseOrdenRepository.save(purchaseOrder);
    }

}
