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

import edu.vcu.tams.domain.enumeration.GradingStyle;

import edu.vcu.tams.domain.enumeration.AssignmentType;

/**
 * A Assignment.
 */
@Entity
@Table(name = "assignment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Assignment implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "total_points")
    private Integer totalPoints;

    @Column(name = "num_parts")
    private Integer numParts;

    @Column(name = "num_submissions")
    private Integer numSubmissions;

    @Enumerated(EnumType.STRING)
    @Column(name = "grade_by")
    private GradingStyle gradeBy;

    @Column(name = "grading_directions")
    private String gradingDirections;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private AssignmentType type;

    @Column(name = "grading_link")
    private String gradingLink;

    @OneToMany(mappedBy = "forAssignment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Grading> gradings = new HashSet<>();
    @OneToMany(mappedBy = "assignment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Document> docs = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("assignments")
    private Section section;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Assignment description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public Assignment totalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
        return this;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public Integer getNumParts() {
        return numParts;
    }

    public Assignment numParts(Integer numParts) {
        this.numParts = numParts;
        return this;
    }

    public void setNumParts(Integer numParts) {
        this.numParts = numParts;
    }

    public Integer getNumSubmissions() {
        return numSubmissions;
    }

    public Assignment numSubmissions(Integer numSubmissions) {
        this.numSubmissions = numSubmissions;
        return this;
    }

    public void setNumSubmissions(Integer numSubmissions) {
        this.numSubmissions = numSubmissions;
    }

    public GradingStyle getGradeBy() {
        return gradeBy;
    }

    public Assignment gradeBy(GradingStyle gradeBy) {
        this.gradeBy = gradeBy;
        return this;
    }

    public void setGradeBy(GradingStyle gradeBy) {
        this.gradeBy = gradeBy;
    }

    public String getGradingDirections() {
        return gradingDirections;
    }

    public Assignment gradingDirections(String gradingDirections) {
        this.gradingDirections = gradingDirections;
        return this;
    }

    public void setGradingDirections(String gradingDirections) {
        this.gradingDirections = gradingDirections;
    }

    public AssignmentType getType() {
        return type;
    }

    public Assignment type(AssignmentType type) {
        this.type = type;
        return this;
    }

    public void setType(AssignmentType type) {
        this.type = type;
    }

    public String getGradingLink() {
        return gradingLink;
    }

    public Assignment gradingLink(String gradingLink) {
        this.gradingLink = gradingLink;
        return this;
    }

    public void setGradingLink(String gradingLink) {
        this.gradingLink = gradingLink;
    }

    public Set<Grading> getGradings() {
        return gradings;
    }

    public Assignment gradings(Set<Grading> gradings) {
        this.gradings = gradings;
        return this;
    }

    public Assignment addGrading(Grading grading) {
        this.gradings.add(grading);
        grading.setForAssignment(this);
        return this;
    }

    public Assignment removeGrading(Grading grading) {
        this.gradings.remove(grading);
        grading.setForAssignment(null);
        return this;
    }

    public void setGradings(Set<Grading> gradings) {
        this.gradings = gradings;
    }

    public Set<Document> getDocs() {
        return docs;
    }

    public Assignment docs(Set<Document> documents) {
        this.docs = documents;
        return this;
    }

    public Assignment addDoc(Document document) {
        this.docs.add(document);
        document.setAssignment(this);
        return this;
    }

    public Assignment removeDoc(Document document) {
        this.docs.remove(document);
        document.setAssignment(null);
        return this;
    }

    public void setDocs(Set<Document> documents) {
        this.docs = documents;
    }

    public Section getSection() {
        return section;
    }

    public Assignment section(Section section) {
        this.section = section;
        return this;
    }

    public void setSection(Section section) {
        this.section = section;
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
        Assignment assignment = (Assignment) o;
        if (assignment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Assignment{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", totalPoints=" + getTotalPoints() +
            ", numParts=" + getNumParts() +
            ", numSubmissions=" + getNumSubmissions() +
            ", gradeBy='" + getGradeBy() + "'" +
            ", gradingDirections='" + getGradingDirections() + "'" +
            ", type='" + getType() + "'" +
            ", gradingLink='" + getGradingLink() + "'" +
            "}";
    }
}
