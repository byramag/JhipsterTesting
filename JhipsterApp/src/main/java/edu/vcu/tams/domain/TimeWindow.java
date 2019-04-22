package edu.vcu.tams.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TimeWindow.
 */
@Entity
@Table(name = "time_window")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TimeWindow implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @ManyToOne
    @JsonIgnoreProperties("availabilities")
    private Ta ta;

    @ManyToOne
    @JsonIgnoreProperties("lectureTimes")
    private Section sectionLecture;

    @ManyToOne
    @JsonIgnoreProperties("labTimes")
    private Section sectionLab;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public TimeWindow startTime(Instant startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public TimeWindow endTime(Instant endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public Ta getTa() {
        return ta;
    }

    public TimeWindow ta(Ta ta) {
        this.ta = ta;
        return this;
    }

    public void setTa(Ta ta) {
        this.ta = ta;
    }

    public Section getSectionLecture() {
        return sectionLecture;
    }

    public TimeWindow sectionLecture(Section section) {
        this.sectionLecture = section;
        return this;
    }

    public void setSectionLecture(Section section) {
        this.sectionLecture = section;
    }

    public Section getSectionLab() {
        return sectionLab;
    }

    public TimeWindow sectionLab(Section section) {
        this.sectionLab = section;
        return this;
    }

    public void setSectionLab(Section section) {
        this.sectionLab = section;
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
        TimeWindow timeWindow = (TimeWindow) o;
        if (timeWindow.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timeWindow.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TimeWindow{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            "}";
    }
}
