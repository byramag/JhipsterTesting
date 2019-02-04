package edu.vcu.tams.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Assignment.
 */
@Entity
@Table(name = "assignment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Assignment implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ta_id")
    private Long taID;

    @Column(name = "sect_no")
    private Long sectNo;

    @ManyToOne
    @JsonIgnoreProperties("assignments")
    private Section section;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaID() {
        return taID;
    }

    public Assignment taID(Long taID) {
        this.taID = taID;
        return this;
    }

    public void setTaID(Long taID) {
        this.taID = taID;
    }

    public Long getSectNo() {
        return sectNo;
    }

    public Assignment sectNo(Long sectNo) {
        this.sectNo = sectNo;
        return this;
    }

    public void setSectNo(Long sectNo) {
        this.sectNo = sectNo;
    }

    public Section getSection() {
        return section;
    }

    public Assignment section(Section section) {
        this.section = section;
        return this;
    }

    public void setSection(Section section) {
        this.section = section;
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
        Assignment assignment = (Assignment) o;
        if (assignment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Assignment{" +
            "id=" + getId() +
            ", taID=" + getTaID() +
            ", sectNo=" + getSectNo() +
            "}";
    }
}
