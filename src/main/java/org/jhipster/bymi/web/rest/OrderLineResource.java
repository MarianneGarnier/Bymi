package org.jhipster.bymi.web.rest;

import org.jhipster.bymi.domain.OrderLine;
import org.jhipster.bymi.repository.OrderLineRepository;
import org.jhipster.bymi.repository.search.OrderLineSearchRepository;
import org.jhipster.bymi.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link org.jhipster.bymi.domain.OrderLine}.
 */
@RestController
@RequestMapping("/api")
public class OrderLineResource {

    private final Logger log = LoggerFactory.getLogger(OrderLineResource.class);

    private static final String ENTITY_NAME = "orderLine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderLineRepository orderLineRepository;

    private final OrderLineSearchRepository orderLineSearchRepository;

    public OrderLineResource(OrderLineRepository orderLineRepository, OrderLineSearchRepository orderLineSearchRepository) {
        this.orderLineRepository = orderLineRepository;
        this.orderLineSearchRepository = orderLineSearchRepository;
    }

    /**
     * {@code POST  /order-lines} : Create a new orderLine.
     *
     * @param orderLine the orderLine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderLine, or with status {@code 400 (Bad Request)} if the orderLine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/order-lines")
    public ResponseEntity<OrderLine> createOrderLine(@RequestBody OrderLine orderLine) throws URISyntaxException {
        log.debug("REST request to save OrderLine : {}", orderLine);
        if (orderLine.getId() != null) {
            throw new BadRequestAlertException("A new orderLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderLine result = orderLineRepository.save(orderLine);
        orderLineSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/order-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /order-lines} : Updates an existing orderLine.
     *
     * @param orderLine the orderLine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderLine,
     * or with status {@code 400 (Bad Request)} if the orderLine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderLine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/order-lines")
    public ResponseEntity<OrderLine> updateOrderLine(@RequestBody OrderLine orderLine) throws URISyntaxException {
        log.debug("REST request to update OrderLine : {}", orderLine);
        if (orderLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderLine result = orderLineRepository.save(orderLine);
        orderLineSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, orderLine.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /order-lines} : get all the orderLines.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderLines in body.
     */
    @GetMapping("/order-lines")
    public List<OrderLine> getAllOrderLines() {
        log.debug("REST request to get all OrderLines");
        return orderLineRepository.findAll();
    }

    /**
     * {@code GET  /order-lines/:id} : get the "id" orderLine.
     *
     * @param id the id of the orderLine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderLine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/order-lines/{id}")
    public ResponseEntity<OrderLine> getOrderLine(@PathVariable Long id) {
        log.debug("REST request to get OrderLine : {}", id);
        Optional<OrderLine> orderLine = orderLineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderLine);
    }

    /**
     * {@code DELETE  /order-lines/:id} : delete the "id" orderLine.
     *
     * @param id the id of the orderLine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/order-lines/{id}")
    public ResponseEntity<Void> deleteOrderLine(@PathVariable Long id) {
        log.debug("REST request to delete OrderLine : {}", id);
        orderLineRepository.deleteById(id);
        orderLineSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/order-lines?query=:query} : search for the orderLine corresponding
     * to the query.
     *
     * @param query the query of the orderLine search.
     * @return the result of the search.
     */
    @GetMapping("/_search/order-lines")
    public List<OrderLine> searchOrderLines(@RequestParam String query) {
        log.debug("REST request to search OrderLines for query {}", query);
        return StreamSupport
            .stream(orderLineSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
