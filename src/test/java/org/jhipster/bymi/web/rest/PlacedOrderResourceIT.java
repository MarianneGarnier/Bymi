package org.jhipster.bymi.web.rest;

import org.jhipster.bymi.BymiApp;
import org.jhipster.bymi.domain.PlacedOrder;
import org.jhipster.bymi.repository.PlacedOrderRepository;
import org.jhipster.bymi.repository.search.PlacedOrderSearchRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static org.jhipster.bymi.web.rest.TestUtil.sameInstant;
import static org.jhipster.bymi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.jhipster.bymi.domain.enumeration.OrderStatus;
/**
 * Integration tests for the {@link PlacedOrderResource} REST controller.
 */
@SpringBootTest(classes = BymiApp.class)
public class PlacedOrderResourceIT {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final Integer DEFAULT_ORDER_ID = 1;
    private static final Integer UPDATED_ORDER_ID = 2;
    private static final Integer SMALLER_ORDER_ID = 1 - 1;

    private static final OrderStatus DEFAULT_STATUS = OrderStatus.BASKET;
    private static final OrderStatus UPDATED_STATUS = OrderStatus.PAID;

    @Autowired
    private PlacedOrderRepository placedOrderRepository;

    /**
     * This repository is mocked in the org.jhipster.bymi.repository.search test package.
     *
     * @see org.jhipster.bymi.repository.search.PlacedOrderSearchRepositoryMockConfiguration
     */
    @Autowired
    private PlacedOrderSearchRepository mockPlacedOrderSearchRepository;

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

    private MockMvc restPlacedOrderMockMvc;

