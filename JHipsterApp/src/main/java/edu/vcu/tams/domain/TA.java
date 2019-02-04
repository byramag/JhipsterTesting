package edu.vcu.tams.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TA.
 */
@Entity
@Table(name = "ta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TA implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "v_number")
    private String vNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "class_year")
    private String classYear;

    @Column(name = "current_assign")
    private String currentAssign;

    @Column(name = "previous_assign")
    private String previousAssign;

    @Column(name = "ptd_lab_ta")
    private String ptdLabTA;

    @Column(name = "ptd_class_ta")
    private String ptdClassTA;

    @Column(name = "ptd_test_grade")
    private String ptdTestGrade;

    @Column(name = "ptd_office_hours")
    private String ptdOfficeHours;

    @Column(name = "accepted_courses")
    private String acceptedCourses;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ta_section",
               joinColumns = @JoinColumn(name = "ta_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "section_id", referencedColumnName = "id"))
    private Set<Section> sections = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ta_assignment",
               joinColumns = @JoinColumn(name = "ta_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "assignment_id", referencedColumnName = "id"))
    private Set<Assignment> assignments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public TA studentName(String studentName) {
        this.studentName = studentName;
        return this;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getvNumber() {
        return vNumber;
    }

    public TA vNumber(String vNumber) {
        this.vNumber = vNumber;
        return this;
    }

    public void setvNumber(String vNumber) {
        this.vNumber = vNumber;
    }

    public String getEmail() {
        return email;
    }

    public TA email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getClassYear() {
        return classYear;
    }

    public TA classYear(String classYear) {
        this.classYear = classYear;
        return this;
    }

    public void setClassYear(String classYear) {
        this.classYear = classYear;
    }

    public String getCurrentAssign() {
        return currentAssign;
    }

    public TA currentAssign(String currentAssign) {
        this.currentAssign = currentAssign;
        return this;
    }

    public void setCurrentAssign(String currentAssign) {
        this.currentAssign = currentAssign;
    }

    public String getPreviousAssign() {
        return previousAssign;
    }

    public TA previousAssign(String previousAssign) {
        this.previousAssign = previousAssign;
        return this;
    }

    public void setPreviousAssign(String previousAssign) {
        this.previousAssign = previousAssign;
    }

    public String getPtdLabTA() {
        return ptdLabTA;
    }

    public TA ptdLabTA(String ptdLabTA) {
        this.ptdLabTA = ptdLabTA;
        return this;
    }

    public void setPtdLabTA(String ptdLabTA) {
        this.ptdLabTA = ptdLabTA;
    }

    public String getPtdClassTA() {
        return ptdClassTA;
    }

    public TA ptdClassTA(String ptdClassTA) {
        this.ptdClassTA = ptdClassTA;
        return this;
    }

    public void setPtdClassTA(String ptdClassTA) {
        this.ptdClassTA = ptdClassTA;
    }

    public String getPtdTestGrade() {
        return ptdTestGrade;
    }

    public TA ptdTestGrade(String ptdTestGrade) {
        this.ptdTestGrade = ptdTestGrade;
        return this;
    }

    public void setPtdTestGrade(String ptdTestGrade) {
        this.ptdTestGrade = ptdTestGrade;
    }

    public String getPtdOfficeHours() {
        return ptdOfficeHours;
    }

    public TA ptdOfficeHours(String ptdOfficeHours) {
        this.ptdOfficeHours = ptdOfficeHours;
        return this;
    }

    public void setPtdOfficeHours(String ptdOfficeHours) {
        this.ptdOfficeHours = ptdOfficeHours;
    }

    public String getAcceptedCourses() {
        return acceptedCourses;
    }

    public TA acceptedCourses(String acceptedCourses) {
        this.acceptedCourses = acceptedCourses;
        return this;
    }

    public void setAcceptedCourses(String acceptedCourses) {
        this.acceptedCourses = acceptedCourses;
    }

    public Set<Section> getSections() {
        return sections;
    }

    public TA sections(Set<Section> sections) {
        this.sections = sections;
        return this;
    }

    public TA addSection(Section section) {
        this.sections.add(section);
        return this;
    }

    public TA removeSection(Section section) {
        this.sections.remove(section);
        return this;
    }

    public void setSections(Set<Section> sections) {
        this.sections = sections;
    }

    public Set<Assignment> getAssignments() {
        return assignments;
    }

    public TA assignments(Set<Assignment> assignments) {
        this.assignments = assignments;
        return this;
    }

    public TA addAssignment(Assignment assignment) {
        this.assignments.add(assignment);
        return this;
    }

    public TA removeAssignment(Assignment assignment) {
        this.assignments.remove(assignment);
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
        TA tA = (TA) o;
        if (tA.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tA.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TA{" +
            "id=" + getId() +
            ", studentName='" + getStudentName() + "'" +
            ", vNumber='" + getvNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", classYear='" + getClassYear() + "'" +
            ", currentAssign='" + getCurrentAssign() + "'" +
            ", previousAssign='" + getPreviousAssign() + "'" +
            ", ptdLabTA='" + getPtdLabTA() + "'" +
            ", ptdClassTA='" + getPtdClassTA() + "'" +
            ", ptdTestGrade='" + getPtdTestGrade() + "'" +
            ", ptdOfficeHours='" + getPtdOfficeHours() + "'" +
            ", acceptedCourses='" + getAcceptedCourses() + "'" +
            "}";
    }
}
