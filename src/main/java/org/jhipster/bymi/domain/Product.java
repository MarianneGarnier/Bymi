package org.jhipster.bymi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_product")
    private Integer idProduct;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private User user;

    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderLine> orderlines = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdProduct() {
        return idProduct;
    }

    public Product idProduct(Integer idProduct) {
        this.idProduct = idProduct;
        return this;
    }

    public void setIdProduct(Integer idProduct) {
        this.idProduct = idProduct;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public Product price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImagePath() {
        return imagePath;
    }

    public Product imagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Product quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public Product user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<OrderLine> getOrderlines() {
        return orderlines;
    }

    public Product orderlines(Set<OrderLine> orderLines) {
        this.orderlines = orderLines;
        return this;
    }

    public Product addOrderlines(OrderLine orderLine) {
        this.orderlines.add(orderLine);
        orderLine.setProduct(this);
        return this;
    }

    public Product removeOrderlines(OrderLine orderLine) {
        this.orderlines.remove(orderLine);
        orderLine.setProduct(null);
        return this;
    }

    public void setOrderlines(Set<OrderLine> orderLines) {
        this.orderlines = orderLines;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", idProduct=" + getIdProduct() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", imagePath='" + getImagePath() + "'" +
            ", quantity=" + getQuantity() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
