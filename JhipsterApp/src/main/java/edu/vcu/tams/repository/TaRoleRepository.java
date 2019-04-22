package edu.vcu.tams.repository;

import edu.vcu.tams.domain.TaRole;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaRoleRepository extends JpaRepository<TaRole, Long> {

}
