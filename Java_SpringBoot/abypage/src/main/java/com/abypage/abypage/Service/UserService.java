package com.abypage.abypage.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abypage.abypage.Models.IUser;

@Service

public class UserService {
    @Autowired
    private com.abypage.abypage.Repository.UsersRepository UsersRepository;

    public List<IUser> getUser() {
        return this.UsersRepository.findAll();
    };

    public Optional<IUser> getUserFindbyId(UUID id) {
        return this.UsersRepository.findById(id);
    }

    public IUser createUser(IUser user) {
        return this.UsersRepository.save(user);
    }

}
