package edu.vcu.tams.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Grading.
 */
@Entity
@Table(name = "grading")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Grading implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "status")
    private String status;

    @Column(name = "num_assigned")
    private Integer numAssigned;

    @Column(name = "num_completed")
    private Integer numCompleted;

    @ManyToOne
    @JsonIgnoreProperties("gradings")
    private Ta taAssigned;

    @ManyToOne
    @JsonIgnoreProperties("gradings")
    private Assignment forAssignment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public Grading status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getNumAssigned() {
        return numAssigned;
    }

    public Grading numAssigned(Integer numAssigned) {
        this.numAssigned = numAssigned;
        return this;
    }

    public void setNumAssigned(Integer numAssigned) {
        this.numAssigned = numAssigned;
    }

    public Integer getNumCompleted() {
        return numCompleted;
    }

    public Grading numCompleted(Integer numCompleted) {
        this.numCompleted = numCompleted;
        return this;
    }

    public void setNumCompleted(Integer numCompleted) {
        this.numCompleted = numCompleted;
    }

    public Ta getTaAssigned() {
        return taAssigned;
    }

    public Grading taAssigned(Ta ta) {
        this.taAssigned = ta;
        return this;
    }

    public void setTaAssigned(Ta ta) {
        this.taAssigned = ta;
    }

    public Assignment getForAssignment() {
        return forAssignment;
    }

    public Grading forAssignment(Assignment assignment) {
        this.forAssignment = assignment;
        return this;
    }

    public void setForAssignment(Assignment assignment) {
        this.forAssignment = assignment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Grading grading = (Grading) o;
        if (grading.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), grading.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Grading{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", numAssigned=" + getNumAssigned() +
            ", numCompleted=" + getNumCompleted() +
            "}";
    }
}
