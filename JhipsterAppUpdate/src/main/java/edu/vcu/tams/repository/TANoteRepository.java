package edu.vcu.tams.repository;

import edu.vcu.tams.domain.TANote;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TANote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TANoteRepository extends JpaRepository<TANote, Long> {

}
