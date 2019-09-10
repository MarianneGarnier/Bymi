package org.jhipster.bymi.repository.search;

import org.jhipster.bymi.domain.PlacedOrder;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link PlacedOrder} entity.
 */
public interface PlacedOrderSearchRepository extends ElasticsearchRepository<PlacedOrder, Long> {
}
