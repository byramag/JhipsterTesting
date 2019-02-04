package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.TA;
import edu.vcu.tams.repository.TARepository;
import edu.vcu.tams.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static edu.vcu.tams.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TAResource REST controller.
 *
 * @see TAResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class TAResourceIntTest {

    private static final String DEFAULT_STUDENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STUDENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_V_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_V_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_CLASS_YEAR = "AAAAAAAAAA";
    private static final String UPDATED_CLASS_YEAR = "BBBBBBBBBB";

    private static final String DEFAULT_CURRENT_ASSIGN = "AAAAAAAAAA";
    private static final String UPDATED_CURRENT_ASSIGN = "BBBBBBBBBB";

    private static final String DEFAULT_PREVIOUS_ASSIGN = "AAAAAAAAAA";
    private static final String UPDATED_PREVIOUS_ASSIGN = "BBBBBBBBBB";

    private static final String DEFAULT_PTD_LAB_TA = "AAAAAAAAAA";
    private static final String UPDATED_PTD_LAB_TA = "BBBBBBBBBB";

    private static final String DEFAULT_PTD_CLASS_TA = "AAAAAAAAAA";
    private static final String UPDATED_PTD_CLASS_TA = "BBBBBBBBBB";

    private static final String DEFAULT_PTD_TEST_GRADE = "AAAAAAAAAA";
    private static final String UPDATED_PTD_TEST_GRADE = "BBBBBBBBBB";

    private static final String DEFAULT_PTD_OFFICE_HOURS = "AAAAAAAAAA";
    private static final String UPDATED_PTD_OFFICE_HOURS = "BBBBBBBBBB";

    private static final String DEFAULT_ACCEPTED_COURSES = "AAAAAAAAAA";
    private static final String UPDATED_ACCEPTED_COURSES = "BBBBBBBBBB";

    @Autowired
    private TARepository tARepository;

    @Mock
    private TARepository tARepositoryMock;

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

    private MockMvc restTAMockMvc;

    private TA tA;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TAResource tAResource = new TAResource(tARepository);
        this.restTAMockMvc = MockMvcBuilders.standaloneSetup(tAResource)
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
    public static TA createEntity(EntityManager em) {
        TA tA = new TA()
            .studentName(DEFAULT_STUDENT_NAME)
            .vNumber(DEFAULT_V_NUMBER)
            .email(DEFAULT_EMAIL)
            .classYear(DEFAULT_CLASS_YEAR)
            .currentAssign(DEFAULT_CURRENT_ASSIGN)
            .previousAssign(DEFAULT_PREVIOUS_ASSIGN)
            .ptdLabTA(DEFAULT_PTD_LAB_TA)
            .ptdClassTA(DEFAULT_PTD_CLASS_TA)
            .ptdTestGrade(DEFAULT_PTD_TEST_GRADE)
            .ptdOfficeHours(DEFAULT_PTD_OFFICE_HOURS)
            .acceptedCourses(DEFAULT_ACCEPTED_COURSES);
        return tA;
    }

    @Before
    public void initTest() {
        tA = createEntity(em);
    }

    @Test
    @Transactional
    public void createTA() throws Exception {
        int databaseSizeBeforeCreate = tARepository.findAll().size();

        // Create the TA
        restTAMockMvc.perform(post("/api/tas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tA)))
            .andExpect(status().isCreated());

        // Validate the TA in the database
        List<TA> tAList = tARepository.findAll();
        assertThat(tAList).hasSize(databaseSizeBeforeCreate + 1);
        TA testTA = tAList.get(tAList.size() - 1);
        assertThat(testTA.getStudentName()).isEqualTo(DEFAULT_STUDENT_NAME);
        assertThat(testTA.getvNumber()).isEqualTo(DEFAULT_V_NUMBER);
        assertThat(testTA.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testTA.getClassYear()).isEqualTo(DEFAULT_CLASS_YEAR);
        assertThat(testTA.getCurrentAssign()).isEqualTo(DEFAULT_CURRENT_ASSIGN);
        assertThat(testTA.getPreviousAssign()).isEqualTo(DEFAULT_PREVIOUS_ASSIGN);
        assertThat(testTA.getPtdLabTA()).isEqualTo(DEFAULT_PTD_LAB_TA);
        assertThat(testTA.getPtdClassTA()).isEqualTo(DEFAULT_PTD_CLASS_TA);
        assertThat(testTA.getPtdTestGrade()).isEqualTo(DEFAULT_PTD_TEST_GRADE);
        assertThat(testTA.getPtdOfficeHours()).isEqualTo(DEFAULT_PTD_OFFICE_HOURS);
        assertThat(testTA.getAcceptedCourses()).isEqualTo(DEFAULT_ACCEPTED_COURSES);
    }

    @Test
    @Transactional
    public void createTAWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tARepository.findAll().size();

        // Create the TA with an existing ID
        tA.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTAMockMvc.perform(post("/api/tas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tA)))
            .andExpect(status().isBadRequest());

        // Validate the TA in the database
        List<TA> tAList = tARepository.findAll();
        assertThat(tAList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTAS() throws Exception {
        // Initialize the database
        tARepository.saveAndFlush(tA);

        // Get all the tAList
        restTAMockMvc.perform(get("/api/tas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tA.getId().intValue())))
            .andExpect(jsonPath("$.[*].studentName").value(hasItem(DEFAULT_STUDENT_NAME.toString())))
            .andExpect(jsonPath("$.[*].vNumber").value(hasItem(DEFAULT_V_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].classYear").value(hasItem(DEFAULT_CLASS_YEAR.toString())))
            .andExpect(jsonPath("$.[*].currentAssign").value(hasItem(DEFAULT_CURRENT_ASSIGN.toString())))
            .andExpect(jsonPath("$.[*].previousAssign").value(hasItem(DEFAULT_PREVIOUS_ASSIGN.toString())))
            .andExpect(jsonPath("$.[*].ptdLabTA").value(hasItem(DEFAULT_PTD_LAB_TA.toString())))
            .andExpect(jsonPath("$.[*].ptdClassTA").value(hasItem(DEFAULT_PTD_CLASS_TA.toString())))
            .andExpect(jsonPath("$.[*].ptdTestGrade").value(hasItem(DEFAULT_PTD_TEST_GRADE.toString())))
            .andExpect(jsonPath("$.[*].ptdOfficeHours").value(hasItem(DEFAULT_PTD_OFFICE_HOURS.toString())))
            .andExpect(jsonPath("$.[*].acceptedCourses").value(hasItem(DEFAULT_ACCEPTED_COURSES.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTASWithEagerRelationshipsIsEnabled() throws Exception {
        TAResource tAResource = new TAResource(tARepositoryMock);
        when(tARepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTAMockMvc = MockMvcBuilders.standaloneSetup(tAResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTAMockMvc.perform(get("/api/tas?eagerload=true"))
        .andExpect(status().isOk());

        verify(tARepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTASWithEagerRelationshipsIsNotEnabled() throws Exception {
        TAResource tAResource = new TAResource(tARepositoryMock);
            when(tARepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTAMockMvc = MockMvcBuilders.standaloneSetup(tAResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTAMockMvc.perform(get("/api/tas?eagerload=true"))
        .andExpect(status().isOk());

            verify(tARepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTA() throws Exception {
        // Initialize the database
        tARepository.saveAndFlush(tA);

        // Get the tA
        restTAMockMvc.perform(get("/api/tas/{id}", tA.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tA.getId().intValue()))
            .andExpect(jsonPath("$.studentName").value(DEFAULT_STUDENT_NAME.toString()))
            .andExpect(jsonPath("$.vNumber").value(DEFAULT_V_NUMBER.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.classYear").value(DEFAULT_CLASS_YEAR.toString()))
            .andExpect(jsonPath("$.currentAssign").value(DEFAULT_CURRENT_ASSIGN.toString()))
            .andExpect(jsonPath("$.previousAssign").value(DEFAULT_PREVIOUS_ASSIGN.toString()))
            .andExpect(jsonPath("$.ptdLabTA").value(DEFAULT_PTD_LAB_TA.toString()))
            .andExpect(jsonPath("$.ptdClassTA").value(DEFAULT_PTD_CLASS_TA.toString()))
            .andExpect(jsonPath("$.ptdTestGrade").value(DEFAULT_PTD_TEST_GRADE.toString()))
            .andExpect(jsonPath("$.ptdOfficeHours").value(DEFAULT_PTD_OFFICE_HOURS.toString()))
            .andExpect(jsonPath("$.acceptedCourses").value(DEFAULT_ACCEPTED_COURSES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTA() throws Exception {
        // Get the tA
        restTAMockMvc.perform(get("/api/tas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTA() throws Exception {
        // Initialize the database
        tARepository.saveAndFlush(tA);

        int databaseSizeBeforeUpdate = tARepository.findAll().size();

        // Update the tA
        TA updatedTA = tARepository.findById(tA.getId()).get();
        // Disconnect from session so that the updates on updatedTA are not directly saved in db
        em.detach(updatedTA);
        updatedTA
            .studentName(UPDATED_STUDENT_NAME)
            .vNumber(UPDATED_V_NUMBER)
            .email(UPDATED_EMAIL)
            .classYear(UPDATED_CLASS_YEAR)
            .currentAssign(UPDATED_CURRENT_ASSIGN)
            .previousAssign(UPDATED_PREVIOUS_ASSIGN)
            .ptdLabTA(UPDATED_PTD_LAB_TA)
            .ptdClassTA(UPDATED_PTD_CLASS_TA)
            .ptdTestGrade(UPDATED_PTD_TEST_GRADE)
            .ptdOfficeHours(UPDATED_PTD_OFFICE_HOURS)
            .acceptedCourses(UPDATED_ACCEPTED_COURSES);

        restTAMockMvc.perform(put("/api/tas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTA)))
            .andExpect(status().isOk());

        // Validate the TA in the database
        List<TA> tAList = tARepository.findAll();
        assertThat(tAList).hasSize(databaseSizeBeforeUpdate);
        TA testTA = tAList.get(tAList.size() - 1);
        assertThat(testTA.getStudentName()).isEqualTo(UPDATED_STUDENT_NAME);
        assertThat(testTA.getvNumber()).isEqualTo(UPDATED_V_NUMBER);
        assertThat(testTA.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testTA.getClassYear()).isEqualTo(UPDATED_CLASS_YEAR);
        assertThat(testTA.getCurrentAssign()).isEqualTo(UPDATED_CURRENT_ASSIGN);
        assertThat(testTA.getPreviousAssign()).isEqualTo(UPDATED_PREVIOUS_ASSIGN);
        assertThat(testTA.getPtdLabTA()).isEqualTo(UPDATED_PTD_LAB_TA);
        assertThat(testTA.getPtdClassTA()).isEqualTo(UPDATED_PTD_CLASS_TA);
        assertThat(testTA.getPtdTestGrade()).isEqualTo(UPDATED_PTD_TEST_GRADE);
        assertThat(testTA.getPtdOfficeHours()).isEqualTo(UPDATED_PTD_OFFICE_HOURS);
        assertThat(testTA.getAcceptedCourses()).isEqualTo(UPDATED_ACCEPTED_COURSES);
    }

    @Test
    @Transactional
    public void updateNonExistingTA() throws Exception {
        int databaseSizeBeforeUpdate = tARepository.findAll().size();

        // Create the TA

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTAMockMvc.perform(put("/api/tas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tA)))
            .andExpect(status().isBadRequest());

        // Validate the TA in the database
        List<TA> tAList = tARepository.findAll();
        assertThat(tAList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTA() throws Exception {
        // Initialize the database
        tARepository.saveAndFlush(tA);

        int databaseSizeBeforeDelete = tARepository.findAll().size();

        // Delete the tA
        restTAMockMvc.perform(delete("/api/tas/{id}", tA.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TA> tAList = tARepository.findAll();
        assertThat(tAList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TA.class);
        TA tA1 = new TA();
        tA1.setId(1L);
        TA tA2 = new TA();
        tA2.setId(tA1.getId());
        assertThat(tA1).isEqualTo(tA2);
        tA2.setId(2L);
        assertThat(tA1).isNotEqualTo(tA2);
        tA1.setId(null);
        assertThat(tA1).isNotEqualTo(tA2);
    }
}
