package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.Applicant;
import edu.vcu.tams.repository.ApplicantRepository;
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
 * Test class for the ApplicantResource REST controller.
 *
 * @see ApplicantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class ApplicantResourceIntTest {

    private static final String DEFAULT_STUDENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STUDENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_V_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_V_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TA_MOTIVATION = "AAAAAAAAAA";
    private static final String UPDATED_TA_MOTIVATION = "BBBBBBBBBB";

    private static final String DEFAULT_REF_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REF_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_REF_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_REF_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_REF_RESPONSE = "AAAAAAAAAA";
    private static final String UPDATED_REF_RESPONSE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_CONFIRMED = false;
    private static final Boolean UPDATED_IS_CONFIRMED = true;

    @Autowired
    private ApplicantRepository applicantRepository;

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

    private MockMvc restApplicantMockMvc;

    private Applicant applicant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApplicantResource applicantResource = new ApplicantResource(applicantRepository);
        this.restApplicantMockMvc = MockMvcBuilders.standaloneSetup(applicantResource)
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
    public static Applicant createEntity(EntityManager em) {
        Applicant applicant = new Applicant()
            .studentName(DEFAULT_STUDENT_NAME)
            .vNumber(DEFAULT_V_NUMBER)
            .email(DEFAULT_EMAIL)
            .taMotivation(DEFAULT_TA_MOTIVATION)
            .refName(DEFAULT_REF_NAME)
            .refEmail(DEFAULT_REF_EMAIL)
            .refResponse(DEFAULT_REF_RESPONSE)
            .isConfirmed(DEFAULT_IS_CONFIRMED);
        return applicant;
    }

    @Before
    public void initTest() {
        applicant = createEntity(em);
    }

    @Test
    @Transactional
    public void createApplicant() throws Exception {
        int databaseSizeBeforeCreate = applicantRepository.findAll().size();

        // Create the Applicant
        restApplicantMockMvc.perform(post("/api/applicants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicant)))
            .andExpect(status().isCreated());

        // Validate the Applicant in the database
        List<Applicant> applicantList = applicantRepository.findAll();
        assertThat(applicantList).hasSize(databaseSizeBeforeCreate + 1);
        Applicant testApplicant = applicantList.get(applicantList.size() - 1);
        assertThat(testApplicant.getStudentName()).isEqualTo(DEFAULT_STUDENT_NAME);
        assertThat(testApplicant.getvNumber()).isEqualTo(DEFAULT_V_NUMBER);
        assertThat(testApplicant.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testApplicant.getTaMotivation()).isEqualTo(DEFAULT_TA_MOTIVATION);
        assertThat(testApplicant.getRefName()).isEqualTo(DEFAULT_REF_NAME);
        assertThat(testApplicant.getRefEmail()).isEqualTo(DEFAULT_REF_EMAIL);
        assertThat(testApplicant.getRefResponse()).isEqualTo(DEFAULT_REF_RESPONSE);
        assertThat(testApplicant.isIsConfirmed()).isEqualTo(DEFAULT_IS_CONFIRMED);
    }

    @Test
    @Transactional
    public void createApplicantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicantRepository.findAll().size();

        // Create the Applicant with an existing ID
        applicant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicantMockMvc.perform(post("/api/applicants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicant)))
            .andExpect(status().isBadRequest());

        // Validate the Applicant in the database
        List<Applicant> applicantList = applicantRepository.findAll();
        assertThat(applicantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllApplicants() throws Exception {
        // Initialize the database
        applicantRepository.saveAndFlush(applicant);

        // Get all the applicantList
        restApplicantMockMvc.perform(get("/api/applicants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(applicant.getId().intValue())))
            .andExpect(jsonPath("$.[*].studentName").value(hasItem(DEFAULT_STUDENT_NAME.toString())))
            .andExpect(jsonPath("$.[*].vNumber").value(hasItem(DEFAULT_V_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].taMotivation").value(hasItem(DEFAULT_TA_MOTIVATION.toString())))
            .andExpect(jsonPath("$.[*].refName").value(hasItem(DEFAULT_REF_NAME.toString())))
            .andExpect(jsonPath("$.[*].refEmail").value(hasItem(DEFAULT_REF_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].refResponse").value(hasItem(DEFAULT_REF_RESPONSE.toString())))
            .andExpect(jsonPath("$.[*].isConfirmed").value(hasItem(DEFAULT_IS_CONFIRMED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getApplicant() throws Exception {
        // Initialize the database
        applicantRepository.saveAndFlush(applicant);

        // Get the applicant
        restApplicantMockMvc.perform(get("/api/applicants/{id}", applicant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(applicant.getId().intValue()))
            .andExpect(jsonPath("$.studentName").value(DEFAULT_STUDENT_NAME.toString()))
            .andExpect(jsonPath("$.vNumber").value(DEFAULT_V_NUMBER.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.taMotivation").value(DEFAULT_TA_MOTIVATION.toString()))
            .andExpect(jsonPath("$.refName").value(DEFAULT_REF_NAME.toString()))
            .andExpect(jsonPath("$.refEmail").value(DEFAULT_REF_EMAIL.toString()))
            .andExpect(jsonPath("$.refResponse").value(DEFAULT_REF_RESPONSE.toString()))
            .andExpect(jsonPath("$.isConfirmed").value(DEFAULT_IS_CONFIRMED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingApplicant() throws Exception {
        // Get the applicant
        restApplicantMockMvc.perform(get("/api/applicants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApplicant() throws Exception {
        // Initialize the database
        applicantRepository.saveAndFlush(applicant);

        int databaseSizeBeforeUpdate = applicantRepository.findAll().size();

        // Update the applicant
        Applicant updatedApplicant = applicantRepository.findById(applicant.getId()).get();
        // Disconnect from session so that the updates on updatedApplicant are not directly saved in db
        em.detach(updatedApplicant);
        updatedApplicant
            .studentName(UPDATED_STUDENT_NAME)
            .vNumber(UPDATED_V_NUMBER)
            .email(UPDATED_EMAIL)
            .taMotivation(UPDATED_TA_MOTIVATION)
            .refName(UPDATED_REF_NAME)
            .refEmail(UPDATED_REF_EMAIL)
            .refResponse(UPDATED_REF_RESPONSE)
            .isConfirmed(UPDATED_IS_CONFIRMED);

        restApplicantMockMvc.perform(put("/api/applicants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedApplicant)))
            .andExpect(status().isOk());

        // Validate the Applicant in the database
        List<Applicant> applicantList = applicantRepository.findAll();
        assertThat(applicantList).hasSize(databaseSizeBeforeUpdate);
        Applicant testApplicant = applicantList.get(applicantList.size() - 1);
        assertThat(testApplicant.getStudentName()).isEqualTo(UPDATED_STUDENT_NAME);
        assertThat(testApplicant.getvNumber()).isEqualTo(UPDATED_V_NUMBER);
        assertThat(testApplicant.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testApplicant.getTaMotivation()).isEqualTo(UPDATED_TA_MOTIVATION);
        assertThat(testApplicant.getRefName()).isEqualTo(UPDATED_REF_NAME);
        assertThat(testApplicant.getRefEmail()).isEqualTo(UPDATED_REF_EMAIL);
        assertThat(testApplicant.getRefResponse()).isEqualTo(UPDATED_REF_RESPONSE);
        assertThat(testApplicant.isIsConfirmed()).isEqualTo(UPDATED_IS_CONFIRMED);
    }

    @Test
    @Transactional
    public void updateNonExistingApplicant() throws Exception {
        int databaseSizeBeforeUpdate = applicantRepository.findAll().size();

        // Create the Applicant

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApplicantMockMvc.perform(put("/api/applicants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicant)))
            .andExpect(status().isBadRequest());

        // Validate the Applicant in the database
        List<Applicant> applicantList = applicantRepository.findAll();
        assertThat(applicantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApplicant() throws Exception {
        // Initialize the database
        applicantRepository.saveAndFlush(applicant);

        int databaseSizeBeforeDelete = applicantRepository.findAll().size();

        // Delete the applicant
        restApplicantMockMvc.perform(delete("/api/applicants/{id}", applicant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Applicant> applicantList = applicantRepository.findAll();
        assertThat(applicantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Applicant.class);
        Applicant applicant1 = new Applicant();
        applicant1.setId(1L);
        Applicant applicant2 = new Applicant();
        applicant2.setId(applicant1.getId());
        assertThat(applicant1).isEqualTo(applicant2);
        applicant2.setId(2L);
        assertThat(applicant1).isNotEqualTo(applicant2);
        applicant1.setId(null);
        assertThat(applicant1).isNotEqualTo(applicant2);
    }
}
