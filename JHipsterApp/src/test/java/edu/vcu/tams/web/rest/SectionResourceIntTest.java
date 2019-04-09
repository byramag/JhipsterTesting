package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.Section;
import edu.vcu.tams.repository.SectionRepository;
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
 * Test class for the SectionResource REST controller.
 *
 * @see SectionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class SectionResourceIntTest {

    private static final Long DEFAULT_CRN = 1L;
    private static final Long UPDATED_CRN = 2L;

    private static final Long DEFAULT_SECT_NO = 1L;
    private static final Long UPDATED_SECT_NO = 2L;

    private static final String DEFAULT_SEMESTER = "AAAAAAAAAA";
    private static final String UPDATED_SEMESTER = "BBBBBBBBBB";

    private static final String DEFAULT_LECTURE_TIME = "AAAAAAAAAA";
    private static final String UPDATED_LECTURE_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_LAB_TIME = "AAAAAAAAAA";
    private static final String UPDATED_LAB_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_LECTURE_ROOM = "AAAAAAAAAA";
    private static final String UPDATED_LECTURE_ROOM = "BBBBBBBBBB";

    private static final String DEFAULT_LAB_ROOM = "AAAAAAAAAA";
    private static final String UPDATED_LAB_ROOM = "BBBBBBBBBB";

    private static final Long DEFAULT_CAPACITY = 1L;
    private static final Long UPDATED_CAPACITY = 2L;

    @Autowired
    private SectionRepository sectionRepository;

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

    private MockMvc restSectionMockMvc;

    private Section section;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SectionResource sectionResource = new SectionResource(sectionRepository);
        this.restSectionMockMvc = MockMvcBuilders.standaloneSetup(sectionResource)
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
    public static Section createEntity(EntityManager em) {
        Section section = new Section()
            .crn(DEFAULT_CRN)
            .sectNo(DEFAULT_SECT_NO)
            .semester(DEFAULT_SEMESTER)
            .lectureTime(DEFAULT_LECTURE_TIME)
            .labTime(DEFAULT_LAB_TIME)
            .lectureRoom(DEFAULT_LECTURE_ROOM)
            .labRoom(DEFAULT_LAB_ROOM)
            .capacity(DEFAULT_CAPACITY);
        return section;
    }

    @Before
    public void initTest() {
        section = createEntity(em);
    }

    @Test
    @Transactional
    public void createSection() throws Exception {
        int databaseSizeBeforeCreate = sectionRepository.findAll().size();

        // Create the Section
        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isCreated());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeCreate + 1);
        Section testSection = sectionList.get(sectionList.size() - 1);
        assertThat(testSection.getCrn()).isEqualTo(DEFAULT_CRN);
        assertThat(testSection.getSectNo()).isEqualTo(DEFAULT_SECT_NO);
        assertThat(testSection.getSemester()).isEqualTo(DEFAULT_SEMESTER);
        assertThat(testSection.getLectureTime()).isEqualTo(DEFAULT_LECTURE_TIME);
        assertThat(testSection.getLabTime()).isEqualTo(DEFAULT_LAB_TIME);
        assertThat(testSection.getLectureRoom()).isEqualTo(DEFAULT_LECTURE_ROOM);
        assertThat(testSection.getLabRoom()).isEqualTo(DEFAULT_LAB_ROOM);
        assertThat(testSection.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
    }

    @Test
    @Transactional
    public void createSectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sectionRepository.findAll().size();

        // Create the Section with an existing ID
        section.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isBadRequest());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSections() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList
        restSectionMockMvc.perform(get("/api/sections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(section.getId().intValue())))
            .andExpect(jsonPath("$.[*].crn").value(hasItem(DEFAULT_CRN.intValue())))
            .andExpect(jsonPath("$.[*].sectNo").value(hasItem(DEFAULT_SECT_NO.intValue())))
            .andExpect(jsonPath("$.[*].semester").value(hasItem(DEFAULT_SEMESTER.toString())))
            .andExpect(jsonPath("$.[*].lectureTime").value(hasItem(DEFAULT_LECTURE_TIME.toString())))
            .andExpect(jsonPath("$.[*].labTime").value(hasItem(DEFAULT_LAB_TIME.toString())))
            .andExpect(jsonPath("$.[*].lectureRoom").value(hasItem(DEFAULT_LECTURE_ROOM.toString())))
            .andExpect(jsonPath("$.[*].labRoom").value(hasItem(DEFAULT_LAB_ROOM.toString())))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY.intValue())));
    }
    
    @Test
    @Transactional
    public void getSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get the section
        restSectionMockMvc.perform(get("/api/sections/{id}", section.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(section.getId().intValue()))
            .andExpect(jsonPath("$.crn").value(DEFAULT_CRN.intValue()))
            .andExpect(jsonPath("$.sectNo").value(DEFAULT_SECT_NO.intValue()))
            .andExpect(jsonPath("$.semester").value(DEFAULT_SEMESTER.toString()))
            .andExpect(jsonPath("$.lectureTime").value(DEFAULT_LECTURE_TIME.toString()))
            .andExpect(jsonPath("$.labTime").value(DEFAULT_LAB_TIME.toString()))
            .andExpect(jsonPath("$.lectureRoom").value(DEFAULT_LECTURE_ROOM.toString()))
            .andExpect(jsonPath("$.labRoom").value(DEFAULT_LAB_ROOM.toString()))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSection() throws Exception {
        // Get the section
        restSectionMockMvc.perform(get("/api/sections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        int databaseSizeBeforeUpdate = sectionRepository.findAll().size();

        // Update the section
        Section updatedSection = sectionRepository.findById(section.getId()).get();
        // Disconnect from session so that the updates on updatedSection are not directly saved in db
        em.detach(updatedSection);
        updatedSection
            .crn(UPDATED_CRN)
            .sectNo(UPDATED_SECT_NO)
            .semester(UPDATED_SEMESTER)
            .lectureTime(UPDATED_LECTURE_TIME)
            .labTime(UPDATED_LAB_TIME)
            .lectureRoom(UPDATED_LECTURE_ROOM)
            .labRoom(UPDATED_LAB_ROOM)
            .capacity(UPDATED_CAPACITY);

        restSectionMockMvc.perform(put("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSection)))
            .andExpect(status().isOk());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeUpdate);
        Section testSection = sectionList.get(sectionList.size() - 1);
        assertThat(testSection.getCrn()).isEqualTo(UPDATED_CRN);
        assertThat(testSection.getSectNo()).isEqualTo(UPDATED_SECT_NO);
        assertThat(testSection.getSemester()).isEqualTo(UPDATED_SEMESTER);
        assertThat(testSection.getLectureTime()).isEqualTo(UPDATED_LECTURE_TIME);
        assertThat(testSection.getLabTime()).isEqualTo(UPDATED_LAB_TIME);
        assertThat(testSection.getLectureRoom()).isEqualTo(UPDATED_LECTURE_ROOM);
        assertThat(testSection.getLabRoom()).isEqualTo(UPDATED_LAB_ROOM);
        assertThat(testSection.getCapacity()).isEqualTo(UPDATED_CAPACITY);
    }

    @Test
    @Transactional
    public void updateNonExistingSection() throws Exception {
        int databaseSizeBeforeUpdate = sectionRepository.findAll().size();

        // Create the Section

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSectionMockMvc.perform(put("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isBadRequest());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        int databaseSizeBeforeDelete = sectionRepository.findAll().size();

        // Delete the section
        restSectionMockMvc.perform(delete("/api/sections/{id}", section.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Section.class);
        Section section1 = new Section();
        section1.setId(1L);
        Section section2 = new Section();
        section2.setId(section1.getId());
        assertThat(section1).isEqualTo(section2);
        section2.setId(2L);
        assertThat(section1).isNotEqualTo(section2);
        section1.setId(null);
        assertThat(section1).isNotEqualTo(section2);
    }
}
