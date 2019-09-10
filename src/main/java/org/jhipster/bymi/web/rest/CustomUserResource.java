package org.jhipster.bymi.web.rest;

import org.jhipster.bymi.domain.CustomUser;
import org.jhipster.bymi.repository.CustomUserRepository;
import org.jhipster.bymi.repository.search.CustomUserSearchRepository;
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
 * REST controller for managing {@link org.jhipster.bymi.domain.CustomUser}.
 */
@RestController
@RequestMapping("/api")
public class CustomUserResource {

    private final Logger log = LoggerFactory.getLogger(CustomUserResource.class);

    private static final String ENTITY_NAME = "customUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomUserRepository customUserRepository;

    private final CustomUserSearchRepository customUserSearchRepository;

    public CustomUserResource(CustomUserRepository customUserRepository, CustomUserSearchRepository customUserSearchRepository) {
        this.customUserRepository = customUserRepository;
        this.customUserSearchRepository = customUserSearchRepository;
    }

    /**
     * {@code POST  /custom-users} : Create a new customUser.
     *
     * @param customUser the customUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customUser, or with status {@code 400 (Bad Request)} if the customUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/custom-users")
    public ResponseEntity<CustomUser> createCustomUser(@RequestBody CustomUser customUser) throws URISyntaxException {
        log.debug("REST request to save CustomUser : {}", customUser);
        if (customUser.getId() != null) {
            throw new BadRequestAlertException("A new customUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomUser result = customUserRepository.save(customUser);
        customUserSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/custom-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /custom-users} : Updates an existing customUser.
     *
     * @param customUser the customUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customUser,
     * or with status {@code 400 (Bad Request)} if the customUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/custom-users")
    public ResponseEntity<CustomUser> updateCustomUser(@RequestBody CustomUser customUser) throws URISyntaxException {
        log.debug("REST request to update CustomUser : {}", customUser);
        if (customUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomUser result = customUserRepository.save(customUser);
        customUserSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, customUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /custom-users} : get all the customUsers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customUsers in body.
     */
    @GetMapping("/custom-users")
    public List<CustomUser> getAllCustomUsers() {
        log.debug("REST request to get all CustomUsers");
        return customUserRepository.findAll();
    }

    /**
     * {@code GET  /custom-users/:id} : get the "id" customUser.
     *
     * @param id the id of the customUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/custom-users/{id}")
    public ResponseEntity<CustomUser> getCustomUser(@PathVariable Long id) {
        log.debug("REST request to get CustomUser : {}", id);
        Optional<CustomUser> customUser = customUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customUser);
    }

    /**
     * {@code DELETE  /custom-users/:id} : delete the "id" customUser.
     *
     * @param id the id of the customUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/custom-users/{id}")
    public ResponseEntity<Void> deleteCustomUser(@PathVariable Long id) {
        log.debug("REST request to delete CustomUser : {}", id);
        customUserRepository.deleteById(id);
        customUserSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/custom-users?query=:query} : search for the customUser corresponding
     * to the query.
     *
     * @param query the query of the customUser search.
     * @return the result of the search.
     */
    @GetMapping("/_search/custom-users")
    public List<CustomUser> searchCustomUsers(@RequestParam String query) {
        log.debug("REST request to search CustomUsers for query {}", query);
        return StreamSupport
            .stream(customUserSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
