package edu.vcu.tams.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import edu.vcu.tams.domain.enumeration.Role;

/**
 * A TaRole.
 */
@Entity
@Table(name = "ta_role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TaRole implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_role")
    private Role role;

    @ManyToMany(mappedBy = "availableRoles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Ta> tas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public TaRole role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Ta> getTas() {
        return tas;
    }

    public TaRole tas(Set<Ta> tas) {
        this.tas = tas;
        return this;
    }

    public TaRole addTa(Ta ta) {
        this.tas.add(ta);
        ta.getAvailableRoles().add(this);
        return this;
    }

    public TaRole removeTa(Ta ta) {
        this.tas.remove(ta);
        ta.getAvailableRoles().remove(this);
        return this;
    }

    public void setTas(Set<Ta> tas) {
        this.tas = tas;
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
        TaRole taRole = (TaRole) o;
        if (taRole.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taRole.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaRole{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            "}";
    }
}
