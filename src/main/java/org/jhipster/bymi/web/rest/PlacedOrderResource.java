package org.jhipster.bymi.web.rest;

import org.jhipster.bymi.domain.PlacedOrder;
import org.jhipster.bymi.repository.PlacedOrderRepository;
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

/**
 * REST controller for managing {@link org.jhipster.bymi.domain.PlacedOrder}.
 */
@RestController
@RequestMapping("/api")
public class PlacedOrderResource {

    private final Logger log = LoggerFactory.getLogger(PlacedOrderResource.class);

    private static final String ENTITY_NAME = "placedOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlacedOrderRepository placedOrderRepository;

    public PlacedOrderResource(PlacedOrderRepository placedOrderRepository) {
        this.placedOrderRepository = placedOrderRepository;
    }

    /**
     * {@code POST  /placed-orders} : Create a new placedOrder.
     *
     * @param placedOrder the placedOrder to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new placedOrder, or with status {@code 400 (Bad Request)} if the placedOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/placed-orders")
    public ResponseEntity<PlacedOrder> createPlacedOrder(@RequestBody PlacedOrder placedOrder) throws URISyntaxException {
        log.debug("REST request to save PlacedOrder : {}", placedOrder);
        if (placedOrder.getId() != null) {
            throw new BadRequestAlertException("A new placedOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlacedOrder result = placedOrderRepository.save(placedOrder);
        return ResponseEntity.created(new URI("/api/placed-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /placed-orders} : Updates an existing placedOrder.
     *
     * @param placedOrder the placedOrder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated placedOrder,
     * or with status {@code 400 (Bad Request)} if the placedOrder is not valid,
     * or with status {@code 500 (Internal Server Error)} if the placedOrder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/placed-orders")
    public ResponseEntity<PlacedOrder> updatePlacedOrder(@RequestBody PlacedOrder placedOrder) throws URISyntaxException {
        log.debug("REST request to update PlacedOrder : {}", placedOrder);
        if (placedOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlacedOrder result = placedOrderRepository.save(placedOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, placedOrder.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /placed-orders} : get all the placedOrders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of placedOrders in body.
     */
    @GetMapping("/placed-orders")
    public List<PlacedOrder> getAllPlacedOrders() {
        log.debug("REST request to get all PlacedOrders");
        return placedOrderRepository.findAll();
    }

    /**
     * {@code GET  /placed-orders/:id} : get the "id" placedOrder.
     *
     * @param id the id of the placedOrder to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the placedOrder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/placed-orders/{id}")
    public ResponseEntity<PlacedOrder> getPlacedOrder(@PathVariable Long id) {
        log.debug("REST request to get PlacedOrder : {}", id);
        Optional<PlacedOrder> placedOrder = placedOrderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(placedOrder);
    }

    /**
     * {@code GET  /placed-orders/my-orders}
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the placedOrder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/placed-orders/my-orders")
    public List<PlacedOrder> getPlacedOrderByCurrentUser() {
        log.debug("REST request to get PlacedOrder : {}");
        return placedOrderRepository.findByUserIsCurrentUser();
    }

    /**
     * {@code DELETE  /placed-orders/:id} : delete the "id" placedOrder.
     *
     * @param id the id of the placedOrder to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/placed-orders/{id}")
    public ResponseEntity<Void> deletePlacedOrder(@PathVariable Long id) {
        log.debug("REST request to delete PlacedOrder : {}", id);
        placedOrderRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
