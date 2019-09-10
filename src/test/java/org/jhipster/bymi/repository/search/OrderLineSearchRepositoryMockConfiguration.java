package org.jhipster.bymi.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link OrderLineSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class OrderLineSearchRepositoryMockConfiguration {

    @MockBean
    private OrderLineSearchRepository mockOrderLineSearchRepository;

}
