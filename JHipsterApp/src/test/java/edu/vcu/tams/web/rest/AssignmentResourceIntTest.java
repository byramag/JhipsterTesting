package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.Assignment;
import edu.vcu.tams.repository.AssignmentRepository;
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
 * Test class for the AssignmentResource REST controller.
 *
 * @see AssignmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class AssignmentResourceIntTest {

    private static final Long DEFAULT_TA_ID = 1L;
    private static final Long UPDATED_TA_ID = 2L;

    private static final Long DEFAULT_SECT_NO = 1L;
    private static final Long UPDATED_SECT_NO = 2L;

    @Autowired
    private AssignmentRepository assignmentRepository;

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

    private MockMvc restAssignmentMockMvc;

    private Assignment assignment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssignmentResource assignmentResource = new AssignmentResource(assignmentRepository);
        this.restAssignmentMockMvc = MockMvcBuilders.standaloneSetup(assignmentResource)
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
    public static Assignment createEntity(EntityManager em) {
        Assignment assignment = new Assignment()
            .taID(DEFAULT_TA_ID)
            .sectNo(DEFAULT_SECT_NO);
        return assignment;
    }

    @Before
    public void initTest() {
        assignment = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssignment() throws Exception {
        int databaseSizeBeforeCreate = assignmentRepository.findAll().size();

        // Create the Assignment
        restAssignmentMockMvc.perform(post("/api/assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignment)))
            .andExpect(status().isCreated());

        // Validate the Assignment in the database
        List<Assignment> assignmentList = assignmentRepository.findAll();
        assertThat(assignmentList).hasSize(databaseSizeBeforeCreate + 1);
        Assignment testAssignment = assignmentList.get(assignmentList.size() - 1);
        assertThat(testAssignment.getTaID()).isEqualTo(DEFAULT_TA_ID);
        assertThat(testAssignment.getSectNo()).isEqualTo(DEFAULT_SECT_NO);
    }

    @Test
    @Transactional
    public void createAssignmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assignmentRepository.findAll().size();

        // Create the Assignment with an existing ID
        assignment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssignmentMockMvc.perform(post("/api/assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignment)))
            .andExpect(status().isBadRequest());

        // Validate the Assignment in the database
        List<Assignment> assignmentList = assignmentRepository.findAll();
        assertThat(assignmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAssignments() throws Exception {
        // Initialize the database
        assignmentRepository.saveAndFlush(assignment);

        // Get all the assignmentList
        restAssignmentMockMvc.perform(get("/api/assignments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assignment.getId().intValue())))
            .andExpect(jsonPath("$.[*].taID").value(hasItem(DEFAULT_TA_ID.intValue())))
            .andExpect(jsonPath("$.[*].sectNo").value(hasItem(DEFAULT_SECT_NO.intValue())));
    }
    
    @Test
    @Transactional
    public void getAssignment() throws Exception {
        // Initialize the database
        assignmentRepository.saveAndFlush(assignment);

        // Get the assignment
        restAssignmentMockMvc.perform(get("/api/assignments/{id}", assignment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assignment.getId().intValue()))
            .andExpect(jsonPath("$.taID").value(DEFAULT_TA_ID.intValue()))
            .andExpect(jsonPath("$.sectNo").value(DEFAULT_SECT_NO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAssignment() throws Exception {
        // Get the assignment
        restAssignmentMockMvc.perform(get("/api/assignments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssignment() throws Exception {
        // Initialize the database
        assignmentRepository.saveAndFlush(assignment);

        int databaseSizeBeforeUpdate = assignmentRepository.findAll().size();

        // Update the assignment
        Assignment updatedAssignment = assignmentRepository.findById(assignment.getId()).get();
        // Disconnect from session so that the updates on updatedAssignment are not directly saved in db
        em.detach(updatedAssignment);
        updatedAssignment
            .taID(UPDATED_TA_ID)
            .sectNo(UPDATED_SECT_NO);

        restAssignmentMockMvc.perform(put("/api/assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssignment)))
            .andExpect(status().isOk());

        // Validate the Assignment in the database
        List<Assignment> assignmentList = assignmentRepository.findAll();
        assertThat(assignmentList).hasSize(databaseSizeBeforeUpdate);
        Assignment testAssignment = assignmentList.get(assignmentList.size() - 1);
        assertThat(testAssignment.getTaID()).isEqualTo(UPDATED_TA_ID);
        assertThat(testAssignment.getSectNo()).isEqualTo(UPDATED_SECT_NO);
    }

    @Test
    @Transactional
    public void updateNonExistingAssignment() throws Exception {
        int databaseSizeBeforeUpdate = assignmentRepository.findAll().size();

        // Create the Assignment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssignmentMockMvc.perform(put("/api/assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignment)))
            .andExpect(status().isBadRequest());

        // Validate the Assignment in the database
        List<Assignment> assignmentList = assignmentRepository.findAll();
        assertThat(assignmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAssignment() throws Exception {
        // Initialize the database
        assignmentRepository.saveAndFlush(assignment);

        int databaseSizeBeforeDelete = assignmentRepository.findAll().size();

        // Delete the assignment
        restAssignmentMockMvc.perform(delete("/api/assignments/{id}", assignment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Assignment> assignmentList = assignmentRepository.findAll();
        assertThat(assignmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Assignment.class);
        Assignment assignment1 = new Assignment();
        assignment1.setId(1L);
        Assignment assignment2 = new Assignment();
        assignment2.setId(assignment1.getId());
        assertThat(assignment1).isEqualTo(assignment2);
        assignment2.setId(2L);
        assertThat(assignment1).isNotEqualTo(assignment2);
        assignment1.setId(null);
        assertThat(assignment1).isNotEqualTo(assignment2);
    }
}
