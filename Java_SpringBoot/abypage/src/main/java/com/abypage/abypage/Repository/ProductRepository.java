package com.abypage.abypage.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abypage.abypage.Models.IProduct;

@Repository
public interface ProductRepository extends JpaRepository<IProduct, UUID> {
}
