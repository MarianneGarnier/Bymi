package org.jhipster.bymi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import org.jhipster.bymi.domain.enumeration.OrderStatus;

/**
 * A PlacedOrder.
 */
@Entity
@Table(name = "placed_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlacedOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "order_id")
    private Integer orderId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderLine> orderlines = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public PlacedOrder date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public PlacedOrder orderId(Integer orderId) {
        this.orderId = orderId;
        return this;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public PlacedOrder status(OrderStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Set<OrderLine> getOrderlines() {
        return orderlines;
    }

    public PlacedOrder orderlines(Set<OrderLine> orderLines) {
        this.orderlines = orderLines;
        return this;
    }

    public PlacedOrder addOrderlines(OrderLine orderLine) {
        this.orderlines.add(orderLine);
        orderLine.setOrder(this);
        return this;
    }

    public PlacedOrder removeOrderlines(OrderLine orderLine) {
        this.orderlines.remove(orderLine);
        orderLine.setOrder(null);
        return this;
    }

    public void setOrderlines(Set<OrderLine> orderLines) {
        this.orderlines = orderLines;
    }

    public User getUser() {
        return user;
    }

    public PlacedOrder user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlacedOrder)) {
            return false;
        }
        return id != null && id.equals(((PlacedOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlacedOrder{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", orderId=" + getOrderId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
