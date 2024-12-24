package com.guya.controllers;


import com.guya.models.DTOs.IncomingReimbursementDTO;
import com.guya.models.Reimbursement;
import com.guya.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursement")
@CrossOrigin
public class ReimbursementController {

    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @PostMapping
    public ResponseEntity<Reimbursement> createReimbursement(@RequestBody Reimbursement reimbursement) {
        // Ensure the status is ignored and defaults to PENDING
        reimbursement.setStatus(null);
        Reimbursement createdReimbursement = reimbursementService.createReimbursement(reimbursement);
        return ResponseEntity.ok(createdReimbursement);
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

    //Select all Reimbursement by status
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getReimbursementByStatus(@PathVariable String status){

        List<Reimbursement> reimbursements=reimbursementService.findByReimbursementStatus(status);

        if(reimbursements.isEmpty()){
            return ResponseEntity.status(404).body("No Reimbursement found in " +status);
        }
        return ResponseEntity.ok(reimbursements);
    }

    @GetMapping("/pending")
    public List<Reimbursement> getAllPendingReimbursements(){

        return reimbursementService.getAllPendingReimbursements();
    }

    @PutMapping("/{id}")
    public void resolveReimbursement(@PathVariable int id, @RequestParam String status){
        reimbursementService.resolveReimbursement(id,status);
    }

    // New method to get reimbursements by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId) {
        List<Reimbursement> reimbursements = reimbursementService.getReimbursementsByUserId(userId);
        if (reimbursements.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no reimbursements found
        }
        return ResponseEntity.ok(reimbursements); // Return 200 with the list
    }
}
