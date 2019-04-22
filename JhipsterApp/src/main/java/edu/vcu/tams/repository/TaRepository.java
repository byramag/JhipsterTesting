package edu.vcu.tams.repository;

import edu.vcu.tams.domain.Ta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Ta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaRepository extends JpaRepository<Ta, Long> {

    @Query(value = "select distinct ta from Ta ta left join fetch ta.sections left join fetch ta.courseQualifieds left join fetch ta.courseHasExperiences left join fetch ta.availableRoles",
        countQuery = "select count(distinct ta) from Ta ta")
    Page<Ta> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct ta from Ta ta left join fetch ta.sections left join fetch ta.courseQualifieds left join fetch ta.courseHasExperiences left join fetch ta.availableRoles")
    List<Ta> findAllWithEagerRelationships();

    @Query("select ta from Ta ta left join fetch ta.sections left join fetch ta.courseQualifieds left join fetch ta.courseHasExperiences left join fetch ta.availableRoles where ta.id =:id")
    Optional<Ta> findOneWithEagerRelationships(@Param("id") Long id);

}
