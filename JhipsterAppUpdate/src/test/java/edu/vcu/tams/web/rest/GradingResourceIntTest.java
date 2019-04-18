package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.Grading;
import edu.vcu.tams.repository.GradingRepository;
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
import java.util.List;


import static edu.vcu.tams.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GradingResource REST controller.
 *
 * @see GradingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class GradingResourceIntTest {

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUM_ASSIGNED = 1;
    private static final Integer UPDATED_NUM_ASSIGNED = 2;

    private static final Integer DEFAULT_NUM_COMPLETED = 1;
    private static final Integer UPDATED_NUM_COMPLETED = 2;

    @Autowired
    private GradingRepository gradingRepository;

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

    private MockMvc restGradingMockMvc;

    private Grading grading;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GradingResource gradingResource = new GradingResource(gradingRepository);
        this.restGradingMockMvc = MockMvcBuilders.standaloneSetup(gradingResource)
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
    public static Grading createEntity(EntityManager em) {
        Grading grading = new Grading()
            .status(DEFAULT_STATUS)
            .numAssigned(DEFAULT_NUM_ASSIGNED)
            .numCompleted(DEFAULT_NUM_COMPLETED);
        return grading;
    }

    @Before
    public void initTest() {
        grading = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrading() throws Exception {
        int databaseSizeBeforeCreate = gradingRepository.findAll().size();

        // Create the Grading
        restGradingMockMvc.perform(post("/api/gradings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grading)))
            .andExpect(status().isCreated());

        // Validate the Grading in the database
        List<Grading> gradingList = gradingRepository.findAll();
        assertThat(gradingList).hasSize(databaseSizeBeforeCreate + 1);
        Grading testGrading = gradingList.get(gradingList.size() - 1);
        assertThat(testGrading.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testGrading.getNumAssigned()).isEqualTo(DEFAULT_NUM_ASSIGNED);
        assertThat(testGrading.getNumCompleted()).isEqualTo(DEFAULT_NUM_COMPLETED);
    }

    @Test
    @Transactional
    public void createGradingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gradingRepository.findAll().size();

        // Create the Grading with an existing ID
        grading.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGradingMockMvc.perform(post("/api/gradings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grading)))
            .andExpect(status().isBadRequest());

        // Validate the Grading in the database
        List<Grading> gradingList = gradingRepository.findAll();
        assertThat(gradingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGradings() throws Exception {
        // Initialize the database
        gradingRepository.saveAndFlush(grading);

        // Get all the gradingList
        restGradingMockMvc.perform(get("/api/gradings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grading.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].numAssigned").value(hasItem(DEFAULT_NUM_ASSIGNED)))
            .andExpect(jsonPath("$.[*].numCompleted").value(hasItem(DEFAULT_NUM_COMPLETED)));
    }
    
    @Test
    @Transactional
    public void getGrading() throws Exception {
        // Initialize the database
        gradingRepository.saveAndFlush(grading);

        // Get the grading
        restGradingMockMvc.perform(get("/api/gradings/{id}", grading.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(grading.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.numAssigned").value(DEFAULT_NUM_ASSIGNED))
            .andExpect(jsonPath("$.numCompleted").value(DEFAULT_NUM_COMPLETED));
    }

    @Test
    @Transactional
    public void getNonExistingGrading() throws Exception {
        // Get the grading
        restGradingMockMvc.perform(get("/api/gradings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrading() throws Exception {
        // Initialize the database
        gradingRepository.saveAndFlush(grading);

        int databaseSizeBeforeUpdate = gradingRepository.findAll().size();

        // Update the grading
        Grading updatedGrading = gradingRepository.findById(grading.getId()).get();
        // Disconnect from session so that the updates on updatedGrading are not directly saved in db
        em.detach(updatedGrading);
        updatedGrading
            .status(UPDATED_STATUS)
            .numAssigned(UPDATED_NUM_ASSIGNED)
            .numCompleted(UPDATED_NUM_COMPLETED);

        restGradingMockMvc.perform(put("/api/gradings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrading)))
            .andExpect(status().isOk());

        // Validate the Grading in the database
        List<Grading> gradingList = gradingRepository.findAll();
        assertThat(gradingList).hasSize(databaseSizeBeforeUpdate);
        Grading testGrading = gradingList.get(gradingList.size() - 1);
        assertThat(testGrading.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testGrading.getNumAssigned()).isEqualTo(UPDATED_NUM_ASSIGNED);
        assertThat(testGrading.getNumCompleted()).isEqualTo(UPDATED_NUM_COMPLETED);
    }

    @Test
    @Transactional
    public void updateNonExistingGrading() throws Exception {
        int databaseSizeBeforeUpdate = gradingRepository.findAll().size();

        // Create the Grading

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGradingMockMvc.perform(put("/api/gradings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grading)))
            .andExpect(status().isBadRequest());

        // Validate the Grading in the database
        List<Grading> gradingList = gradingRepository.findAll();
        assertThat(gradingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGrading() throws Exception {
        // Initialize the database
        gradingRepository.saveAndFlush(grading);

        int databaseSizeBeforeDelete = gradingRepository.findAll().size();

        // Delete the grading
        restGradingMockMvc.perform(delete("/api/gradings/{id}", grading.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Grading> gradingList = gradingRepository.findAll();
        assertThat(gradingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Grading.class);
        Grading grading1 = new Grading();
        grading1.setId(1L);
        Grading grading2 = new Grading();
        grading2.setId(grading1.getId());
        assertThat(grading1).isEqualTo(grading2);
        grading2.setId(2L);
        assertThat(grading1).isNotEqualTo(grading2);
        grading1.setId(null);
        assertThat(grading1).isNotEqualTo(grading2);
    }
}
