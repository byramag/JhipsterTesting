package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.TaRole;
import edu.vcu.tams.repository.TaRoleRepository;
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

import edu.vcu.tams.domain.enumeration.Role;
/**
 * Test class for the TaRoleResource REST controller.
 *
 * @see TaRoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class TaRoleResourceIntTest {

    private static final Role DEFAULT_ROLE = Role.TUTOR;
    private static final Role UPDATED_ROLE = Role.LAB_TA;

    @Autowired
    private TaRoleRepository taRoleRepository;

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

    private MockMvc restTaRoleMockMvc;

    private TaRole taRole;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaRoleResource taRoleResource = new TaRoleResource(taRoleRepository);
        this.restTaRoleMockMvc = MockMvcBuilders.standaloneSetup(taRoleResource)
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
    public static TaRole createEntity(EntityManager em) {
        TaRole taRole = new TaRole()
            .role(DEFAULT_ROLE);
        return taRole;
    }

    @Before
    public void initTest() {
        taRole = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaRole() throws Exception {
        int databaseSizeBeforeCreate = taRoleRepository.findAll().size();

        // Create the TaRole
        restTaRoleMockMvc.perform(post("/api/ta-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taRole)))
            .andExpect(status().isCreated());

        // Validate the TaRole in the database
        List<TaRole> taRoleList = taRoleRepository.findAll();
        assertThat(taRoleList).hasSize(databaseSizeBeforeCreate + 1);
        TaRole testTaRole = taRoleList.get(taRoleList.size() - 1);
        assertThat(testTaRole.getRole()).isEqualTo(DEFAULT_ROLE);
    }

    @Test
    @Transactional
    public void createTaRoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taRoleRepository.findAll().size();

        // Create the TaRole with an existing ID
        taRole.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaRoleMockMvc.perform(post("/api/ta-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taRole)))
            .andExpect(status().isBadRequest());

        // Validate the TaRole in the database
        List<TaRole> taRoleList = taRoleRepository.findAll();
        assertThat(taRoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTaRoles() throws Exception {
        // Initialize the database
        taRoleRepository.saveAndFlush(taRole);

        // Get all the taRoleList
        restTaRoleMockMvc.perform(get("/api/ta-roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taRole.getId().intValue())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())));
    }
    
    @Test
    @Transactional
    public void getTaRole() throws Exception {
        // Initialize the database
        taRoleRepository.saveAndFlush(taRole);

        // Get the taRole
        restTaRoleMockMvc.perform(get("/api/ta-roles/{id}", taRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taRole.getId().intValue()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTaRole() throws Exception {
        // Get the taRole
        restTaRoleMockMvc.perform(get("/api/ta-roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaRole() throws Exception {
        // Initialize the database
        taRoleRepository.saveAndFlush(taRole);

        int databaseSizeBeforeUpdate = taRoleRepository.findAll().size();

        // Update the taRole
        TaRole updatedTaRole = taRoleRepository.findById(taRole.getId()).get();
        // Disconnect from session so that the updates on updatedTaRole are not directly saved in db
        em.detach(updatedTaRole);
        updatedTaRole
            .role(UPDATED_ROLE);

        restTaRoleMockMvc.perform(put("/api/ta-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTaRole)))
            .andExpect(status().isOk());

        // Validate the TaRole in the database
        List<TaRole> taRoleList = taRoleRepository.findAll();
        assertThat(taRoleList).hasSize(databaseSizeBeforeUpdate);
        TaRole testTaRole = taRoleList.get(taRoleList.size() - 1);
        assertThat(testTaRole.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTaRole() throws Exception {
        int databaseSizeBeforeUpdate = taRoleRepository.findAll().size();

        // Create the TaRole

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaRoleMockMvc.perform(put("/api/ta-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taRole)))
            .andExpect(status().isBadRequest());

        // Validate the TaRole in the database
        List<TaRole> taRoleList = taRoleRepository.findAll();
        assertThat(taRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTaRole() throws Exception {
        // Initialize the database
        taRoleRepository.saveAndFlush(taRole);

        int databaseSizeBeforeDelete = taRoleRepository.findAll().size();

        // Delete the taRole
        restTaRoleMockMvc.perform(delete("/api/ta-roles/{id}", taRole.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TaRole> taRoleList = taRoleRepository.findAll();
        assertThat(taRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaRole.class);
        TaRole taRole1 = new TaRole();
        taRole1.setId(1L);
        TaRole taRole2 = new TaRole();
        taRole2.setId(taRole1.getId());
        assertThat(taRole1).isEqualTo(taRole2);
        taRole2.setId(2L);
        assertThat(taRole1).isNotEqualTo(taRole2);
        taRole1.setId(null);
        assertThat(taRole1).isNotEqualTo(taRole2);
    }
}
