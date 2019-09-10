package org.jhipster.bymi.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link PlacedOrderSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PlacedOrderSearchRepositoryMockConfiguration {

    @MockBean
    private PlacedOrderSearchRepository mockPlacedOrderSearchRepository;

}
