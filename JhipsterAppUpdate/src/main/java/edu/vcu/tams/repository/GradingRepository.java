package edu.vcu.tams.repository;

import edu.vcu.tams.domain.Grading;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Grading entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GradingRepository extends JpaRepository<Grading, Long> {

}
