package com.guya.services;

import com.guya.DAOs.ReimbursementDAO;
import com.guya.models.Reimbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReimbursementService {

    private final ReimbursementDAO reimbursementDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO) {
        this.reimbursementDAO = reimbursementDAO;
    }

    //Inserts new Reimbursement into the DB once they have been validated
    public Reimbursement insertReimbursement(Reimbursement reimbursement){

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
}
