package com.abypage.abypage.Controllers;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.abypage.abypage.Models.IProduct;
import com.abypage.abypage.Repository.ProductRepository;
import com.abypage.abypage.Service.CloudinaryService;
import com.abypage.abypage.Service.ProductService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;
    @Autowired
    private final ProductRepository productRepository;

    private final CloudinaryService cloudinaryService;

    public ProductController(ProductService productService, ProductRepository productRepository,
            CloudinaryService cloudinaryService) {
        this.productService = productService;
        this.productRepository = productRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    public ResponseEntity<List<IProduct>> FindAllProducts() {
        return productService.findAllProduct();
    }

    @GetMapping("/page")
    public ResponseEntity<Page<IProduct>> getAllProductsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<IProduct> products = productRepository.findAll(pageable);

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    private ResponseEntity<IProduct> findProductById(@PathVariable UUID id) {
        return productService.FindProductbyId(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<IProduct> createProduct(@RequestBody IProduct product) {
        try {

            return productService.createProduct(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<IProduct> uploadImage(@PathVariable UUID id, @RequestParam("image") MultipartFile image) {
        try {
            String imageUrl = cloudinaryService.uploadImage(image);

            return productService.uploadImage(imageUrl, id);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable UUID id) {
        if (this.productRepository.existsById(id)) {
            this.productRepository.deleteById(id);
            return ResponseEntity.ok("Se ha Eliminado el Producto con id: " + id + " Correctamente");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha Encotrado el Producto Con Id: " + id);
        }
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<IProduct> updateProduct(@PathVariable UUID id, @RequestBody IProduct updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setBase_price(updatedProduct.getBase_price());
            product.setStock(updatedProduct.getStock());
            product.setCategory(updatedProduct.getCategory());
            if (updatedProduct.getCustomPrices() != null) {

                product.setCustomPrices(updatedProduct.getCustomPrices());
            }
            IProduct updateProduct = productRepository.save(product);
            return ResponseEntity.ok(updateProduct);

        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
