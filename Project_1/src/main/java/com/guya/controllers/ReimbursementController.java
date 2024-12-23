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

        Reimbursement newReimbursement= reimbursementService.createReimbursement(reimbursement);
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

   //@GetMapping("/user/{userId}")
    //public ResponseEntity<?> getReimbursementByUser(@PathVariable int userId){

        //List<Reimbursement> reimbursements=reimbursementService.getReimbursementByUser(userId);
        //if(reimbursements.isEmpty()){
           // return ResponseEntity.status(404).body("No Reimbursement found with this  " +userId+ " User  ID");
       //}
        //return ResponseEntity.ok(reimbursements);
   //}

    @PutMapping("/{id}")
    public void resolveReimbursement(@PathVariable int id, @RequestParam String status){
        reimbursementService.resolveReimbursement(id,status);
    }
}
