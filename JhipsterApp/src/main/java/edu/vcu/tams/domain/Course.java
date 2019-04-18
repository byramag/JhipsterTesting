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
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "description")
    private String description;

    @Column(name = "department")
    private String department;

    @Column(name = "course_number")
    private Integer courseNumber;

    @OneToMany(mappedBy = "course")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Section> sections = new HashSet<>();
    @ManyToMany(mappedBy = "courseQualifieds")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Ta> qualifiedTas = new HashSet<>();

    @ManyToMany(mappedBy = "courseHasExperiences")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Ta> experiencedTas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public Course courseName(String courseName) {
        this.courseName = courseName;
        return this;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getDescription() {
        return description;
    }

    public Course description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDepartment() {
        return department;
    }

    public Course department(String department) {
        this.department = department;
        return this;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getCourseNumber() {
        return courseNumber;
    }

    public Course courseNumber(Integer courseNumber) {
        this.courseNumber = courseNumber;
        return this;
    }

    public void setCourseNumber(Integer courseNumber) {
        this.courseNumber = courseNumber;
    }

    public Set<Section> getSections() {
        return sections;
    }

    public Course sections(Set<Section> sections) {
        this.sections = sections;
        return this;
    }

    public Course addSection(Section section) {
        this.sections.add(section);
        section.setCourse(this);
        return this;
    }

    public Course removeSection(Section section) {
        this.sections.remove(section);
        section.setCourse(null);
        return this;
    }

    public void setSections(Set<Section> sections) {
        this.sections = sections;
    }

    public Set<Ta> getQualifiedTas() {
        return qualifiedTas;
    }

    public Course qualifiedTas(Set<Ta> tas) {
        this.qualifiedTas = tas;
        return this;
    }

    public Course addQualifiedTa(Ta ta) {
        this.qualifiedTas.add(ta);
        ta.getCourseQualifieds().add(this);
        return this;
    }

    public Course removeQualifiedTa(Ta ta) {
        this.qualifiedTas.remove(ta);
        ta.getCourseQualifieds().remove(this);
        return this;
    }

    public void setQualifiedTas(Set<Ta> tas) {
        this.qualifiedTas = tas;
    }

    public Set<Ta> getExperiencedTas() {
        return experiencedTas;
    }

    public Course experiencedTas(Set<Ta> tas) {
        this.experiencedTas = tas;
        return this;
    }

    public Course addExperiencedTa(Ta ta) {
        this.experiencedTas.add(ta);
        ta.getCourseHasExperiences().add(this);
        return this;
    }

    public Course removeExperiencedTa(Ta ta) {
        this.experiencedTas.remove(ta);
        ta.getCourseHasExperiences().remove(this);
        return this;
    }

    public void setExperiencedTas(Set<Ta> tas) {
        this.experiencedTas = tas;
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
        Course course = (Course) o;
        if (course.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), course.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", courseName='" + getCourseName() + "'" +
            ", description='" + getDescription() + "'" +
            ", department='" + getDepartment() + "'" +
            ", courseNumber=" + getCourseNumber() +
            "}";
    }
}
