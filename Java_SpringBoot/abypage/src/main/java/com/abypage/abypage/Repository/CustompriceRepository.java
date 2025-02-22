package com.abypage.abypage.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abypage.abypage.Models.ICustomprice;

@Repository
public interface CustompriceRepository extends JpaRepository<ICustomprice, UUID> {

}
