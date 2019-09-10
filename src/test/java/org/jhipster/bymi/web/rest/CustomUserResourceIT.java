package org.jhipster.bymi.web.rest;

import org.jhipster.bymi.BymiApp;
import org.jhipster.bymi.domain.CustomUser;
import org.jhipster.bymi.repository.CustomUserRepository;
import org.jhipster.bymi.repository.search.CustomUserSearchRepository;
import org.jhipster.bymi.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.jhipster.bymi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CustomUserResource} REST controller.
 */
@SpringBootTest(classes = BymiApp.class)
public class CustomUserResourceIT {

    @Autowired
    private CustomUserRepository customUserRepository;

    /**
     * This repository is mocked in the org.jhipster.bymi.repository.search test package.
     *
     * @see org.jhipster.bymi.repository.search.CustomUserSearchRepositoryMockConfiguration
     */
    @Autowired
    private CustomUserSearchRepository mockCustomUserSearchRepository;

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

    private MockMvc restCustomUserMockMvc;

    private CustomUser customUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomUserResource customUserResource = new CustomUserResource(customUserRepository, mockCustomUserSearchRepository);
        this.restCustomUserMockMvc = MockMvcBuilders.standaloneSetup(customUserResource)
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
    public static CustomUser createEntity(EntityManager em) {
        CustomUser customUser = new CustomUser();
        return customUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomUser createUpdatedEntity(EntityManager em) {
        CustomUser customUser = new CustomUser();
        return customUser;
    }

    @BeforeEach
    public void initTest() {
        customUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomUser() throws Exception {
        int databaseSizeBeforeCreate = customUserRepository.findAll().size();

        // Create the CustomUser
        restCustomUserMockMvc.perform(post("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isCreated());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeCreate + 1);
        CustomUser testCustomUser = customUserList.get(customUserList.size() - 1);

        // Validate the CustomUser in Elasticsearch
        verify(mockCustomUserSearchRepository, times(1)).save(testCustomUser);
    }

    @Test
    @Transactional
    public void createCustomUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customUserRepository.findAll().size();

        // Create the CustomUser with an existing ID
        customUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomUserMockMvc.perform(post("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isBadRequest());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeCreate);

        // Validate the CustomUser in Elasticsearch
        verify(mockCustomUserSearchRepository, times(0)).save(customUser);
    }


    @Test
    @Transactional
    public void getAllCustomUsers() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);

        // Get all the customUserList
        restCustomUserMockMvc.perform(get("/api/custom-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customUser.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);

        // Get the customUser
        restCustomUserMockMvc.perform(get("/api/custom-users/{id}", customUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customUser.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomUser() throws Exception {
        // Get the customUser
        restCustomUserMockMvc.perform(get("/api/custom-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);

        int databaseSizeBeforeUpdate = customUserRepository.findAll().size();

        // Update the customUser
        CustomUser updatedCustomUser = customUserRepository.findById(customUser.getId()).get();
        // Disconnect from session so that the updates on updatedCustomUser are not directly saved in db
        em.detach(updatedCustomUser);

        restCustomUserMockMvc.perform(put("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomUser)))
            .andExpect(status().isOk());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeUpdate);
        CustomUser testCustomUser = customUserList.get(customUserList.size() - 1);

        // Validate the CustomUser in Elasticsearch
        verify(mockCustomUserSearchRepository, times(1)).save(testCustomUser);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomUser() throws Exception {
        int databaseSizeBeforeUpdate = customUserRepository.findAll().size();

        // Create the CustomUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomUserMockMvc.perform(put("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isBadRequest());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CustomUser in Elasticsearch
        verify(mockCustomUserSearchRepository, times(0)).save(customUser);
    }

    @Test
    @Transactional
    public void deleteCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);

        int databaseSizeBeforeDelete = customUserRepository.findAll().size();

        // Delete the customUser
        restCustomUserMockMvc.perform(delete("/api/custom-users/{id}", customUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CustomUser in Elasticsearch
        verify(mockCustomUserSearchRepository, times(1)).deleteById(customUser.getId());
    }

    @Test
    @Transactional
    public void searchCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.saveAndFlush(customUser);
        when(mockCustomUserSearchRepository.search(queryStringQuery("id:" + customUser.getId())))
            .thenReturn(Collections.singletonList(customUser));
        // Search the customUser
        restCustomUserMockMvc.perform(get("/api/_search/custom-users?query=id:" + customUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customUser.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomUser.class);
        CustomUser customUser1 = new CustomUser();
        customUser1.setId(1L);
        CustomUser customUser2 = new CustomUser();
        customUser2.setId(customUser1.getId());
        assertThat(customUser1).isEqualTo(customUser2);
        customUser2.setId(2L);
        assertThat(customUser1).isNotEqualTo(customUser2);
        customUser1.setId(null);
        assertThat(customUser1).isNotEqualTo(customUser2);
    }
}
