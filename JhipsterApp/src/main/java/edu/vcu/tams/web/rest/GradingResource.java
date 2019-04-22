package edu.vcu.tams.web.rest;
import edu.vcu.tams.domain.Grading;
import edu.vcu.tams.repository.GradingRepository;
import edu.vcu.tams.web.rest.errors.BadRequestAlertException;
import edu.vcu.tams.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Grading.
 */
@RestController
@RequestMapping("/api")
public class GradingResource {

    private final Logger log = LoggerFactory.getLogger(GradingResource.class);

    private static final String ENTITY_NAME = "grading";

    private final GradingRepository gradingRepository;

    public GradingResource(GradingRepository gradingRepository) {
        this.gradingRepository = gradingRepository;
    }

    /**
     * POST  /gradings : Create a new grading.
     *
     * @param grading the grading to create
     * @return the ResponseEntity with status 201 (Created) and with body the new grading, or with status 400 (Bad Request) if the grading has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gradings")
    public ResponseEntity<Grading> createGrading(@RequestBody Grading grading) throws URISyntaxException {
        log.debug("REST request to save Grading : {}", grading);
        if (grading.getId() != null) {
            throw new BadRequestAlertException("A new grading cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Grading result = gradingRepository.save(grading);
        return ResponseEntity.created(new URI("/api/gradings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gradings : Updates an existing grading.
     *
     * @param grading the grading to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated grading,
     * or with status 400 (Bad Request) if the grading is not valid,
     * or with status 500 (Internal Server Error) if the grading couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gradings")
    public ResponseEntity<Grading> updateGrading(@RequestBody Grading grading) throws URISyntaxException {
        log.debug("REST request to update Grading : {}", grading);
        if (grading.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Grading result = gradingRepository.save(grading);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, grading.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gradings : get all the gradings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gradings in body
     */
    @GetMapping("/gradings")
    public List<Grading> getAllGradings() {
        log.debug("REST request to get all Gradings");
        return gradingRepository.findAll();
    }

    /**
     * GET  /gradings/:id : get the "id" grading.
     *
     * @param id the id of the grading to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the grading, or with status 404 (Not Found)
     */
    @GetMapping("/gradings/{id}")
    public ResponseEntity<Grading> getGrading(@PathVariable Long id) {
        log.debug("REST request to get Grading : {}", id);
        Optional<Grading> grading = gradingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grading);
    }

    /**
     * DELETE  /gradings/:id : delete the "id" grading.
     *
     * @param id the id of the grading to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gradings/{id}")
    public ResponseEntity<Void> deleteGrading(@PathVariable Long id) {
        log.debug("REST request to delete Grading : {}", id);
        gradingRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
