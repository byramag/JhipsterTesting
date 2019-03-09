package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.TANote;
import edu.vcu.tams.repository.TANoteRepository;
import edu.vcu.tams.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static edu.vcu.tams.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TANoteResource REST controller.
 *
 * @see TANoteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class TANoteResourceIntTest {

    private static final Instant DEFAULT_CREATED_ON = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_ON = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_NOTE_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_NOTE_TEXT = "BBBBBBBBBB";

    @Autowired
    private TANoteRepository tANoteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTANoteMockMvc;

    private TANote tANote;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TANoteResource tANoteResource = new TANoteResource(tANoteRepository);
        this.restTANoteMockMvc = MockMvcBuilders.standaloneSetup(tANoteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TANote createEntity(EntityManager em) {
        TANote tANote = new TANote()
            .createdOn(DEFAULT_CREATED_ON)
            .noteText(DEFAULT_NOTE_TEXT);
        return tANote;
    }

    @Before
    public void initTest() {
        tANote = createEntity(em);
    }

    @Test
    @Transactional
    public void createTANote() throws Exception {
        int databaseSizeBeforeCreate = tANoteRepository.findAll().size();

        // Create the TANote
        restTANoteMockMvc.perform(post("/api/ta-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tANote)))
            .andExpect(status().isCreated());

        // Validate the TANote in the database
        List<TANote> tANoteList = tANoteRepository.findAll();
        assertThat(tANoteList).hasSize(databaseSizeBeforeCreate + 1);
        TANote testTANote = tANoteList.get(tANoteList.size() - 1);
        assertThat(testTANote.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testTANote.getNoteText()).isEqualTo(DEFAULT_NOTE_TEXT);
    }

    @Test
    @Transactional
    public void createTANoteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tANoteRepository.findAll().size();

        // Create the TANote with an existing ID
        tANote.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTANoteMockMvc.perform(post("/api/ta-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tANote)))
            .andExpect(status().isBadRequest());

        // Validate the TANote in the database
        List<TANote> tANoteList = tANoteRepository.findAll();
        assertThat(tANoteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTANotes() throws Exception {
        // Initialize the database
        tANoteRepository.saveAndFlush(tANote);

        // Get all the tANoteList
        restTANoteMockMvc.perform(get("/api/ta-notes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tANote.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].noteText").value(hasItem(DEFAULT_NOTE_TEXT.toString())));
    }
    
    @Test
    @Transactional
    public void getTANote() throws Exception {
        // Initialize the database
        tANoteRepository.saveAndFlush(tANote);

        // Get the tANote
        restTANoteMockMvc.perform(get("/api/ta-notes/{id}", tANote.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tANote.getId().intValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.noteText").value(DEFAULT_NOTE_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTANote() throws Exception {
        // Get the tANote
        restTANoteMockMvc.perform(get("/api/ta-notes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTANote() throws Exception {
        // Initialize the database
        tANoteRepository.saveAndFlush(tANote);

        int databaseSizeBeforeUpdate = tANoteRepository.findAll().size();

        // Update the tANote
        TANote updatedTANote = tANoteRepository.findById(tANote.getId()).get();
        // Disconnect from session so that the updates on updatedTANote are not directly saved in db
        em.detach(updatedTANote);
        updatedTANote
            .createdOn(UPDATED_CREATED_ON)
            .noteText(UPDATED_NOTE_TEXT);

        restTANoteMockMvc.perform(put("/api/ta-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTANote)))
            .andExpect(status().isOk());

        // Validate the TANote in the database
        List<TANote> tANoteList = tANoteRepository.findAll();
        assertThat(tANoteList).hasSize(databaseSizeBeforeUpdate);
        TANote testTANote = tANoteList.get(tANoteList.size() - 1);
        assertThat(testTANote.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testTANote.getNoteText()).isEqualTo(UPDATED_NOTE_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingTANote() throws Exception {
        int databaseSizeBeforeUpdate = tANoteRepository.findAll().size();

        // Create the TANote

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTANoteMockMvc.perform(put("/api/ta-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tANote)))
            .andExpect(status().isBadRequest());

        // Validate the TANote in the database
        List<TANote> tANoteList = tANoteRepository.findAll();
        assertThat(tANoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTANote() throws Exception {
        // Initialize the database
        tANoteRepository.saveAndFlush(tANote);

        int databaseSizeBeforeDelete = tANoteRepository.findAll().size();

        // Delete the tANote
        restTANoteMockMvc.perform(delete("/api/ta-notes/{id}", tANote.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TANote> tANoteList = tANoteRepository.findAll();
        assertThat(tANoteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TANote.class);
        TANote tANote1 = new TANote();
        tANote1.setId(1L);
        TANote tANote2 = new TANote();
        tANote2.setId(tANote1.getId());
        assertThat(tANote1).isEqualTo(tANote2);
        tANote2.setId(2L);
        assertThat(tANote1).isNotEqualTo(tANote2);
        tANote1.setId(null);
        assertThat(tANote1).isNotEqualTo(tANote2);
    }
}
