package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.FacultyNote;
import edu.vcu.tams.repository.FacultyNoteRepository;
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
 * Test class for the FacultyNoteResource REST controller.
 *
 * @see FacultyNoteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class FacultyNoteResourceIntTest {

    private static final Instant DEFAULT_CREATED_ON = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_ON = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_NOTE_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_NOTE_TEXT = "BBBBBBBBBB";

    @Autowired
    private FacultyNoteRepository facultyNoteRepository;

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

    private MockMvc restFacultyNoteMockMvc;

    private FacultyNote facultyNote;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FacultyNoteResource facultyNoteResource = new FacultyNoteResource(facultyNoteRepository);
        this.restFacultyNoteMockMvc = MockMvcBuilders.standaloneSetup(facultyNoteResource)
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
    public static FacultyNote createEntity(EntityManager em) {
        FacultyNote facultyNote = new FacultyNote()
            .createdOn(DEFAULT_CREATED_ON)
            .noteText(DEFAULT_NOTE_TEXT);
        return facultyNote;
    }

    @Before
    public void initTest() {
        facultyNote = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacultyNote() throws Exception {
        int databaseSizeBeforeCreate = facultyNoteRepository.findAll().size();

        // Create the FacultyNote
        restFacultyNoteMockMvc.perform(post("/api/faculty-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facultyNote)))
            .andExpect(status().isCreated());

        // Validate the FacultyNote in the database
        List<FacultyNote> facultyNoteList = facultyNoteRepository.findAll();
        assertThat(facultyNoteList).hasSize(databaseSizeBeforeCreate + 1);
        FacultyNote testFacultyNote = facultyNoteList.get(facultyNoteList.size() - 1);
        assertThat(testFacultyNote.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testFacultyNote.getNoteText()).isEqualTo(DEFAULT_NOTE_TEXT);
    }

    @Test
    @Transactional
    public void createFacultyNoteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facultyNoteRepository.findAll().size();

        // Create the FacultyNote with an existing ID
        facultyNote.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacultyNoteMockMvc.perform(post("/api/faculty-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facultyNote)))
            .andExpect(status().isBadRequest());

        // Validate the FacultyNote in the database
        List<FacultyNote> facultyNoteList = facultyNoteRepository.findAll();
        assertThat(facultyNoteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFacultyNotes() throws Exception {
        // Initialize the database
        facultyNoteRepository.saveAndFlush(facultyNote);

        // Get all the facultyNoteList
        restFacultyNoteMockMvc.perform(get("/api/faculty-notes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facultyNote.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON.toString())))
            .andExpect(jsonPath("$.[*].noteText").value(hasItem(DEFAULT_NOTE_TEXT.toString())));
    }
    
    @Test
    @Transactional
    public void getFacultyNote() throws Exception {
        // Initialize the database
        facultyNoteRepository.saveAndFlush(facultyNote);

        // Get the facultyNote
        restFacultyNoteMockMvc.perform(get("/api/faculty-notes/{id}", facultyNote.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(facultyNote.getId().intValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON.toString()))
            .andExpect(jsonPath("$.noteText").value(DEFAULT_NOTE_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFacultyNote() throws Exception {
        // Get the facultyNote
        restFacultyNoteMockMvc.perform(get("/api/faculty-notes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacultyNote() throws Exception {
        // Initialize the database
        facultyNoteRepository.saveAndFlush(facultyNote);

        int databaseSizeBeforeUpdate = facultyNoteRepository.findAll().size();

        // Update the facultyNote
        FacultyNote updatedFacultyNote = facultyNoteRepository.findById(facultyNote.getId()).get();
        // Disconnect from session so that the updates on updatedFacultyNote are not directly saved in db
        em.detach(updatedFacultyNote);
        updatedFacultyNote
            .createdOn(UPDATED_CREATED_ON)
            .noteText(UPDATED_NOTE_TEXT);

        restFacultyNoteMockMvc.perform(put("/api/faculty-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFacultyNote)))
            .andExpect(status().isOk());

        // Validate the FacultyNote in the database
        List<FacultyNote> facultyNoteList = facultyNoteRepository.findAll();
        assertThat(facultyNoteList).hasSize(databaseSizeBeforeUpdate);
        FacultyNote testFacultyNote = facultyNoteList.get(facultyNoteList.size() - 1);
        assertThat(testFacultyNote.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testFacultyNote.getNoteText()).isEqualTo(UPDATED_NOTE_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingFacultyNote() throws Exception {
        int databaseSizeBeforeUpdate = facultyNoteRepository.findAll().size();

        // Create the FacultyNote

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacultyNoteMockMvc.perform(put("/api/faculty-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facultyNote)))
            .andExpect(status().isBadRequest());

        // Validate the FacultyNote in the database
        List<FacultyNote> facultyNoteList = facultyNoteRepository.findAll();
        assertThat(facultyNoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFacultyNote() throws Exception {
        // Initialize the database
        facultyNoteRepository.saveAndFlush(facultyNote);

        int databaseSizeBeforeDelete = facultyNoteRepository.findAll().size();

        // Delete the facultyNote
        restFacultyNoteMockMvc.perform(delete("/api/faculty-notes/{id}", facultyNote.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FacultyNote> facultyNoteList = facultyNoteRepository.findAll();
        assertThat(facultyNoteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacultyNote.class);
        FacultyNote facultyNote1 = new FacultyNote();
        facultyNote1.setId(1L);
        FacultyNote facultyNote2 = new FacultyNote();
        facultyNote2.setId(facultyNote1.getId());
        assertThat(facultyNote1).isEqualTo(facultyNote2);
        facultyNote2.setId(2L);
        assertThat(facultyNote1).isNotEqualTo(facultyNote2);
        facultyNote1.setId(null);
        assertThat(facultyNote1).isNotEqualTo(facultyNote2);
    }
}
