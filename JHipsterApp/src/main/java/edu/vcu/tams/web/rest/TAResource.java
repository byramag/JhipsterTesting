package edu.vcu.tams.web.rest;
import edu.vcu.tams.domain.TA;
import edu.vcu.tams.repository.TARepository;
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
 * REST controller for managing TA.
 */
@RestController
@RequestMapping("/api")
public class TAResource {

    private final Logger log = LoggerFactory.getLogger(TAResource.class);

    private static final String ENTITY_NAME = "tA";

    private final TARepository tARepository;

    public TAResource(TARepository tARepository) {
        this.tARepository = tARepository;
    }

    /**
     * POST  /tas : Create a new tA.
     *
     * @param tA the tA to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tA, or with status 400 (Bad Request) if the tA has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tas")
    public ResponseEntity<TA> createTA(@RequestBody TA tA) throws URISyntaxException {
        log.debug("REST request to save TA : {}", tA);
        if (tA.getId() != null) {
            throw new BadRequestAlertException("A new tA cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TA result = tARepository.save(tA);
        return ResponseEntity.created(new URI("/api/tas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tas : Updates an existing tA.
     *
     * @param tA the tA to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tA,
     * or with status 400 (Bad Request) if the tA is not valid,
     * or with status 500 (Internal Server Error) if the tA couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tas")
    public ResponseEntity<TA> updateTA(@RequestBody TA tA) throws URISyntaxException {
        log.debug("REST request to update TA : {}", tA);
        if (tA.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TA result = tARepository.save(tA);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tA.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tas : get all the tAS.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of tAS in body
     */
    @GetMapping("/tas")
    public List<TA> getAllTAS(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all TAS");
        return tARepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /tas/:id : get the "id" tA.
     *
     * @param id the id of the tA to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tA, or with status 404 (Not Found)
     */
    @GetMapping("/tas/{id}")
    public ResponseEntity<TA> getTA(@PathVariable Long id) {
        log.debug("REST request to get TA : {}", id);
        Optional<TA> tA = tARepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(tA);
    }

    /**
     * DELETE  /tas/:id : delete the "id" tA.
     *
     * @param id the id of the tA to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tas/{id}")
    public ResponseEntity<Void> deleteTA(@PathVariable Long id) {
        log.debug("REST request to delete TA : {}", id);
        tARepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
