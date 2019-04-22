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

    @Column(name = "section_id")
    private Integer sectionId;

    @Column(name = "semester")
    private String semester;

    @Column(name = "jhi_year")
    private Integer year;

    @Column(name = "lab_room")
    private String labRoom;

    @Column(name = "lecture_room")
    private String lectureRoom;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "enrolled")
    private Integer enrolled;

    @OneToMany(mappedBy = "section")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Document> docs = new HashSet<>();
    @OneToMany(mappedBy = "sectionLecture")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TimeWindow> lectureTimes = new HashSet<>();
    @OneToMany(mappedBy = "sectionLab")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TimeWindow> labTimes = new HashSet<>();
    @OneToMany(mappedBy = "section")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TANote> taNotes = new HashSet<>();
    @OneToMany(mappedBy = "section")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FacultyNote> facutlyNotes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("sections")
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("sections")
    private Faculty faculty;

    @ManyToMany(mappedBy = "sections")
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

    public Integer getSectionId() {
        return sectionId;
    }

    public Section sectionId(Integer sectionId) {
        this.sectionId = sectionId;
        return this;
    }

    public void setSectionId(Integer sectionId) {
        this.sectionId = sectionId;
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

    public Integer getYear() {
        return year;
    }

    public Section year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
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

    public Integer getCapacity() {
        return capacity;
    }

    public Section capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getEnrolled() {
        return enrolled;
    }

    public Section enrolled(Integer enrolled) {
        this.enrolled = enrolled;
        return this;
    }

    public void setEnrolled(Integer enrolled) {
        this.enrolled = enrolled;
    }

    public Set<Document> getDocs() {
        return docs;
    }

    public Section docs(Set<Document> documents) {
        this.docs = documents;
        return this;
    }

    public Section addDoc(Document document) {
        this.docs.add(document);
        document.setSection(this);
        return this;
    }

    public Section removeDoc(Document document) {
        this.docs.remove(document);
        document.setSection(null);
        return this;
    }

    public void setDocs(Set<Document> documents) {
        this.docs = documents;
    }

    public Set<TimeWindow> getLectureTimes() {
        return lectureTimes;
    }

    public Section lectureTimes(Set<TimeWindow> timeWindows) {
        this.lectureTimes = timeWindows;
        return this;
    }

    public Section addLectureTime(TimeWindow timeWindow) {
        this.lectureTimes.add(timeWindow);
        timeWindow.setSectionLecture(this);
        return this;
    }

    public Section removeLectureTime(TimeWindow timeWindow) {
        this.lectureTimes.remove(timeWindow);
        timeWindow.setSectionLecture(null);
        return this;
    }

    public void setLectureTimes(Set<TimeWindow> timeWindows) {
        this.lectureTimes = timeWindows;
    }

    public Set<TimeWindow> getLabTimes() {
        return labTimes;
    }

    public Section labTimes(Set<TimeWindow> timeWindows) {
        this.labTimes = timeWindows;
        return this;
    }

    public Section addLabTime(TimeWindow timeWindow) {
        this.labTimes.add(timeWindow);
        timeWindow.setSectionLab(this);
        return this;
    }

    public Section removeLabTime(TimeWindow timeWindow) {
        this.labTimes.remove(timeWindow);
        timeWindow.setSectionLab(null);
        return this;
    }

    public void setLabTimes(Set<TimeWindow> timeWindows) {
        this.labTimes = timeWindows;
    }

    public Set<TANote> getTaNotes() {
        return taNotes;
    }

    public Section taNotes(Set<TANote> tANotes) {
        this.taNotes = tANotes;
        return this;
    }

    public Section addTaNote(TANote tANote) {
        this.taNotes.add(tANote);
        tANote.setSection(this);
        return this;
    }

    public Section removeTaNote(TANote tANote) {
        this.taNotes.remove(tANote);
        tANote.setSection(null);
        return this;
    }

    public void setTaNotes(Set<TANote> tANotes) {
        this.taNotes = tANotes;
    }

    public Set<FacultyNote> getFacutlyNotes() {
        return facutlyNotes;
    }

    public Section facutlyNotes(Set<FacultyNote> facultyNotes) {
        this.facutlyNotes = facultyNotes;
        return this;
    }

    public Section addFacutlyNote(FacultyNote facultyNote) {
        this.facutlyNotes.add(facultyNote);
        facultyNote.setSection(this);
        return this;
    }

    public Section removeFacutlyNote(FacultyNote facultyNote) {
        this.facutlyNotes.remove(facultyNote);
        facultyNote.setSection(null);
        return this;
    }

    public void setFacutlyNotes(Set<FacultyNote> facultyNotes) {
        this.facutlyNotes = facultyNotes;
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

    public Faculty getFaculty() {
        return faculty;
    }

    public Section faculty(Faculty faculty) {
        this.faculty = faculty;
        return this;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public Set<Ta> getTas() {
        return tas;
    }

    public Section tas(Set<Ta> tas) {
        this.tas = tas;
        return this;
    }

    public Section addTa(Ta ta) {
        this.tas.add(ta);
        ta.getSections().add(this);
        return this;
    }

    public Section removeTa(Ta ta) {
        this.tas.remove(ta);
        ta.getSections().remove(this);
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
            ", sectionId=" + getSectionId() +
            ", semester='" + getSemester() + "'" +
            ", year=" + getYear() +
            ", labRoom='" + getLabRoom() + "'" +
            ", lectureRoom='" + getLectureRoom() + "'" +
            ", capacity=" + getCapacity() +
            ", enrolled=" + getEnrolled() +
            "}";
    }
}
