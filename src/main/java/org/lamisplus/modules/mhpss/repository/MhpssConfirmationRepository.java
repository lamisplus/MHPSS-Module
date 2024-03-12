package org.lamisplus.modules.mhpss.repository;

import org.lamisplus.modules.mhpss.domain.entity.MhpssConfirmation;
import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MhpssConfirmationRepository extends JpaRepository<MhpssConfirmation, String>, JpaSpecificationExecutor<MhpssConfirmation> {

    List<MhpssConfirmation> findByMhpssScreeningOrderByEncounterDateDesc(MhpssScreening mhpssScreening);

    @Query(value = "select confirmation.* FROM mhpss_screening screening " +
            "JOIN patient_person person " +
            "ON screening.person_uuid = person.uuid " +
            "JOIN mhpss_confirmation confirmation " +
            "ON screening.id = confirmation.mhpss_screening " +
            "WHERE screening.id = :mhpss_screening_id AND confirmation.encounter_date = :encounterDate", nativeQuery = true)
    List<MhpssConfirmation> findAllEncounterDateOfPerson(@Param("mhpss_screening_id") String mhpss_screening_id, @Param("encounterDate") LocalDate encounterDate);

    @Query(value = "select confirmation.* FROM mhpss_screening screening " +
            "JOIN patient_person person " +
            "ON screening.person_uuid = person.uuid " +
            "JOIN mhpss_confirmation confirmation " +
            "ON screening.id = confirmation.mhpss_screening " +
            "WHERE screening.id = :mhpss_screening_id AND confirmation.encounter_date = :encounterDate AND confirmation.id != :confirmation_id", nativeQuery = true)
    List<MhpssConfirmation> findAllEncounterDateOfPersonAndIdNot(@Param("mhpss_screening_id") String mhpss_screening_id,
                                                                 @Param("encounterDate") LocalDate encounterDate,
                                                                 @Param("confirmation_id") String confirmation_id);

}
