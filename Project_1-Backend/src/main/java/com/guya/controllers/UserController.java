package com.guya.controllers;

import com.guya.models.DTOs.IncomingUserDTO;
import com.guya.models.DTOs.OutgoingUserDTO;
import com.guya.models.User;
import com.guya.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    @Autowired

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Creates/Inserts new users into the DB
    @PostMapping
    public ResponseEntity<User> insertUser(@RequestBody IncomingUserDTO userDTO){

        //send the userDTO to the service, which will process it and send it to the DAO
        User  user = userService.insertUser(userDTO);

        //send back the user object if all goes well
        return ResponseEntity.status(201).body(user);
    }

    @GetMapping
    public ResponseEntity<List<OutgoingUserDTO>> getAllUser(){

        return ResponseEntity.ok(userService.getAllUser());
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable int userId){
        userService.deleteUser(userId);
    }

    @PostMapping("/promote/{userId}")
    public ResponseEntity<User> promoteToManager(@PathVariable int userId) {
        User promotedUser = userService.promoteToManager(userId);
        return ResponseEntity.ok(promotedUser);
    }
}
