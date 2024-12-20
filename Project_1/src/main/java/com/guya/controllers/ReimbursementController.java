package com.guya.controllers;


import com.guya.models.Reimbursement;
import com.guya.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursement")
public class ReimbursementController {

    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @PostMapping
    public ResponseEntity<Reimbursement> insertReimbursement(@RequestBody Reimbursement reimbursement){

        Reimbursement newReimbursement= reimbursementService.insertReimbursement(reimbursement);
        return ResponseEntity.ok(newReimbursement);
    }

    //Select all Reimbursement
    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursement(){
        return ResponseEntity.ok(reimbursementService.getAllReimbursement());
    }

    //Exception Handlers
    //Spring has a built-in Exception handler that cleans up our controller method

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e){

        return ResponseEntity.badRequest().body(e.getMessage());
    }

}
