package com.abypage.abypage.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abypage.abypage.Models.IPurchaseOrder;

@Repository
public interface PurchaseOrdenRepository extends JpaRepository<IPurchaseOrder, UUID> {

}