    private PlacedOrder placedOrder;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlacedOrderResource placedOrderResource = new PlacedOrderResource(placedOrderRepository, mockPlacedOrderSearchRepository);
        this.restPlacedOrderMockMvc = MockMvcBuilders.standaloneSetup(placedOrderResource)
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
    public static PlacedOrder createEntity(EntityManager em) {
        PlacedOrder placedOrder = new PlacedOrder()
            .date(DEFAULT_DATE)
            .orderId(DEFAULT_ORDER_ID)
            .status(DEFAULT_STATUS);
        return placedOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlacedOrder createUpdatedEntity(EntityManager em) {
        PlacedOrder placedOrder = new PlacedOrder()
            .date(UPDATED_DATE)
            .orderId(UPDATED_ORDER_ID)
            .status(UPDATED_STATUS);
        return placedOrder;
    }

    @BeforeEach
    public void initTest() {
        placedOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlacedOrder() throws Exception {
        int databaseSizeBeforeCreate = placedOrderRepository.findAll().size();

        // Create the PlacedOrder
        restPlacedOrderMockMvc.perform(post("/api/placed-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placedOrder)))
            .andExpect(status().isCreated());

        // Validate the PlacedOrder in the database
        List<PlacedOrder> placedOrderList = placedOrderRepository.findAll();
        assertThat(placedOrderList).hasSize(databaseSizeBeforeCreate + 1);
        PlacedOrder testPlacedOrder = placedOrderList.get(placedOrderList.size() - 1);
        assertThat(testPlacedOrder.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPlacedOrder.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
        assertThat(testPlacedOrder.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the PlacedOrder in Elasticsearch
        verify(mockPlacedOrderSearchRepository, times(1)).save(testPlacedOrder);
    }

    @Test
    @Transactional
    public void createPlacedOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placedOrderRepository.findAll().size();

        // Create the PlacedOrder with an existing ID
        placedOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlacedOrderMockMvc.perform(post("/api/placed-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placedOrder)))
            .andExpect(status().isBadRequest());

        // Validate the PlacedOrder in the database
        List<PlacedOrder> placedOrderList = placedOrderRepository.findAll();
        assertThat(placedOrderList).hasSize(databaseSizeBeforeCreate);

        // Validate the PlacedOrder in Elasticsearch
        verify(mockPlacedOrderSearchRepository, times(0)).save(placedOrder);
    }


    @Test
    @Transactional
    public void getAllPlacedOrders() throws Exception {
        // Initialize the database
        placedOrderRepository.saveAndFlush(placedOrder);

        // Get all the placedOrderList
        restPlacedOrderMockMvc.perform(get("/api/placed-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(placedOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getPlacedOrder() throws Exception {
        // Initialize the database
        placedOrderRepository.saveAndFlush(placedOrder);

        // Get the placedOrder
        restPlacedOrderMockMvc.perform(get("/api/placed-orders/{id}", placedOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(placedOrder.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlacedOrder() throws Exception {
        // Get the placedOrder
        restPlacedOrderMockMvc.perform(get("/api/placed-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlacedOrder() throws Exception {
        // Initialize the database
        placedOrderRepository.saveAndFlush(placedOrder);

        int databaseSizeBeforeUpdate = placedOrderRepository.findAll().size();

        // Update the placedOrder
        PlacedOrder updatedPlacedOrder = placedOrderRepository.findById(placedOrder.getId()).get();
        // Disconnect from session so that the updates on updatedPlacedOrder are not directly saved in db
        em.detach(updatedPlacedOrder);
        updatedPlacedOrder
            .date(UPDATED_DATE)
            .orderId(UPDATED_ORDER_ID)
            .status(UPDATED_STATUS);

        restPlacedOrderMockMvc.perform(put("/api/placed-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlacedOrder)))
            .andExpect(status().isOk());

        // Validate the PlacedOrder in the database
        List<PlacedOrder> placedOrderList = placedOrderRepository.findAll();
        assertThat(placedOrderList).hasSize(databaseSizeBeforeUpdate);
        PlacedOrder testPlacedOrder = placedOrderList.get(placedOrderList.size() - 1);
        assertThat(testPlacedOrder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPlacedOrder.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
        assertThat(testPlacedOrder.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the PlacedOrder in Elasticsearch
        verify(mockPlacedOrderSearchRepository, times(1)).save(testPlacedOrder);
    }

    @Test
    @Transactional
    public void updateNonExistingPlacedOrder() throws Exception {
        int databaseSizeBeforeUpdate = placedOrderRepository.findAll().size();

        // Create the PlacedOrder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlacedOrderMockMvc.perform(put("/api/placed-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placedOrder)))
            .andExpect(status().isBadRequest());

        // Validate the PlacedOrder in the database
        List<PlacedOrder> placedOrderList = placedOrderRepository.findAll();
        assertThat(placedOrderList).hasSize(databaseSizeBeforeUpdate);

        // Validate the PlacedOrder in Elasticsearch
        verify(mockPlacedOrderSearchRepository, times(0)).save(placedOrder);
    }

    @Test
    @Transactional
    public void deletePlacedOrder() throws Exception {
        // Initialize the database
        placedOrderRepository.saveAndFlush(placedOrder);

        int databaseSizeBeforeDelete = placedOrderRepository.findAll().size();

        // Delete the placedOrder
        restPlacedOrderMockMvc.perform(delete("/api/placed-orders/{id}", placedOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlacedOrder> placedOrderList = placedOrderRepository.findAll();
        assertThat(placedOrderList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the PlacedOrder in Elasticsearch
        verify(mockPlacedOrderSearchRepository, times(1)).deleteById(placedOrder.getId());
    }

    @Test
    @Transactional
    public void searchPlacedOrder() throws Exception {
        // Initialize the database
        placedOrderRepository.saveAndFlush(placedOrder);
        when(mockPlacedOrderSearchRepository.search(queryStringQuery("id:" + placedOrder.getId())))
            .thenReturn(Collections.singletonList(placedOrder));
        // Search the placedOrder
        restPlacedOrderMockMvc.perform(get("/api/_search/placed-orders?query=id:" + placedOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(placedOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlacedOrder.class);
        PlacedOrder placedOrder1 = new PlacedOrder();
        placedOrder1.setId(1L);
        PlacedOrder placedOrder2 = new PlacedOrder();
        placedOrder2.setId(placedOrder1.getId());
        assertThat(placedOrder1).isEqualTo(placedOrder2);
        placedOrder2.setId(2L);
        assertThat(placedOrder1).isNotEqualTo(placedOrder2);
        placedOrder1.setId(null);
        assertThat(placedOrder1).isNotEqualTo(placedOrder2);
    }
}
