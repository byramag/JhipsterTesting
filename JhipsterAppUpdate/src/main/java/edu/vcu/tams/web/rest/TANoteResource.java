package edu.vcu.tams.web.rest;
import edu.vcu.tams.domain.TANote;
import edu.vcu.tams.repository.TANoteRepository;
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
 * REST controller for managing TANote.
 */
@RestController
@RequestMapping("/api")
public class TANoteResource {

    private final Logger log = LoggerFactory.getLogger(TANoteResource.class);

    private static final String ENTITY_NAME = "tANote";

    private final TANoteRepository tANoteRepository;

    public TANoteResource(TANoteRepository tANoteRepository) {
        this.tANoteRepository = tANoteRepository;
    }

    /**
     * POST  /ta-notes : Create a new tANote.
     *
     * @param tANote the tANote to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tANote, or with status 400 (Bad Request) if the tANote has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ta-notes")
    public ResponseEntity<TANote> createTANote(@RequestBody TANote tANote) throws URISyntaxException {
        log.debug("REST request to save TANote : {}", tANote);
        if (tANote.getId() != null) {
            throw new BadRequestAlertException("A new tANote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TANote result = tANoteRepository.save(tANote);
        return ResponseEntity.created(new URI("/api/ta-notes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ta-notes : Updates an existing tANote.
     *
     * @param tANote the tANote to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tANote,
     * or with status 400 (Bad Request) if the tANote is not valid,
     * or with status 500 (Internal Server Error) if the tANote couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ta-notes")
    public ResponseEntity<TANote> updateTANote(@RequestBody TANote tANote) throws URISyntaxException {
        log.debug("REST request to update TANote : {}", tANote);
        if (tANote.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TANote result = tANoteRepository.save(tANote);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tANote.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ta-notes : get all the tANotes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tANotes in body
     */
    @GetMapping("/ta-notes")
    public List<TANote> getAllTANotes() {
        log.debug("REST request to get all TANotes");
        return tANoteRepository.findAll();
    }

    /**
     * GET  /ta-notes/:id : get the "id" tANote.
     *
     * @param id the id of the tANote to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tANote, or with status 404 (Not Found)
     */
    @GetMapping("/ta-notes/{id}")
    public ResponseEntity<TANote> getTANote(@PathVariable Long id) {
        log.debug("REST request to get TANote : {}", id);
        Optional<TANote> tANote = tANoteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tANote);
    }

    /**
     * DELETE  /ta-notes/:id : delete the "id" tANote.
     *
     * @param id the id of the tANote to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ta-notes/{id}")
    public ResponseEntity<Void> deleteTANote(@PathVariable Long id) {
        log.debug("REST request to delete TANote : {}", id);
        tANoteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
