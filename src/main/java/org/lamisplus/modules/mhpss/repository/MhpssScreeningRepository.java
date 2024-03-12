package org.lamisplus.modules.mhpss.repository;

import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.lamisplus.modules.mhpss.domain.entity.MhpssClient;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public interface MhpssScreeningRepository extends JpaRepository<MhpssScreening, String>, JpaSpecificationExecutor<MhpssScreening> {

    @Query(value = "SELECT uuid AS personUuid, hospital_number AS hospitalNumber, INITCAP(sex) as gender, CAST (EXTRACT(YEAR from AGE(NOW(),  date_of_birth)) AS INTEGER) as age, "+
            " first_name AS firstName, surname AS surname, other_name AS otherName," +
            "date_of_birth AS dateOfBirth, CONCAT(address->'address'->0->'line'->>0, ' ',  address->'address'->0->>'city') AS address," +
            " contact_point->'contactPoint'->0->>'value' AS phone " +
            " FROM patient_person p " +
            " WHERE p.archived=?1 AND p.facility_id=?2 AND (p.first_name ILIKE ?3 OR p.full_name ILIKE ?3 " +
            "OR p.surname ILIKE ?3 OR p.other_name ILIKE ?3 " +
            "OR p.hospital_number ILIKE ?3) "
           , nativeQuery = true)
    Page<MhpssClient> findAllPersonBySearchParam(Integer archived, Long facilityId, String search, Pageable pageable);

    @Query(value = "SELECT uuid AS personUuid, hospital_number AS hospitalNumber, INITCAP(sex) as gender, CAST (EXTRACT(YEAR from AGE(NOW(),  date_of_birth)) AS INTEGER) as age, "+
            " first_name AS firstName, surname AS surname, other_name AS otherName, " +
            "date_of_birth AS dateOfBirth, CONCAT(address->'address'->0->'line'->>0, ' ',  address->'address'->0->>'city') AS address," +
            " contact_point->'contactPoint'->0->>'value' AS phone" +
            " FROM patient_person p " +
            " WHERE p.archived=?1 AND p.facility_id=?2 "
            , nativeQuery = true)
    Page<MhpssClient> findAllPerson(Integer archived, Long facilityId, Pageable pageable);

    List<MhpssScreening> findAllByPerson(Person person);
    List<MhpssScreening> findAllByPersonAndEncounterDate(Person person, LocalDate encounterDate);
    @Query(value = "Select * FROM mhpss_screening WHERE person_uuid = ?1 AND encounter_date = ?2 AND id != ?3", nativeQuery = true)
    List<MhpssScreening> findAllByPersonAndEncounterDateAndIdNot(String personId, LocalDate encounterDate, String id);
}