package edu.vcu.tams.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TANote.
 */
@Entity
@Table(name = "ta_note")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TANote implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_on")
    private Instant createdOn;

    @Column(name = "note_text")
    private String noteText;

    @ManyToOne
    @JsonIgnoreProperties("taNotes")
    private Section section;

    @ManyToOne
    @JsonIgnoreProperties("tANotes")
    private Ta writtenBy;

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

    public TANote createdOn(Instant createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public String getNoteText() {
        return noteText;
    }

    public TANote noteText(String noteText) {
        this.noteText = noteText;
        return this;
    }

    public void setNoteText(String noteText) {
        this.noteText = noteText;
    }

    public Section getSection() {
        return section;
    }

    public TANote section(Section section) {
        this.section = section;
        return this;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Ta getWrittenBy() {
        return writtenBy;
    }

    public TANote writtenBy(Ta ta) {
        this.writtenBy = ta;
        return this;
    }

    public void setWrittenBy(Ta ta) {
        this.writtenBy = ta;
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
        TANote tANote = (TANote) o;
        if (tANote.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tANote.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TANote{" +
            "id=" + getId() +
            ", createdOn='" + getCreatedOn() + "'" +
            ", noteText='" + getNoteText() + "'" +
            "}";
    }
}
