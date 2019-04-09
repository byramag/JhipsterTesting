package edu.vcu.tams.repository;

import edu.vcu.tams.domain.Applicant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Applicant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

}
