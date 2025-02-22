package com.abypage.abypage.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abypage.abypage.Models.IUser;

@Repository
public interface UsersRepository extends JpaRepository<IUser, UUID> {

}
