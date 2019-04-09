package edu.vcu.tams.web.rest;
import edu.vcu.tams.domain.Ta;
import edu.vcu.tams.repository.TaRepository;
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
 * REST controller for managing Ta.
 */
@RestController
@RequestMapping("/api")
public class TaResource {

    private final Logger log = LoggerFactory.getLogger(TaResource.class);

    private static final String ENTITY_NAME = "ta";

    private final TaRepository taRepository;

    public TaResource(TaRepository taRepository) {
        this.taRepository = taRepository;
    }

    /**
     * POST  /tas : Create a new ta.
     *
     * @param ta the ta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ta, or with status 400 (Bad Request) if the ta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tas")
    public ResponseEntity<Ta> createTa(@RequestBody Ta ta) throws URISyntaxException {
        log.debug("REST request to save Ta : {}", ta);
        if (ta.getId() != null) {
            throw new BadRequestAlertException("A new ta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ta result = taRepository.save(ta);
        return ResponseEntity.created(new URI("/api/tas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tas : Updates an existing ta.
     *
     * @param ta the ta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ta,
     * or with status 400 (Bad Request) if the ta is not valid,
     * or with status 500 (Internal Server Error) if the ta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tas")
    public ResponseEntity<Ta> updateTa(@RequestBody Ta ta) throws URISyntaxException {
        log.debug("REST request to update Ta : {}", ta);
        if (ta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ta result = taRepository.save(ta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tas : get all the tas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of tas in body
     */
    @GetMapping("/tas")
    public List<Ta> getAllTas(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Tas");
        return taRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /tas/:id : get the "id" ta.
     *
     * @param id the id of the ta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ta, or with status 404 (Not Found)
     */
    @GetMapping("/tas/{id}")
    public ResponseEntity<Ta> getTa(@PathVariable Long id) {
        log.debug("REST request to get Ta : {}", id);
        Optional<Ta> ta = taRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ta);
    }

    /**
     * DELETE  /tas/:id : delete the "id" ta.
     *
     * @param id the id of the ta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tas/{id}")
    public ResponseEntity<Void> deleteTa(@PathVariable Long id) {
        log.debug("REST request to delete Ta : {}", id);
        taRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
