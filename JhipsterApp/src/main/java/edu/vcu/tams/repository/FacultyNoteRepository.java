package edu.vcu.tams.repository;

import edu.vcu.tams.domain.FacultyNote;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FacultyNote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacultyNoteRepository extends JpaRepository<FacultyNote, Long> {

}
