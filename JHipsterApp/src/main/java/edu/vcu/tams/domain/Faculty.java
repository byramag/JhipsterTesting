package edu.vcu.tams.domain;


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

    @Column(name = "prof_id")
    private String profID;

    @Column(name = "prof_name")
    private String profName;

    @Column(name = "email")
    private String email;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "faculty_section",
               joinColumns = @JoinColumn(name = "faculty_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "section_id", referencedColumnName = "id"))
    private Set<Section> sections = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfID() {
        return profID;
    }

    public Faculty profID(String profID) {
        this.profID = profID;
        return this;
    }

    public void setProfID(String profID) {
        this.profID = profID;
    }

    public String getProfName() {
        return profName;
    }

    public Faculty profName(String profName) {
        this.profName = profName;
        return this;
    }

    public void setProfName(String profName) {
        this.profName = profName;
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

    public Set<Section> getSections() {
        return sections;
    }

    public Faculty sections(Set<Section> sections) {
        this.sections = sections;
        return this;
    }

    public Faculty addSection(Section section) {
        this.sections.add(section);
        return this;
    }

    public Faculty removeSection(Section section) {
        this.sections.remove(section);
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
            ", profID='" + getProfID() + "'" +
            ", profName='" + getProfName() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
