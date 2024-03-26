package org.lamisplus.modules.mhpss.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import com.vladmihalcea.hibernate.type.array.StringArrayType;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeStringType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;
import org.lamisplus.modules.base.domain.entities.Audit;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.springframework.data.domain.Persistable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@Entity
@Data
@Table(name = "mhpss_screening")
@SQLDelete(sql = "UPDATE mhpss_screening SET archived = true WHERE id=?", check = ResultCheckStyle.COUNT)
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
public class MhpssScreening implements Serializable, Persistable<String> {
    @Id
    @GeneratedValue( generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Basic(optional = false)
    @Column(name = "id")
    private String id;

    @JoinColumn(name = "person_uuid", referencedColumnName = "UUID")
    @OneToOne
    private Person person;

    @Column(name = "archived")
    private boolean archived;

    @Column(nullable = false,updatable = false)
    private String createdBy;

    @Column(nullable = false)
    private String updatedBy;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "mhpssScreening")
    @JsonIgnore
    private List<MhpssConfirmation> mhpssConfirmation;

    @JoinColumn(name = "patient_visit_id", referencedColumnName = "uuid", nullable = false)
    @OneToOne
    private Visit patientVisit;

    private String sleepIssues;
    private String recentCalmness;
    private String suicidalThoughts;
    private String recentActivityChallenge;
    private String substanceAbuse;
    private boolean referred;
    private LocalDate encounterDate;
    private String screenedBy;
    private Long facilityId;

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
