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

    @Column(name = "course_id")
    private String courseID;

    @Column(name = "course_desc")
    private String courseDesc;

    @OneToMany(mappedBy = "course")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Section> sections = new HashSet<>();
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

    public String getCourseID() {
        return courseID;
    }

    public Course courseID(String courseID) {
        this.courseID = courseID;
        return this;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getCourseDesc() {
        return courseDesc;
    }

    public Course courseDesc(String courseDesc) {
        this.courseDesc = courseDesc;
        return this;
    }

    public void setCourseDesc(String courseDesc) {
        this.courseDesc = courseDesc;
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
            ", courseID='" + getCourseID() + "'" +
            ", courseDesc='" + getCourseDesc() + "'" +
            "}";
    }
}
