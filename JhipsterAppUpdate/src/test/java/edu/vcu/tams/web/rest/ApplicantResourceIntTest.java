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

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_V_NUM = "AAAAAAAAAA";
    private static final String UPDATED_V_NUM = "BBBBBBBBBB";

    private static final String DEFAULT_CLASS_YEAR = "AAAAAAAAAA";
    private static final String UPDATED_CLASS_YEAR = "BBBBBBBBBB";

    private static final Integer DEFAULT_EXPECTED_GRAD_YEAR = 1;
    private static final Integer UPDATED_EXPECTED_GRAD_YEAR = 2;

    private static final String DEFAULT_EXPECTED_GRAD_SEMESTER = "AAAAAAAAAA";
    private static final String UPDATED_EXPECTED_GRAD_SEMESTER = "BBBBBBBBBB";

    private static final String DEFAULT_STATEMENT = "AAAAAAAAAA";
    private static final String UPDATED_STATEMENT = "BBBBBBBBBB";

    private static final String DEFAULT_GRADE_255 = "AAAAAAAAAA";
    private static final String UPDATED_GRADE_255 = "BBBBBBBBBB";

    private static final String DEFAULT_GRADE_256 = "AAAAAAAAAA";
    private static final String UPDATED_GRADE_256 = "BBBBBBBBBB";

    private static final String DEFAULT_GRADE_257 = "AAAAAAAAAA";
    private static final String UPDATED_GRADE_257 = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE_RESPONSE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE_RESPONSE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_RECOMMENDED = false;
    private static final Boolean UPDATED_IS_RECOMMENDED = true;

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
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .vNum(DEFAULT_V_NUM)
            .classYear(DEFAULT_CLASS_YEAR)
            .expectedGradYear(DEFAULT_EXPECTED_GRAD_YEAR)
            .expectedGradSemester(DEFAULT_EXPECTED_GRAD_SEMESTER)
            .statement(DEFAULT_STATEMENT)
            .grade255(DEFAULT_GRADE_255)
            .grade256(DEFAULT_GRADE_256)
            .grade257(DEFAULT_GRADE_257)
            .referenceEmail(DEFAULT_REFERENCE_EMAIL)
            .referenceResponse(DEFAULT_REFERENCE_RESPONSE)
            .isRecommended(DEFAULT_IS_RECOMMENDED);
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
        assertThat(testApplicant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testApplicant.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testApplicant.getvNum()).isEqualTo(DEFAULT_V_NUM);
        assertThat(testApplicant.getClassYear()).isEqualTo(DEFAULT_CLASS_YEAR);
        assertThat(testApplicant.getExpectedGradYear()).isEqualTo(DEFAULT_EXPECTED_GRAD_YEAR);
        assertThat(testApplicant.getExpectedGradSemester()).isEqualTo(DEFAULT_EXPECTED_GRAD_SEMESTER);
        assertThat(testApplicant.getStatement()).isEqualTo(DEFAULT_STATEMENT);
        assertThat(testApplicant.getGrade255()).isEqualTo(DEFAULT_GRADE_255);
        assertThat(testApplicant.getGrade256()).isEqualTo(DEFAULT_GRADE_256);
        assertThat(testApplicant.getGrade257()).isEqualTo(DEFAULT_GRADE_257);
        assertThat(testApplicant.getReferenceEmail()).isEqualTo(DEFAULT_REFERENCE_EMAIL);
        assertThat(testApplicant.getReferenceResponse()).isEqualTo(DEFAULT_REFERENCE_RESPONSE);
        assertThat(testApplicant.isIsRecommended()).isEqualTo(DEFAULT_IS_RECOMMENDED);
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
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].vNum").value(hasItem(DEFAULT_V_NUM.toString())))
            .andExpect(jsonPath("$.[*].classYear").value(hasItem(DEFAULT_CLASS_YEAR.toString())))
            .andExpect(jsonPath("$.[*].expectedGradYear").value(hasItem(DEFAULT_EXPECTED_GRAD_YEAR)))
            .andExpect(jsonPath("$.[*].expectedGradSemester").value(hasItem(DEFAULT_EXPECTED_GRAD_SEMESTER.toString())))
            .andExpect(jsonPath("$.[*].statement").value(hasItem(DEFAULT_STATEMENT.toString())))
            .andExpect(jsonPath("$.[*].grade255").value(hasItem(DEFAULT_GRADE_255.toString())))
            .andExpect(jsonPath("$.[*].grade256").value(hasItem(DEFAULT_GRADE_256.toString())))
            .andExpect(jsonPath("$.[*].grade257").value(hasItem(DEFAULT_GRADE_257.toString())))
            .andExpect(jsonPath("$.[*].referenceEmail").value(hasItem(DEFAULT_REFERENCE_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].referenceResponse").value(hasItem(DEFAULT_REFERENCE_RESPONSE.toString())))
            .andExpect(jsonPath("$.[*].isRecommended").value(hasItem(DEFAULT_IS_RECOMMENDED.booleanValue())));
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
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.vNum").value(DEFAULT_V_NUM.toString()))
            .andExpect(jsonPath("$.classYear").value(DEFAULT_CLASS_YEAR.toString()))
            .andExpect(jsonPath("$.expectedGradYear").value(DEFAULT_EXPECTED_GRAD_YEAR))
            .andExpect(jsonPath("$.expectedGradSemester").value(DEFAULT_EXPECTED_GRAD_SEMESTER.toString()))
            .andExpect(jsonPath("$.statement").value(DEFAULT_STATEMENT.toString()))
            .andExpect(jsonPath("$.grade255").value(DEFAULT_GRADE_255.toString()))
            .andExpect(jsonPath("$.grade256").value(DEFAULT_GRADE_256.toString()))
            .andExpect(jsonPath("$.grade257").value(DEFAULT_GRADE_257.toString()))
            .andExpect(jsonPath("$.referenceEmail").value(DEFAULT_REFERENCE_EMAIL.toString()))
            .andExpect(jsonPath("$.referenceResponse").value(DEFAULT_REFERENCE_RESPONSE.toString()))
            .andExpect(jsonPath("$.isRecommended").value(DEFAULT_IS_RECOMMENDED.booleanValue()));
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
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .vNum(UPDATED_V_NUM)
            .classYear(UPDATED_CLASS_YEAR)
            .expectedGradYear(UPDATED_EXPECTED_GRAD_YEAR)
            .expectedGradSemester(UPDATED_EXPECTED_GRAD_SEMESTER)
            .statement(UPDATED_STATEMENT)
            .grade255(UPDATED_GRADE_255)
            .grade256(UPDATED_GRADE_256)
            .grade257(UPDATED_GRADE_257)
            .referenceEmail(UPDATED_REFERENCE_EMAIL)
            .referenceResponse(UPDATED_REFERENCE_RESPONSE)
            .isRecommended(UPDATED_IS_RECOMMENDED);

        restApplicantMockMvc.perform(put("/api/applicants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedApplicant)))
            .andExpect(status().isOk());

        // Validate the Applicant in the database
        List<Applicant> applicantList = applicantRepository.findAll();
        assertThat(applicantList).hasSize(databaseSizeBeforeUpdate);
        Applicant testApplicant = applicantList.get(applicantList.size() - 1);
        assertThat(testApplicant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testApplicant.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testApplicant.getvNum()).isEqualTo(UPDATED_V_NUM);
        assertThat(testApplicant.getClassYear()).isEqualTo(UPDATED_CLASS_YEAR);
        assertThat(testApplicant.getExpectedGradYear()).isEqualTo(UPDATED_EXPECTED_GRAD_YEAR);
        assertThat(testApplicant.getExpectedGradSemester()).isEqualTo(UPDATED_EXPECTED_GRAD_SEMESTER);
        assertThat(testApplicant.getStatement()).isEqualTo(UPDATED_STATEMENT);
        assertThat(testApplicant.getGrade255()).isEqualTo(UPDATED_GRADE_255);
        assertThat(testApplicant.getGrade256()).isEqualTo(UPDATED_GRADE_256);
        assertThat(testApplicant.getGrade257()).isEqualTo(UPDATED_GRADE_257);
        assertThat(testApplicant.getReferenceEmail()).isEqualTo(UPDATED_REFERENCE_EMAIL);
        assertThat(testApplicant.getReferenceResponse()).isEqualTo(UPDATED_REFERENCE_RESPONSE);
        assertThat(testApplicant.isIsRecommended()).isEqualTo(UPDATED_IS_RECOMMENDED);
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
