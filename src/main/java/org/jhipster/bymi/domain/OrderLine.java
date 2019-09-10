package org.jhipster.bymi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.ZonedDateTime;

import org.jhipster.bymi.domain.enumeration.OrderLineStatus;

/**
 * A OrderLine.
 */
@Entity
@Table(name = "order_line")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "orderline")
public class OrderLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "date")
    private ZonedDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderLineStatus status;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Product orderlines;

    @ManyToOne
    @JsonIgnoreProperties("orderlines")
    private PlacedOrder order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public OrderLine quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public OrderLine date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public OrderLineStatus getStatus() {
        return status;
    }

    public OrderLine status(OrderLineStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderLineStatus status) {
        this.status = status;
    }

    public Product getOrderlines() {
        return orderlines;
    }

    public OrderLine orderlines(Product product) {
        this.orderlines = product;
        return this;
    }

    public void setOrderlines(Product product) {
        this.orderlines = product;
    }

    public PlacedOrder getOrder() {
        return order;
    }

    public OrderLine order(PlacedOrder placedOrder) {
        this.order = placedOrder;
        return this;
    }

    public void setOrder(PlacedOrder placedOrder) {
        this.order = placedOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderLine)) {
            return false;
        }
        return id != null && id.equals(((OrderLine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrderLine{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", date='" + getDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
