package edu.vcu.tams.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Faculty.
 */
@Entity
@Table(name = "faculty")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Faculty implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "is_admin")
    private Boolean isAdmin;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "faculty")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Section> sections = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Faculty name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public Faculty email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isIsAdmin() {
        return isAdmin;
    }

    public Faculty isAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
        return this;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public User getUser() {
        return user;
    }

    public Faculty user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Section> getSections() {
        return sections;
    }

    public Faculty sections(Set<Section> sections) {
        this.sections = sections;
        return this;
    }

    public Faculty addSection(Section section) {
        this.sections.add(section);
        section.setFaculty(this);
        return this;
    }

    public Faculty removeSection(Section section) {
        this.sections.remove(section);
        section.setFaculty(null);
        return this;
    }

    public void setSections(Set<Section> sections) {
        this.sections = sections;
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
        Faculty faculty = (Faculty) o;
        if (faculty.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), faculty.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Faculty{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", isAdmin='" + isIsAdmin() + "'" +
            "}";
    }
}
