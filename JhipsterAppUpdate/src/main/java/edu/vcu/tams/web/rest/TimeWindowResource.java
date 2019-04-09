package edu.vcu.tams.web.rest;
import edu.vcu.tams.domain.TimeWindow;
import edu.vcu.tams.repository.TimeWindowRepository;
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
 * REST controller for managing TimeWindow.
 */
@RestController
@RequestMapping("/api")
public class TimeWindowResource {

    private final Logger log = LoggerFactory.getLogger(TimeWindowResource.class);

    private static final String ENTITY_NAME = "timeWindow";

    private final TimeWindowRepository timeWindowRepository;

    public TimeWindowResource(TimeWindowRepository timeWindowRepository) {
        this.timeWindowRepository = timeWindowRepository;
    }

    /**
     * POST  /time-windows : Create a new timeWindow.
     *
     * @param timeWindow the timeWindow to create
     * @return the ResponseEntity with status 201 (Created) and with body the new timeWindow, or with status 400 (Bad Request) if the timeWindow has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/time-windows")
    public ResponseEntity<TimeWindow> createTimeWindow(@RequestBody TimeWindow timeWindow) throws URISyntaxException {
        log.debug("REST request to save TimeWindow : {}", timeWindow);
        if (timeWindow.getId() != null) {
            throw new BadRequestAlertException("A new timeWindow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TimeWindow result = timeWindowRepository.save(timeWindow);
        return ResponseEntity.created(new URI("/api/time-windows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /time-windows : Updates an existing timeWindow.
     *
     * @param timeWindow the timeWindow to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated timeWindow,
     * or with status 400 (Bad Request) if the timeWindow is not valid,
     * or with status 500 (Internal Server Error) if the timeWindow couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/time-windows")
    public ResponseEntity<TimeWindow> updateTimeWindow(@RequestBody TimeWindow timeWindow) throws URISyntaxException {
        log.debug("REST request to update TimeWindow : {}", timeWindow);
        if (timeWindow.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TimeWindow result = timeWindowRepository.save(timeWindow);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, timeWindow.getId().toString()))
            .body(result);
    }

    /**
     * GET  /time-windows : get all the timeWindows.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of timeWindows in body
     */
    @GetMapping("/time-windows")
    public List<TimeWindow> getAllTimeWindows() {
        log.debug("REST request to get all TimeWindows");
        return timeWindowRepository.findAll();
    }

    /**
     * GET  /time-windows/:id : get the "id" timeWindow.
     *
     * @param id the id of the timeWindow to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the timeWindow, or with status 404 (Not Found)
     */
    @GetMapping("/time-windows/{id}")
    public ResponseEntity<TimeWindow> getTimeWindow(@PathVariable Long id) {
        log.debug("REST request to get TimeWindow : {}", id);
        Optional<TimeWindow> timeWindow = timeWindowRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(timeWindow);
    }

    /**
     * DELETE  /time-windows/:id : delete the "id" timeWindow.
     *
     * @param id the id of the timeWindow to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/time-windows/{id}")
    public ResponseEntity<Void> deleteTimeWindow(@PathVariable Long id) {
        log.debug("REST request to delete TimeWindow : {}", id);
        timeWindowRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
