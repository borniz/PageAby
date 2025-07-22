package com.abypage.abypage.Repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.abypage.abypage.Models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    @Query("SELECT p FROM Product p ORDER BY LOWER(p.name)")
    Page<Product> findAllOrderByNameIgnoreCase(Pageable pageable);
}
