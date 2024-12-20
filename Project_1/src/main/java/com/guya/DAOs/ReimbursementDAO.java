package com.guya.DAOs;

import com.guya.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReimbursementDAO extends JpaRepository <Reimbursement, Integer>{

}
