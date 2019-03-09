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
 * A Ta.
 */
@Entity
@Table(name = "ta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ta implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "v_num")
    private String vNum;

    @Column(name = "class_year")
    private String classYear;

    @Column(name = "expected_grad_year")
    private Integer expectedGradYear;

    @Column(name = "expected_grad_semester")
    private String expectedGradSemester;

    @Column(name = "total_hours_available")
    private Integer totalHoursAvailable;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "taAssigned")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Grading> gradings = new HashSet<>();
    @OneToMany(mappedBy = "ta")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TimeWindow> availabilities = new HashSet<>();
    @OneToMany(mappedBy = "ta")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FacultyNote> notes = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ta_section",
               joinColumns = @JoinColumn(name = "ta_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "section_id", referencedColumnName = "id"))
    private Set<Section> sections = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ta_course_qualified",
               joinColumns = @JoinColumn(name = "ta_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "course_qualified_id", referencedColumnName = "id"))
    private Set<Course> courseQualifieds = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ta_course_has_experience",
               joinColumns = @JoinColumn(name = "ta_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "course_has_experience_id", referencedColumnName = "id"))
    private Set<Course> courseHasExperiences = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ta_available_role",
               joinColumns = @JoinColumn(name = "ta_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "available_role_id", referencedColumnName = "id"))
    private Set<TaRole> availableRoles = new HashSet<>();

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

    public Ta name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public Ta email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getvNum() {
        return vNum;
    }

    public Ta vNum(String vNum) {
        this.vNum = vNum;
        return this;
    }

    public void setvNum(String vNum) {
        this.vNum = vNum;
    }

    public String getClassYear() {
        return classYear;
    }

    public Ta classYear(String classYear) {
        this.classYear = classYear;
        return this;
    }

    public void setClassYear(String classYear) {
        this.classYear = classYear;
    }

    public Integer getExpectedGradYear() {
        return expectedGradYear;
    }

    public Ta expectedGradYear(Integer expectedGradYear) {
        this.expectedGradYear = expectedGradYear;
        return this;
    }

    public void setExpectedGradYear(Integer expectedGradYear) {
        this.expectedGradYear = expectedGradYear;
    }

    public String getExpectedGradSemester() {
        return expectedGradSemester;
    }

    public Ta expectedGradSemester(String expectedGradSemester) {
        this.expectedGradSemester = expectedGradSemester;
        return this;
    }

    public void setExpectedGradSemester(String expectedGradSemester) {
        this.expectedGradSemester = expectedGradSemester;
    }

    public Integer getTotalHoursAvailable() {
        return totalHoursAvailable;
    }

    public Ta totalHoursAvailable(Integer totalHoursAvailable) {
        this.totalHoursAvailable = totalHoursAvailable;
        return this;
    }

    public void setTotalHoursAvailable(Integer totalHoursAvailable) {
        this.totalHoursAvailable = totalHoursAvailable;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Ta isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public User getUser() {
        return user;
    }

    public Ta user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Grading> getGradings() {
        return gradings;
    }

    public Ta gradings(Set<Grading> gradings) {
        this.gradings = gradings;
        return this;
    }

    public Ta addGrading(Grading grading) {
        this.gradings.add(grading);
        grading.setTaAssigned(this);
        return this;
    }

    public Ta removeGrading(Grading grading) {
        this.gradings.remove(grading);
        grading.setTaAssigned(null);
        return this;
    }

    public void setGradings(Set<Grading> gradings) {
        this.gradings = gradings;
    }

    public Set<TimeWindow> getAvailabilities() {
        return availabilities;
    }

    public Ta availabilities(Set<TimeWindow> timeWindows) {
        this.availabilities = timeWindows;
        return this;
    }

    public Ta addAvailability(TimeWindow timeWindow) {
        this.availabilities.add(timeWindow);
        timeWindow.setTa(this);
        return this;
    }

    public Ta removeAvailability(TimeWindow timeWindow) {
        this.availabilities.remove(timeWindow);
        timeWindow.setTa(null);
        return this;
    }

    public void setAvailabilities(Set<TimeWindow> timeWindows) {
        this.availabilities = timeWindows;
    }

    public Set<FacultyNote> getNotes() {
        return notes;
    }

    public Ta notes(Set<FacultyNote> facultyNotes) {
        this.notes = facultyNotes;
        return this;
    }

    public Ta addNote(FacultyNote facultyNote) {
        this.notes.add(facultyNote);
        facultyNote.setTa(this);
        return this;
    }

    public Ta removeNote(FacultyNote facultyNote) {
        this.notes.remove(facultyNote);
        facultyNote.setTa(null);
        return this;
    }

    public void setNotes(Set<FacultyNote> facultyNotes) {
        this.notes = facultyNotes;
    }

    public Set<Section> getSections() {
        return sections;
    }

    public Ta sections(Set<Section> sections) {
        this.sections = sections;
        return this;
    }

    public Ta addSection(Section section) {
        this.sections.add(section);
        section.getTas().add(this);
        return this;
    }

    public Ta removeSection(Section section) {
        this.sections.remove(section);
        section.getTas().remove(this);
        return this;
    }

    public void setSections(Set<Section> sections) {
        this.sections = sections;
    }

    public Set<Course> getCourseQualifieds() {
        return courseQualifieds;
    }

    public Ta courseQualifieds(Set<Course> courses) {
        this.courseQualifieds = courses;
        return this;
    }

    public Ta addCourseQualified(Course course) {
        this.courseQualifieds.add(course);
        course.getQualifiedTas().add(this);
        return this;
    }

    public Ta removeCourseQualified(Course course) {
        this.courseQualifieds.remove(course);
        course.getQualifiedTas().remove(this);
        return this;
    }

    public void setCourseQualifieds(Set<Course> courses) {
        this.courseQualifieds = courses;
    }

    public Set<Course> getCourseHasExperiences() {
        return courseHasExperiences;
    }

    public Ta courseHasExperiences(Set<Course> courses) {
        this.courseHasExperiences = courses;
        return this;
    }

    public Ta addCourseHasExperience(Course course) {
        this.courseHasExperiences.add(course);
        course.getExperiencedTas().add(this);
        return this;
    }

    public Ta removeCourseHasExperience(Course course) {
        this.courseHasExperiences.remove(course);
        course.getExperiencedTas().remove(this);
        return this;
    }

    public void setCourseHasExperiences(Set<Course> courses) {
        this.courseHasExperiences = courses;
    }

    public Set<TaRole> getAvailableRoles() {
        return availableRoles;
    }

    public Ta availableRoles(Set<TaRole> taRoles) {
        this.availableRoles = taRoles;
        return this;
    }

    public Ta addAvailableRole(TaRole taRole) {
        this.availableRoles.add(taRole);
        taRole.getTas().add(this);
        return this;
    }

    public Ta removeAvailableRole(TaRole taRole) {
        this.availableRoles.remove(taRole);
        taRole.getTas().remove(this);
        return this;
    }

    public void setAvailableRoles(Set<TaRole> taRoles) {
        this.availableRoles = taRoles;
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
        Ta ta = (Ta) o;
        if (ta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ta{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", vNum='" + getvNum() + "'" +
            ", classYear='" + getClassYear() + "'" +
            ", expectedGradYear=" + getExpectedGradYear() +
            ", expectedGradSemester='" + getExpectedGradSemester() + "'" +
            ", totalHoursAvailable=" + getTotalHoursAvailable() +
            ", isActive='" + isIsActive() + "'" +
            "}";
    }
}
