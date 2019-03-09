package edu.vcu.tams.web.rest;

import edu.vcu.tams.TaManagementApp;

import edu.vcu.tams.domain.TimeWindow;
import edu.vcu.tams.repository.TimeWindowRepository;
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
 * Test class for the TimeWindowResource REST controller.
 *
 * @see TimeWindowResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TaManagementApp.class)
public class TimeWindowResourceIntTest {

    private static final Instant DEFAULT_START_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TimeWindowRepository timeWindowRepository;

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

    private MockMvc restTimeWindowMockMvc;

    private TimeWindow timeWindow;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TimeWindowResource timeWindowResource = new TimeWindowResource(timeWindowRepository);
        this.restTimeWindowMockMvc = MockMvcBuilders.standaloneSetup(timeWindowResource)
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
    public static TimeWindow createEntity(EntityManager em) {
        TimeWindow timeWindow = new TimeWindow()
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME);
        return timeWindow;
    }

    @Before
    public void initTest() {
        timeWindow = createEntity(em);
    }

    @Test
    @Transactional
    public void createTimeWindow() throws Exception {
        int databaseSizeBeforeCreate = timeWindowRepository.findAll().size();

        // Create the TimeWindow
        restTimeWindowMockMvc.perform(post("/api/time-windows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeWindow)))
            .andExpect(status().isCreated());

        // Validate the TimeWindow in the database
        List<TimeWindow> timeWindowList = timeWindowRepository.findAll();
        assertThat(timeWindowList).hasSize(databaseSizeBeforeCreate + 1);
        TimeWindow testTimeWindow = timeWindowList.get(timeWindowList.size() - 1);
        assertThat(testTimeWindow.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testTimeWindow.getEndTime()).isEqualTo(DEFAULT_END_TIME);
    }

    @Test
    @Transactional
    public void createTimeWindowWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = timeWindowRepository.findAll().size();

        // Create the TimeWindow with an existing ID
        timeWindow.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimeWindowMockMvc.perform(post("/api/time-windows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeWindow)))
            .andExpect(status().isBadRequest());

        // Validate the TimeWindow in the database
        List<TimeWindow> timeWindowList = timeWindowRepository.findAll();
        assertThat(timeWindowList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTimeWindows() throws Exception {
        // Initialize the database
        timeWindowRepository.saveAndFlush(timeWindow);

        // Get all the timeWindowList
        restTimeWindowMockMvc.perform(get("/api/time-windows?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timeWindow.getId().intValue())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getTimeWindow() throws Exception {
        // Initialize the database
        timeWindowRepository.saveAndFlush(timeWindow);

        // Get the timeWindow
        restTimeWindowMockMvc.perform(get("/api/time-windows/{id}", timeWindow.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(timeWindow.getId().intValue()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTimeWindow() throws Exception {
        // Get the timeWindow
        restTimeWindowMockMvc.perform(get("/api/time-windows/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTimeWindow() throws Exception {
        // Initialize the database
        timeWindowRepository.saveAndFlush(timeWindow);

        int databaseSizeBeforeUpdate = timeWindowRepository.findAll().size();

        // Update the timeWindow
        TimeWindow updatedTimeWindow = timeWindowRepository.findById(timeWindow.getId()).get();
        // Disconnect from session so that the updates on updatedTimeWindow are not directly saved in db
        em.detach(updatedTimeWindow);
        updatedTimeWindow
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME);

        restTimeWindowMockMvc.perform(put("/api/time-windows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTimeWindow)))
            .andExpect(status().isOk());

        // Validate the TimeWindow in the database
        List<TimeWindow> timeWindowList = timeWindowRepository.findAll();
        assertThat(timeWindowList).hasSize(databaseSizeBeforeUpdate);
        TimeWindow testTimeWindow = timeWindowList.get(timeWindowList.size() - 1);
        assertThat(testTimeWindow.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testTimeWindow.getEndTime()).isEqualTo(UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingTimeWindow() throws Exception {
        int databaseSizeBeforeUpdate = timeWindowRepository.findAll().size();

        // Create the TimeWindow

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTimeWindowMockMvc.perform(put("/api/time-windows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeWindow)))
            .andExpect(status().isBadRequest());

        // Validate the TimeWindow in the database
        List<TimeWindow> timeWindowList = timeWindowRepository.findAll();
        assertThat(timeWindowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTimeWindow() throws Exception {
        // Initialize the database
        timeWindowRepository.saveAndFlush(timeWindow);

        int databaseSizeBeforeDelete = timeWindowRepository.findAll().size();

        // Delete the timeWindow
        restTimeWindowMockMvc.perform(delete("/api/time-windows/{id}", timeWindow.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TimeWindow> timeWindowList = timeWindowRepository.findAll();
        assertThat(timeWindowList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimeWindow.class);
        TimeWindow timeWindow1 = new TimeWindow();
        timeWindow1.setId(1L);
        TimeWindow timeWindow2 = new TimeWindow();
        timeWindow2.setId(timeWindow1.getId());
        assertThat(timeWindow1).isEqualTo(timeWindow2);
        timeWindow2.setId(2L);
        assertThat(timeWindow1).isNotEqualTo(timeWindow2);
        timeWindow1.setId(null);
        assertThat(timeWindow1).isNotEqualTo(timeWindow2);
    }
}
