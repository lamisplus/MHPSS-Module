package org.lamisplus.modules.mhpss.service;

import jdk.nashorn.internal.runtime.regexp.joni.encoding.ObjPtr;
import org.lamisplus.modules.mhpss.domain.dto.PatientActivity;
import org.lamisplus.modules.mhpss.domain.dto.ScreeningRequestDto;
import org.lamisplus.modules.mhpss.domain.dto.ScreeningResponseDto;
import org.lamisplus.modules.mhpss.domain.entity.MhpssClient;
import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface MhpssScreeningService {
    Person getPerson(Long personId);


    Page<Person> findPrepPersonPage(String searchValue, int pageNo, int pageSize);

    Page<MhpssClient> findAllPersonPage(String searchValue, int pageNo, int pageSize);

    List<PatientActivity> getMhpssPatientActivitiesById(String id);
    ScreeningResponseDto getMhpss(String  id);

    ScreeningResponseDto create(ScreeningRequestDto mhpss);

    boolean shouldRefer(ScreeningRequestDto screeningDto);

    ScreeningResponseDto update(ScreeningRequestDto mhpss);

    void delete(String id);

    Optional <MhpssScreening> findById(String id);
}
