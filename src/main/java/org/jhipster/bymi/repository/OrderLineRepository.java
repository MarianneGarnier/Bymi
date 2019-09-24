package org.jhipster.bymi.repository;

import org.jhipster.bymi.domain.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the OrderLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Long> {

    @Query("select orderline from OrderLine orderline, PlacedOrder placedorder, User user where placedorder.id = orderline.order AND user.id = 3")
    List<OrderLine> findByCurrentUserBasket();
    //select orderline from OrderLine orderLine, PlacedOrder placedOrder where placedOrder.user.login = ?#{principal.username}  AND placedOrder.id = orderline.order.id

}
