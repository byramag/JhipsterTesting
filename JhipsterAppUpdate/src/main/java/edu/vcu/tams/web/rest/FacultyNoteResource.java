package edu.vcu.tams.web.rest;
import edu.vcu.tams.domain.FacultyNote;
import edu.vcu.tams.repository.FacultyNoteRepository;
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
 * REST controller for managing FacultyNote.
 */
@RestController
@RequestMapping("/api")
public class FacultyNoteResource {

    private final Logger log = LoggerFactory.getLogger(FacultyNoteResource.class);

    private static final String ENTITY_NAME = "facultyNote";

    private final FacultyNoteRepository facultyNoteRepository;

    public FacultyNoteResource(FacultyNoteRepository facultyNoteRepository) {
        this.facultyNoteRepository = facultyNoteRepository;
    }

    /**
     * POST  /faculty-notes : Create a new facultyNote.
     *
     * @param facultyNote the facultyNote to create
     * @return the ResponseEntity with status 201 (Created) and with body the new facultyNote, or with status 400 (Bad Request) if the facultyNote has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/faculty-notes")
    public ResponseEntity<FacultyNote> createFacultyNote(@RequestBody FacultyNote facultyNote) throws URISyntaxException {
        log.debug("REST request to save FacultyNote : {}", facultyNote);
        if (facultyNote.getId() != null) {
            throw new BadRequestAlertException("A new facultyNote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacultyNote result = facultyNoteRepository.save(facultyNote);
        return ResponseEntity.created(new URI("/api/faculty-notes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /faculty-notes : Updates an existing facultyNote.
     *
     * @param facultyNote the facultyNote to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated facultyNote,
     * or with status 400 (Bad Request) if the facultyNote is not valid,
     * or with status 500 (Internal Server Error) if the facultyNote couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/faculty-notes")
    public ResponseEntity<FacultyNote> updateFacultyNote(@RequestBody FacultyNote facultyNote) throws URISyntaxException {
        log.debug("REST request to update FacultyNote : {}", facultyNote);
        if (facultyNote.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FacultyNote result = facultyNoteRepository.save(facultyNote);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, facultyNote.getId().toString()))
            .body(result);
    }

    /**
     * GET  /faculty-notes : get all the facultyNotes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of facultyNotes in body
     */
    @GetMapping("/faculty-notes")
    public List<FacultyNote> getAllFacultyNotes() {
        log.debug("REST request to get all FacultyNotes");
        return facultyNoteRepository.findAll();
    }

    /**
     * GET  /faculty-notes/:id : get the "id" facultyNote.
     *
     * @param id the id of the facultyNote to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the facultyNote, or with status 404 (Not Found)
     */
    @GetMapping("/faculty-notes/{id}")
    public ResponseEntity<FacultyNote> getFacultyNote(@PathVariable Long id) {
        log.debug("REST request to get FacultyNote : {}", id);
        Optional<FacultyNote> facultyNote = facultyNoteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facultyNote);
    }

    /**
     * DELETE  /faculty-notes/:id : delete the "id" facultyNote.
     *
     * @param id the id of the facultyNote to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/faculty-notes/{id}")
    public ResponseEntity<Void> deleteFacultyNote(@PathVariable Long id) {
        log.debug("REST request to delete FacultyNote : {}", id);
        facultyNoteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
