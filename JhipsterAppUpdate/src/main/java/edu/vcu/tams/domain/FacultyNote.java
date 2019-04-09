package edu.vcu.tams.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A FacultyNote.
 */
@Entity
@Table(name = "faculty_note")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FacultyNote implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_on")
    private Instant createdOn;

    @Column(name = "note_text")
    private String noteText;

    @ManyToOne
    @JsonIgnoreProperties("notes")
    private Ta ta;

    @ManyToOne
    @JsonIgnoreProperties("facutlyNotes")
    private Section section;

    @ManyToOne
    @JsonIgnoreProperties("facultyNotes")
    private Faculty writtenBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public FacultyNote createdOn(Instant createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public String getNoteText() {
        return noteText;
    }

    public FacultyNote noteText(String noteText) {
        this.noteText = noteText;
        return this;
    }

    public void setNoteText(String noteText) {
        this.noteText = noteText;
    }

    public Ta getTa() {
        return ta;
    }

    public FacultyNote ta(Ta ta) {
        this.ta = ta;
        return this;
    }

    public void setTa(Ta ta) {
        this.ta = ta;
    }

    public Section getSection() {
        return section;
    }

    public FacultyNote section(Section section) {
        this.section = section;
        return this;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Faculty getWrittenBy() {
        return writtenBy;
    }

    public FacultyNote writtenBy(Faculty faculty) {
        this.writtenBy = faculty;
        return this;
    }

    public void setWrittenBy(Faculty faculty) {
        this.writtenBy = faculty;
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
        FacultyNote facultyNote = (FacultyNote) o;
        if (facultyNote.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), facultyNote.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FacultyNote{" +
            "id=" + getId() +
            ", createdOn='" + getCreatedOn() + "'" +
            ", noteText='" + getNoteText() + "'" +
            "}";
    }
}
