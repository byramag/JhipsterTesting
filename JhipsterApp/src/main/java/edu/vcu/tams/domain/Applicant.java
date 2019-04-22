package edu.vcu.tams.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Applicant.
 */
@Entity
@Table(name = "applicant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Applicant implements Serializable {

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

    @Column(name = "statement")
    private String statement;

    @Column(name = "grade_255")
    private String grade255;

    @Column(name = "grade_256")
    private String grade256;

    @Column(name = "grade_257")
    private String grade257;

    @Column(name = "reference_email")
    private String referenceEmail;

    @Column(name = "reference_response")
    private String referenceResponse;

    @Column(name = "is_recommended")
    private Boolean isRecommended;

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

    public Applicant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public Applicant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getvNum() {
        return vNum;
    }

    public Applicant vNum(String vNum) {
        this.vNum = vNum;
        return this;
    }

    public void setvNum(String vNum) {
        this.vNum = vNum;
    }

    public String getClassYear() {
        return classYear;
    }

    public Applicant classYear(String classYear) {
        this.classYear = classYear;
        return this;
    }

    public void setClassYear(String classYear) {
        this.classYear = classYear;
    }

    public Integer getExpectedGradYear() {
        return expectedGradYear;
    }

    public Applicant expectedGradYear(Integer expectedGradYear) {
        this.expectedGradYear = expectedGradYear;
        return this;
    }

    public void setExpectedGradYear(Integer expectedGradYear) {
        this.expectedGradYear = expectedGradYear;
    }

    public String getExpectedGradSemester() {
        return expectedGradSemester;
    }

    public Applicant expectedGradSemester(String expectedGradSemester) {
        this.expectedGradSemester = expectedGradSemester;
        return this;
    }

    public void setExpectedGradSemester(String expectedGradSemester) {
        this.expectedGradSemester = expectedGradSemester;
    }

    public String getStatement() {
        return statement;
    }

    public Applicant statement(String statement) {
        this.statement = statement;
        return this;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public String getGrade255() {
        return grade255;
    }

    public Applicant grade255(String grade255) {
        this.grade255 = grade255;
        return this;
    }

    public void setGrade255(String grade255) {
        this.grade255 = grade255;
    }

    public String getGrade256() {
        return grade256;
    }

    public Applicant grade256(String grade256) {
        this.grade256 = grade256;
        return this;
    }

    public void setGrade256(String grade256) {
        this.grade256 = grade256;
    }

    public String getGrade257() {
        return grade257;
    }

    public Applicant grade257(String grade257) {
        this.grade257 = grade257;
        return this;
    }

    public void setGrade257(String grade257) {
        this.grade257 = grade257;
    }

    public String getReferenceEmail() {
        return referenceEmail;
    }

    public Applicant referenceEmail(String referenceEmail) {
        this.referenceEmail = referenceEmail;
        return this;
    }

    public void setReferenceEmail(String referenceEmail) {
        this.referenceEmail = referenceEmail;
    }

    public String getReferenceResponse() {
        return referenceResponse;
    }

    public Applicant referenceResponse(String referenceResponse) {
        this.referenceResponse = referenceResponse;
        return this;
    }

    public void setReferenceResponse(String referenceResponse) {
        this.referenceResponse = referenceResponse;
    }

    public Boolean isIsRecommended() {
        return isRecommended;
    }

    public Applicant isRecommended(Boolean isRecommended) {
        this.isRecommended = isRecommended;
        return this;
    }

    public void setIsRecommended(Boolean isRecommended) {
        this.isRecommended = isRecommended;
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
        Applicant applicant = (Applicant) o;
        if (applicant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), applicant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Applicant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", vNum='" + getvNum() + "'" +
            ", classYear='" + getClassYear() + "'" +
            ", expectedGradYear=" + getExpectedGradYear() +
            ", expectedGradSemester='" + getExpectedGradSemester() + "'" +
            ", statement='" + getStatement() + "'" +
            ", grade255='" + getGrade255() + "'" +
            ", grade256='" + getGrade256() + "'" +
            ", grade257='" + getGrade257() + "'" +
            ", referenceEmail='" + getReferenceEmail() + "'" +
            ", referenceResponse='" + getReferenceResponse() + "'" +
            ", isRecommended='" + isIsRecommended() + "'" +
            "}";
    }
}
