package org.lamisplus.modules.mhpss.domain.entity;

import com.vladmihalcea.hibernate.type.array.IntArrayType;
import com.vladmihalcea.hibernate.type.array.StringArrayType;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeStringType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.*;
import org.lamisplus.modules.base.domain.entities.Audit;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data
@Table(name = "mhpss_confirmation")
@SQLDelete(sql = "UPDATE mhpss_confirmation SET archived = true WHERE id=?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@NoArgsConstructor
@TypeDefs({
        @TypeDef(name = "string-array", typeClass = StringArrayType.class),
        @TypeDef(name = "int-array", typeClass = IntArrayType.class),
        @TypeDef(name = "json", typeClass = JsonStringType.class),
        @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class),
        @TypeDef(name = "jsonb-node", typeClass = JsonNodeBinaryType.class),
        @TypeDef(name = "json-node", typeClass = JsonNodeStringType.class),
})
public class MhpssConfirmation implements Serializable, Persistable<String> {
    @Id
    @GeneratedValue( generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Basic(optional = false)
    @Column(name = "id")
    private String id;

    @Column(name = "archived")
    private boolean archived;

    @JoinColumn(name = "mhpss_screening", referencedColumnName = "id", nullable = false)
    @ManyToOne
    private MhpssScreening mhpssScreening;

    @JoinColumn(name = "patient_visit_id", referencedColumnName = "uuid", nullable = false)
    @OneToOne
    private Visit patientVisit;

    @Type(type= "jsonb")
    @Column(
            name = "interventions_rendered",
            columnDefinition = "jsonb"
    )
    @NotNull(message = "Interventions Rendered Cannot Be Null")
    private List<String> interventionsRendered;

    @Type(type= "jsonb")
    @Column(
            name = "risks_confirmed",
            columnDefinition = "jsonb"
    )
    @NotNull(message = "Risks Confirmed Cannot Be Null")
    private List<String> risksConfirmed;

    @NotNull(message = "Session Modality Cannot Be Null")
    @Column(name = "session_modality")
    private String sessionModality;

    @NotNull(message = "Current Level of Insight Cannot Be Null")
    @Column(name = "current_level_of_insight")
    private String currentLevelOfInsight;

    @NotNull(message = "Confirmation Outcome Cannot Be Null")
    @Column(name = "confirmation_outcome")
    private String confirmationOutcome;

    @NotNull(message = "Confirmed By Cannot Be Null")
    @Column(name = "confirmed_by")
    private String confirmedBy;

    @Column(name = "gad_7")
    private String gad7;
    @Column(name = "audit_c")
    private String auditC;
    @Column(name = "pcl_5")
    private String pcl5;
    @Column(name = "phq_9")
    private String phq9;
    @Column(name = "dast_10")
    private String dast10;

    @NotNull(message = "Diagnosis Cannot Be Null")
    @Column(name = "diagnosis")
    private String diagnosis;

    @NotNull(message = "Diagnosed By Cannot Be Null")
    @Column(name = "diagnosed_by")
    private String diagnosedBy;

    @NotNull(message = "Clinician Name Cannot Be Null")
    @Column(name = "clinician_name")
    private String clinicianName;

    @NotNull(message = "Encounter Date Cannot Be Null")
    @Column(name = "encounter_date")
    private LocalDate encounterDate;

    @Column(nullable = false, name = "created_by")
    private String createdBy;

    @Column(updatable = false, name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(nullable = false, name = "updated_by")
    private String updatedBy;

    @Override
    public boolean isNew() {
        return id == null;
    }

    @PrePersist
    public void create() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void update() {
        updatedAt = LocalDateTime.now();
    }

}
