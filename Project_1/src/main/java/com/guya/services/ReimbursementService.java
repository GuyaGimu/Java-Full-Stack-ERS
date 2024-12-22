package com.guya.services;

import com.guya.DAOs.ReimbursementDAO;
import com.guya.DAOs.UserDAO;
import com.guya.models.DTOs.IncomingReimbursementDTO;
import com.guya.models.Reimbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private final ReimbursementDAO reimbursementDAO;
    private final UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, UserDAO userDAO) {
        this.reimbursementDAO = reimbursementDAO;
        this.userDAO = userDAO;
    }

   // @Autowired


    //Inserts new Reimbursement into the DB once they have been validated
    public Reimbursement createReimbursement(Reimbursement reimbursement){

        if(reimbursement.getDescription()== null || reimbursement.getDescription().isBlank()){
            throw new IllegalArgumentException("Reimbursement description can't be null or empty");
        }

        if(reimbursement.getAmount() < 0){
            throw new IllegalArgumentException("Reimbursement amount can not be negative");
        }
        if(reimbursement.getStatus()== null || reimbursement.getStatus().isBlank()){
            throw new IllegalArgumentException("Reimbursement status can't be null or empty");
        }

        //if none of this get triggered, then the  reimbursement is valid

        return reimbursementDAO.save(reimbursement);
    }

    //This method gets all reimbursement from the DB
    public List<Reimbursement> getAllReimbursement(){

        return reimbursementDAO.findAll();
    }

    //Gets Reimbursement by Status
    public List<Reimbursement> findByReimbursementStatus(String status){

        if(status ==null || status.isBlank()){
            throw new IllegalArgumentException("status can't be null or blank");
        }

        //Getting the list of Reimbursement
        return reimbursementDAO.findByStatus(status);
    }
    // If it is not working the problem could be her, coz I made some changes here
    //public  Reimbursement getReimbursementByUser(IncomingReimbursementDTO  reimbursementDTO){

        //Optional<Reimbursement> reimbursement=reimbursementDAO.findById(reimbursementDTO.getUserId());
    //}

    public List<Reimbursement> getAllPendingReimbursements(){

        return reimbursementDAO.findByStatus("PENDING");
    }

    public void resolveReimbursement(int reimbId,String status){

        Reimbursement reimbursement =reimbursementDAO.findById(reimbId)
                .orElseThrow(() -> new RuntimeException("Reimbursement not found"));
        reimbursement.setStatus(status);
        reimbursementDAO.save(reimbursement);
    }
}
