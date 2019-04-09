package edu.vcu.tams.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Section.
 */
@Entity
@Table(name = "section")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Section implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "crn")
    private Long crn;

    @Column(name = "sect_no")
    private Long sectNo;

    @Column(name = "semester")
    private String semester;

    @Column(name = "lecture_time")
    private String lectureTime;

    @Column(name = "lab_time")
    private String labTime;

    @Column(name = "lecture_room")
    private String lectureRoom;

    @Column(name = "lab_room")
    private String labRoom;

    @Column(name = "capacity")
    private Long capacity;

    @ManyToOne
    @JsonIgnoreProperties("sections")
    private Course course;

    @OneToMany(mappedBy = "section")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Assignment> assignments = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCrn() {
        return crn;
    }

    public Section crn(Long crn) {
        this.crn = crn;
        return this;
    }

    public void setCrn(Long crn) {
        this.crn = crn;
    }

    public Long getSectNo() {
        return sectNo;
    }

    public Section sectNo(Long sectNo) {
        this.sectNo = sectNo;
        return this;
    }

    public void setSectNo(Long sectNo) {
        this.sectNo = sectNo;
    }

    public String getSemester() {
        return semester;
    }

    public Section semester(String semester) {
        this.semester = semester;
        return this;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getLectureTime() {
        return lectureTime;
    }

    public Section lectureTime(String lectureTime) {
        this.lectureTime = lectureTime;
        return this;
    }

    public void setLectureTime(String lectureTime) {
        this.lectureTime = lectureTime;
    }

    public String getLabTime() {
        return labTime;
    }

    public Section labTime(String labTime) {
        this.labTime = labTime;
        return this;
    }

    public void setLabTime(String labTime) {
        this.labTime = labTime;
    }

    public String getLectureRoom() {
        return lectureRoom;
    }

    public Section lectureRoom(String lectureRoom) {
        this.lectureRoom = lectureRoom;
        return this;
    }

    public void setLectureRoom(String lectureRoom) {
        this.lectureRoom = lectureRoom;
    }

    public String getLabRoom() {
        return labRoom;
    }

    public Section labRoom(String labRoom) {
        this.labRoom = labRoom;
        return this;
    }

    public void setLabRoom(String labRoom) {
        this.labRoom = labRoom;
    }

    public Long getCapacity() {
        return capacity;
    }

    public Section capacity(Long capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Course getCourse() {
        return course;
    }

    public Section course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<Assignment> getAssignments() {
        return assignments;
    }

    public Section assignments(Set<Assignment> assignments) {
        this.assignments = assignments;
        return this;
    }

    public Section addAssignment(Assignment assignment) {
        this.assignments.add(assignment);
        assignment.setSection(this);
        return this;
    }

    public Section removeAssignment(Assignment assignment) {
        this.assignments.remove(assignment);
        assignment.setSection(null);
        return this;
    }

    public void setAssignments(Set<Assignment> assignments) {
        this.assignments = assignments;
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
        Section section = (Section) o;
        if (section.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), section.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Section{" +
            "id=" + getId() +
            ", crn=" + getCrn() +
            ", sectNo=" + getSectNo() +
            ", semester='" + getSemester() + "'" +
            ", lectureTime='" + getLectureTime() + "'" +
            ", labTime='" + getLabTime() + "'" +
            ", lectureRoom='" + getLectureRoom() + "'" +
            ", labRoom='" + getLabRoom() + "'" +
            ", capacity=" + getCapacity() +
            "}";
    }
}
