package edu.vcu.tams.web.rest;
import edu.vcu.tams.domain.TaRole;
import edu.vcu.tams.repository.TaRoleRepository;
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
 * REST controller for managing TaRole.
 */
@RestController
@RequestMapping("/api")
public class TaRoleResource {

    private final Logger log = LoggerFactory.getLogger(TaRoleResource.class);

    private static final String ENTITY_NAME = "taRole";

    private final TaRoleRepository taRoleRepository;

    public TaRoleResource(TaRoleRepository taRoleRepository) {
        this.taRoleRepository = taRoleRepository;
    }

    /**
     * POST  /ta-roles : Create a new taRole.
     *
     * @param taRole the taRole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taRole, or with status 400 (Bad Request) if the taRole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ta-roles")
    public ResponseEntity<TaRole> createTaRole(@RequestBody TaRole taRole) throws URISyntaxException {
        log.debug("REST request to save TaRole : {}", taRole);
        if (taRole.getId() != null) {
            throw new BadRequestAlertException("A new taRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaRole result = taRoleRepository.save(taRole);
        return ResponseEntity.created(new URI("/api/ta-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ta-roles : Updates an existing taRole.
     *
     * @param taRole the taRole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taRole,
     * or with status 400 (Bad Request) if the taRole is not valid,
     * or with status 500 (Internal Server Error) if the taRole couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ta-roles")
    public ResponseEntity<TaRole> updateTaRole(@RequestBody TaRole taRole) throws URISyntaxException {
        log.debug("REST request to update TaRole : {}", taRole);
        if (taRole.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaRole result = taRoleRepository.save(taRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taRole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ta-roles : get all the taRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of taRoles in body
     */
    @GetMapping("/ta-roles")
    public List<TaRole> getAllTaRoles() {
        log.debug("REST request to get all TaRoles");
        return taRoleRepository.findAll();
    }

    /**
     * GET  /ta-roles/:id : get the "id" taRole.
     *
     * @param id the id of the taRole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taRole, or with status 404 (Not Found)
     */
    @GetMapping("/ta-roles/{id}")
    public ResponseEntity<TaRole> getTaRole(@PathVariable Long id) {
        log.debug("REST request to get TaRole : {}", id);
        Optional<TaRole> taRole = taRoleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taRole);
    }

    /**
     * DELETE  /ta-roles/:id : delete the "id" taRole.
     *
     * @param id the id of the taRole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ta-roles/{id}")
    public ResponseEntity<Void> deleteTaRole(@PathVariable Long id) {
        log.debug("REST request to delete TaRole : {}", id);
        taRoleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
