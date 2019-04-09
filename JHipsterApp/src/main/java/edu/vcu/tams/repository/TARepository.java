package edu.vcu.tams.repository;

import edu.vcu.tams.domain.TA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TA entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TARepository extends JpaRepository<TA, Long> {

    @Query(value = "select distinct ta from TA ta left join fetch ta.sections left join fetch ta.assignments",
        countQuery = "select count(distinct ta) from TA ta")
    Page<TA> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct ta from TA ta left join fetch ta.sections left join fetch ta.assignments")
    List<TA> findAllWithEagerRelationships();

    @Query("select ta from TA ta left join fetch ta.sections left join fetch ta.assignments where ta.id =:id")
    Optional<TA> findOneWithEagerRelationships(@Param("id") Long id);

}
