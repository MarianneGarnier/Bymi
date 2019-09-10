package org.jhipster.bymi.repository;

import org.jhipster.bymi.domain.PlacedOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PlacedOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlacedOrderRepository extends JpaRepository<PlacedOrder, Long> {

    @Query("select placedOrder from PlacedOrder placedOrder where placedOrder.user.login = ?#{principal.username}")
    List<PlacedOrder> findByUserIsCurrentUser();

}
