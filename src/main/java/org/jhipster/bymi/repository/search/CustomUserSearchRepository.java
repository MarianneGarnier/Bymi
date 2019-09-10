package org.jhipster.bymi.repository.search;

import org.jhipster.bymi.domain.CustomUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CustomUser} entity.
 */
public interface CustomUserSearchRepository extends ElasticsearchRepository<CustomUser, Long> {
}
