package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.Ta;
import edu.vcu.tams.repository.TaRepository;
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
 * Test class for the TaResource REST controller.
 *
 * @see TaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class TaResourceIntTest {

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

    private static final Integer DEFAULT_TOTAL_HOURS_AVAILABLE = 1;
    private static final Integer UPDATED_TOTAL_HOURS_AVAILABLE = 2;

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    @Autowired
    private TaRepository taRepository;

    @Mock
    private TaRepository taRepositoryMock;

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

    private MockMvc restTaMockMvc;

    private Ta ta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaResource taResource = new TaResource(taRepository);
        this.restTaMockMvc = MockMvcBuilders.standaloneSetup(taResource)
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
    public static Ta createEntity(EntityManager em) {
        Ta ta = new Ta()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .vNum(DEFAULT_V_NUM)
            .classYear(DEFAULT_CLASS_YEAR)
            .expectedGradYear(DEFAULT_EXPECTED_GRAD_YEAR)
            .expectedGradSemester(DEFAULT_EXPECTED_GRAD_SEMESTER)
            .totalHoursAvailable(DEFAULT_TOTAL_HOURS_AVAILABLE)
            .isActive(DEFAULT_IS_ACTIVE);
        return ta;
    }

    @Before
    public void initTest() {
        ta = createEntity(em);
    }

    @Test
    @Transactional
    public void createTa() throws Exception {
        int databaseSizeBeforeCreate = taRepository.findAll().size();

        // Create the Ta
        restTaMockMvc.perform(post("/api/tas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ta)))
            .andExpect(status().isCreated());

        // Validate the Ta in the database
        List<Ta> taList = taRepository.findAll();
        assertThat(taList).hasSize(databaseSizeBeforeCreate + 1);
        Ta testTa = taList.get(taList.size() - 1);
        assertThat(testTa.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTa.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testTa.getvNum()).isEqualTo(DEFAULT_V_NUM);
        assertThat(testTa.getClassYear()).isEqualTo(DEFAULT_CLASS_YEAR);
        assertThat(testTa.getExpectedGradYear()).isEqualTo(DEFAULT_EXPECTED_GRAD_YEAR);
        assertThat(testTa.getExpectedGradSemester()).isEqualTo(DEFAULT_EXPECTED_GRAD_SEMESTER);
        assertThat(testTa.getTotalHoursAvailable()).isEqualTo(DEFAULT_TOTAL_HOURS_AVAILABLE);
        assertThat(testTa.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void createTaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taRepository.findAll().size();

        // Create the Ta with an existing ID
        ta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaMockMvc.perform(post("/api/tas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ta)))
            .andExpect(status().isBadRequest());

        // Validate the Ta in the database
        List<Ta> taList = taRepository.findAll();
        assertThat(taList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTas() throws Exception {
        // Initialize the database
        taRepository.saveAndFlush(ta);

        // Get all the taList
        restTaMockMvc.perform(get("/api/tas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ta.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].vNum").value(hasItem(DEFAULT_V_NUM.toString())))
            .andExpect(jsonPath("$.[*].classYear").value(hasItem(DEFAULT_CLASS_YEAR.toString())))
            .andExpect(jsonPath("$.[*].expectedGradYear").value(hasItem(DEFAULT_EXPECTED_GRAD_YEAR)))
            .andExpect(jsonPath("$.[*].expectedGradSemester").value(hasItem(DEFAULT_EXPECTED_GRAD_SEMESTER.toString())))
            .andExpect(jsonPath("$.[*].totalHoursAvailable").value(hasItem(DEFAULT_TOTAL_HOURS_AVAILABLE)))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTasWithEagerRelationshipsIsEnabled() throws Exception {
        TaResource taResource = new TaResource(taRepositoryMock);
        when(taRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTaMockMvc = MockMvcBuilders.standaloneSetup(taResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTaMockMvc.perform(get("/api/tas?eagerload=true"))
        .andExpect(status().isOk());

        verify(taRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTasWithEagerRelationshipsIsNotEnabled() throws Exception {
        TaResource taResource = new TaResource(taRepositoryMock);
            when(taRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTaMockMvc = MockMvcBuilders.standaloneSetup(taResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTaMockMvc.perform(get("/api/tas?eagerload=true"))
        .andExpect(status().isOk());

            verify(taRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTa() throws Exception {
        // Initialize the database
        taRepository.saveAndFlush(ta);

        // Get the ta
        restTaMockMvc.perform(get("/api/tas/{id}", ta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ta.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.vNum").value(DEFAULT_V_NUM.toString()))
            .andExpect(jsonPath("$.classYear").value(DEFAULT_CLASS_YEAR.toString()))
            .andExpect(jsonPath("$.expectedGradYear").value(DEFAULT_EXPECTED_GRAD_YEAR))
            .andExpect(jsonPath("$.expectedGradSemester").value(DEFAULT_EXPECTED_GRAD_SEMESTER.toString()))
            .andExpect(jsonPath("$.totalHoursAvailable").value(DEFAULT_TOTAL_HOURS_AVAILABLE))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTa() throws Exception {
        // Get the ta
        restTaMockMvc.perform(get("/api/tas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTa() throws Exception {
        // Initialize the database
        taRepository.saveAndFlush(ta);

        int databaseSizeBeforeUpdate = taRepository.findAll().size();

        // Update the ta
        Ta updatedTa = taRepository.findById(ta.getId()).get();
        // Disconnect from session so that the updates on updatedTa are not directly saved in db
        em.detach(updatedTa);
        updatedTa
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .vNum(UPDATED_V_NUM)
            .classYear(UPDATED_CLASS_YEAR)
            .expectedGradYear(UPDATED_EXPECTED_GRAD_YEAR)
            .expectedGradSemester(UPDATED_EXPECTED_GRAD_SEMESTER)
            .totalHoursAvailable(UPDATED_TOTAL_HOURS_AVAILABLE)
            .isActive(UPDATED_IS_ACTIVE);

        restTaMockMvc.perform(put("/api/tas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTa)))
            .andExpect(status().isOk());

        // Validate the Ta in the database
        List<Ta> taList = taRepository.findAll();
        assertThat(taList).hasSize(databaseSizeBeforeUpdate);
        Ta testTa = taList.get(taList.size() - 1);
        assertThat(testTa.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTa.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testTa.getvNum()).isEqualTo(UPDATED_V_NUM);
        assertThat(testTa.getClassYear()).isEqualTo(UPDATED_CLASS_YEAR);
        assertThat(testTa.getExpectedGradYear()).isEqualTo(UPDATED_EXPECTED_GRAD_YEAR);
        assertThat(testTa.getExpectedGradSemester()).isEqualTo(UPDATED_EXPECTED_GRAD_SEMESTER);
        assertThat(testTa.getTotalHoursAvailable()).isEqualTo(UPDATED_TOTAL_HOURS_AVAILABLE);
        assertThat(testTa.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingTa() throws Exception {
        int databaseSizeBeforeUpdate = taRepository.findAll().size();

        // Create the Ta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaMockMvc.perform(put("/api/tas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ta)))
            .andExpect(status().isBadRequest());

        // Validate the Ta in the database
        List<Ta> taList = taRepository.findAll();
        assertThat(taList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTa() throws Exception {
        // Initialize the database
        taRepository.saveAndFlush(ta);

        int databaseSizeBeforeDelete = taRepository.findAll().size();

        // Delete the ta
        restTaMockMvc.perform(delete("/api/tas/{id}", ta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ta> taList = taRepository.findAll();
        assertThat(taList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ta.class);
        Ta ta1 = new Ta();
        ta1.setId(1L);
        Ta ta2 = new Ta();
        ta2.setId(ta1.getId());
        assertThat(ta1).isEqualTo(ta2);
        ta2.setId(2L);
        assertThat(ta1).isNotEqualTo(ta2);
        ta1.setId(null);
        assertThat(ta1).isNotEqualTo(ta2);
    }
}
