package org.jhipster.bymi.repository.search;

import org.jhipster.bymi.domain.OrderLine;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link OrderLine} entity.
 */
public interface OrderLineSearchRepository extends ElasticsearchRepository<OrderLine, Long> {
}
