package edu.vcu.tams.repository;

import edu.vcu.tams.domain.TimeWindow;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TimeWindow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimeWindowRepository extends JpaRepository<TimeWindow, Long> {

}
