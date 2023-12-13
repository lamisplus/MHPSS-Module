package org.lamisplus.modules.mhpss.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.mhpss.service.MhpssScreeningService;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.mhpss.domain.dto.*;
import org.lamisplus.modules.mhpss.domain.entity.*;
import org.lamisplus.modules.mhpss.repository.MhpssScreeningRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import static org.lamisplus.modules.base.util.Constants.ArchiveStatus.UN_ARCHIVED;

@Service
@Slf4j
@RequiredArgsConstructor
public class MhpssScreeningServiceImpl implements MhpssScreeningService {
    private final PersonRepository personRepository;
    private final CurrentUserOrganizationServiceImpl currentUserOrganizationServiceImpl;
    private final MhpssScreeningRepository mhpssScreeningRepository;
    private final PatientActivityServiceImpl patientActivityServiceImpl;

    @Override
    public Person getPerson(Long personId) {
        return personRepository.findById (personId)
                .orElseThrow (() -> new EntityNotFoundException(Person.class, "id", String.valueOf (personId)));
    }

    @Override
    public Page<Person> findPrepPersonPage(String searchValue, int pageNo, int pageSize) {
        Long facilityId = currentUserOrganizationServiceImpl.getCurrentUserOrganization();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        if(!String.valueOf(searchValue).equals("null") && !searchValue.equals("*")){
            searchValue = searchValue.replaceAll("\\s", "");
            String queryParam = "%"+searchValue+"%";
            return personRepository
                    .findAllPersonBySearchParameters(queryParam, UN_ARCHIVED, facilityId,  pageable);
        }
        return personRepository
                .getAllByArchivedAndFacilityIdOrderByIdDesc(UN_ARCHIVED, currentUserOrganizationServiceImpl.getCurrentUserOrganization(),pageable);
    }

    @Override
    public Page<MhpssClient> findAllPrepPersonPage(String searchValue, int pageNo, int pageSize) {
        Long facilityId = currentUserOrganizationServiceImpl.getCurrentUserOrganization();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        if(!String.valueOf(searchValue).equals("null") && !searchValue.equals("*")){
            searchValue = searchValue.replaceAll("\\s", "");
            String queryParam = "%"+searchValue+"%";
            return mhpssScreeningRepository
                    .findAllPersonPrepAndStatusBySearchParam(UN_ARCHIVED, facilityId,  queryParam, pageable);
        }
        return mhpssScreeningRepository
                .findAllPersonPrepAndStatus(UN_ARCHIVED, currentUserOrganizationServiceImpl.getCurrentUserOrganization(),pageable);
    }

    @Override
    public List<PatientActivity> getMhpssPatientActivitiesById(String id) {
        return patientActivityServiceImpl.getActivities(id);
    }

    @Override
    public MhpssScreening getMhpss(String id) {
        return mhpssScreeningRepository.findById(id).orElseThrow(()->new EntityNotFoundException(MhpssScreening.class, "id", id));
    }


}
