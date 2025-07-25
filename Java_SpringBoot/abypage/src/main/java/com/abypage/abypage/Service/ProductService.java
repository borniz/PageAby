package com.abypage.abypage.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.abypage.abypage.Models.Product;
import com.abypage.abypage.Repository.ProductRepository;

@Service

public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<List<Product>> findAllProduct() {
        try {
            List<Product> products = productRepository.findAll();

            if (products.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public Optional<Product> FindProductbyId(UUID id) {
        return this.productRepository.findById(id);
    }

    public ResponseEntity<Product> createProduct(Product product) {
        try {
            product = this.productRepository.save(product);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    public ResponseEntity<Product> uploadImage(String imageurl, UUID id) {
        try {

            return this.productRepository.findById(id).map(product -> {

                product.setImage(imageurl);
                return ResponseEntity.ok(this.productRepository.save(product));
            }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
        }
    }

}
