package org.lamisplus.modules.mhpss.domain.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.lamisplus.modules.base.domain.entities.Audit;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;


@Entity
@ToString(exclude = {"mhpssScreening"})
@Data
@EqualsAndHashCode(callSuper = false)
@Table(name = "mhpss_confirmation")
@SQLDelete(sql = "UPDATE mhpss_confirmation SET archived = true WHERE id=?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
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

    @JoinColumn(name = "mhpss_screening_id", referencedColumnName = "id", nullable = false)
    @ManyToOne
    private MhpssScreening mhpssScreening;

    @Column(nullable = false)
    private String createdBy;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

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
