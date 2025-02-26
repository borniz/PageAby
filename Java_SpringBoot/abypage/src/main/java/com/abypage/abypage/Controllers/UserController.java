package com.abypage.abypage.Controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abypage.abypage.Models.IUser;
import com.abypage.abypage.Repository.UsersRepository;
import com.abypage.abypage.Service.UserService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:4200")
public class UserController {

    private final UserService userService;
    private final UsersRepository usersRepository;

    public UserController(UserService userService, UsersRepository usersRepository) {
        this.userService = userService;
        this.usersRepository = usersRepository;
    }

    @GetMapping
    public ResponseEntity<List<IUser>> getfindUser() {
        return ResponseEntity.ok(userService.getUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IUser> getUserById(@PathVariable UUID id) {
        return userService.getUserFindbyId(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<IUser> createUser(@RequestBody IUser user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable UUID id) {
        return usersRepository.findById(id).map(user -> {
            String userName = user.getName();
            usersRepository.deleteById(id);
            return ResponseEntity.ok("Usuario con nombre " + userName + " ha sido eliminado correctamente.");
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado."));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<IUser> updateUser(@PathVariable UUID id, @RequestBody IUser updateUser) {
        return usersRepository.findById(id).map(user -> {
            user.setName(updateUser.getName());
            user.setUsername(updateUser.getUsername());
            user.setPassword(updateUser.getPassword());
            user.setPhone(updateUser.getPhone());

            if (updateUser.getCustomPrices() != null) {
                user.setCustomPrices(updateUser.getCustomPrices());
            }

            IUser updatedUser = this.usersRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
