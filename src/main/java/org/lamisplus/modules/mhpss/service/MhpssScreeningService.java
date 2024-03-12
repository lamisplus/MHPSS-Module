package org.lamisplus.modules.mhpss.service;

import org.lamisplus.modules.mhpss.domain.dto.PatientActivity;
import org.lamisplus.modules.mhpss.domain.dto.ScreeningRequestDto;
import org.lamisplus.modules.mhpss.domain.dto.ScreeningResponseDto;
import org.lamisplus.modules.mhpss.domain.entity.MhpssClient;
import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MhpssScreeningService {
    Person getPerson(Long personId);


    Page<Person> findMhpssPersonPage(String searchValue, int pageNo, int pageSize);

    Page<MhpssClient> findAllPersonPage(String searchValue, int pageNo, int pageSize);

    List<PatientActivity> getMhpssPatientActivitiesById(String id);
    ScreeningResponseDto getMhpss(String  id);

    ScreeningResponseDto create(ScreeningRequestDto mhpss);

    boolean shouldRefer(ScreeningRequestDto screeningDto);

    ScreeningResponseDto update(ScreeningRequestDto mhpss);

    void delete(String id);

    Optional <MhpssScreening> findById(String id);

    boolean encounterDateExists(Person person, LocalDate encounterDate);

    boolean encounterDateExistsForUpdate(String personId, LocalDate encounterDate, String id);
}
