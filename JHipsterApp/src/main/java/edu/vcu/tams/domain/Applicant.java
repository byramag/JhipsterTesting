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

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "v_number")
    private String vNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "ta_motivation")
    private String taMotivation;

    @Column(name = "ref_name")
    private String refName;

    @Column(name = "ref_email")
    private String refEmail;

    @Column(name = "ref_response")
    private String refResponse;

    @Column(name = "is_confirmed")
    private Boolean isConfirmed;

    @OneToOne
    @JoinColumn(unique = true)
    private TA ta;

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

    public Applicant studentName(String studentName) {
        this.studentName = studentName;
        return this;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getvNumber() {
        return vNumber;
    }

    public Applicant vNumber(String vNumber) {
        this.vNumber = vNumber;
        return this;
    }

    public void setvNumber(String vNumber) {
        this.vNumber = vNumber;
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

    public String getTaMotivation() {
        return taMotivation;
    }

    public Applicant taMotivation(String taMotivation) {
        this.taMotivation = taMotivation;
        return this;
    }

    public void setTaMotivation(String taMotivation) {
        this.taMotivation = taMotivation;
    }

    public String getRefName() {
        return refName;
    }

    public Applicant refName(String refName) {
        this.refName = refName;
        return this;
    }

    public void setRefName(String refName) {
        this.refName = refName;
    }

    public String getRefEmail() {
        return refEmail;
    }

    public Applicant refEmail(String refEmail) {
        this.refEmail = refEmail;
        return this;
    }

    public void setRefEmail(String refEmail) {
        this.refEmail = refEmail;
    }

    public String getRefResponse() {
        return refResponse;
    }

    public Applicant refResponse(String refResponse) {
        this.refResponse = refResponse;
        return this;
    }

    public void setRefResponse(String refResponse) {
        this.refResponse = refResponse;
    }

    public Boolean isIsConfirmed() {
        return isConfirmed;
    }

    public Applicant isConfirmed(Boolean isConfirmed) {
        this.isConfirmed = isConfirmed;
        return this;
    }

    public void setIsConfirmed(Boolean isConfirmed) {
        this.isConfirmed = isConfirmed;
    }

    public TA getTa() {
        return ta;
    }

    public Applicant ta(TA tA) {
        this.ta = tA;
        return this;
    }

    public void setTa(TA tA) {
        this.ta = tA;
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
            ", studentName='" + getStudentName() + "'" +
            ", vNumber='" + getvNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", taMotivation='" + getTaMotivation() + "'" +
            ", refName='" + getRefName() + "'" +
            ", refEmail='" + getRefEmail() + "'" +
            ", refResponse='" + getRefResponse() + "'" +
            ", isConfirmed='" + isIsConfirmed() + "'" +
            "}";
    }
}
