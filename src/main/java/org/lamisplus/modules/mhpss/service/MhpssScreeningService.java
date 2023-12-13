package org.lamisplus.modules.mhpss.service;

import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.mhpss.domain.dto.PatientActivity;
import org.lamisplus.modules.mhpss.domain.entity.MhpssClient;
import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.lamisplus.modules.base.util.Constants.ArchiveStatus.UN_ARCHIVED;

public interface MhpssScreeningService {
    Person getPerson(Long personId);


    Page<Person> findPrepPersonPage(String searchValue, int pageNo, int pageSize);

    Page<MhpssClient> findAllPrepPersonPage(String searchValue, int pageNo, int pageSize);

    List<PatientActivity> getMhpssPatientActivitiesById(String id);
    MhpssScreening getMhpss(String  id);
}
