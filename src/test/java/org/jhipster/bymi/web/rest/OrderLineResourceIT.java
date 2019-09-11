package org.jhipster.bymi.web.rest;

import org.jhipster.bymi.BymiApp;
import org.jhipster.bymi.domain.OrderLine;
import org.jhipster.bymi.repository.OrderLineRepository;
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
import java.util.List;

import static org.jhipster.bymi.web.rest.TestUtil.sameInstant;
import static org.jhipster.bymi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.jhipster.bymi.domain.enumeration.OrderLineStatus;
/**
 * Integration tests for the {@link OrderLineResource} REST controller.
 */
@SpringBootTest(classes = BymiApp.class)
public class OrderLineResourceIT {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;
    private static final Integer SMALLER_QUANTITY = 1 - 1;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final OrderLineStatus DEFAULT_STATUS = OrderLineStatus.RESERVED;
    private static final OrderLineStatus UPDATED_STATUS = OrderLineStatus.EXPIRED;

    @Autowired
    private OrderLineRepository orderLineRepository;

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

    private MockMvc restOrderLineMockMvc;

    private OrderLine orderLine;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderLineResource orderLineResource = new OrderLineResource(orderLineRepository);
        this.restOrderLineMockMvc = MockMvcBuilders.standaloneSetup(orderLineResource)
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
    public static OrderLine createEntity(EntityManager em) {
        OrderLine orderLine = new OrderLine()
            .quantity(DEFAULT_QUANTITY)
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS);
        return orderLine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderLine createUpdatedEntity(EntityManager em) {
        OrderLine orderLine = new OrderLine()
            .quantity(UPDATED_QUANTITY)
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS);
        return orderLine;
    }

    @BeforeEach
    public void initTest() {
        orderLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderLine() throws Exception {
        int databaseSizeBeforeCreate = orderLineRepository.findAll().size();

        // Create the OrderLine
        restOrderLineMockMvc.perform(post("/api/order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderLine)))
            .andExpect(status().isCreated());

        // Validate the OrderLine in the database
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeCreate + 1);
        OrderLine testOrderLine = orderLineList.get(orderLineList.size() - 1);
        assertThat(testOrderLine.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testOrderLine.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testOrderLine.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createOrderLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderLineRepository.findAll().size();

        // Create the OrderLine with an existing ID
        orderLine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderLineMockMvc.perform(post("/api/order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderLine)))
            .andExpect(status().isBadRequest());

        // Validate the OrderLine in the database
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOrderLines() throws Exception {
        // Initialize the database
        orderLineRepository.saveAndFlush(orderLine);

        // Get all the orderLineList
        restOrderLineMockMvc.perform(get("/api/order-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getOrderLine() throws Exception {
        // Initialize the database
        orderLineRepository.saveAndFlush(orderLine);

        // Get the orderLine
        restOrderLineMockMvc.perform(get("/api/order-lines/{id}", orderLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderLine.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderLine() throws Exception {
        // Get the orderLine
        restOrderLineMockMvc.perform(get("/api/order-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderLine() throws Exception {
        // Initialize the database
        orderLineRepository.saveAndFlush(orderLine);

        int databaseSizeBeforeUpdate = orderLineRepository.findAll().size();

        // Update the orderLine
        OrderLine updatedOrderLine = orderLineRepository.findById(orderLine.getId()).get();
        // Disconnect from session so that the updates on updatedOrderLine are not directly saved in db
        em.detach(updatedOrderLine);
        updatedOrderLine
            .quantity(UPDATED_QUANTITY)
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS);

        restOrderLineMockMvc.perform(put("/api/order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderLine)))
            .andExpect(status().isOk());

        // Validate the OrderLine in the database
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeUpdate);
        OrderLine testOrderLine = orderLineList.get(orderLineList.size() - 1);
        assertThat(testOrderLine.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testOrderLine.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testOrderLine.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderLine() throws Exception {
        int databaseSizeBeforeUpdate = orderLineRepository.findAll().size();

        // Create the OrderLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderLineMockMvc.perform(put("/api/order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderLine)))
            .andExpect(status().isBadRequest());

        // Validate the OrderLine in the database
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderLine() throws Exception {
        // Initialize the database
        orderLineRepository.saveAndFlush(orderLine);

        int databaseSizeBeforeDelete = orderLineRepository.findAll().size();

        // Delete the orderLine
        restOrderLineMockMvc.perform(delete("/api/order-lines/{id}", orderLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderLine.class);
        OrderLine orderLine1 = new OrderLine();
        orderLine1.setId(1L);
        OrderLine orderLine2 = new OrderLine();
        orderLine2.setId(orderLine1.getId());
        assertThat(orderLine1).isEqualTo(orderLine2);
        orderLine2.setId(2L);
        assertThat(orderLine1).isNotEqualTo(orderLine2);
        orderLine1.setId(null);
        assertThat(orderLine1).isNotEqualTo(orderLine2);
    }
}
