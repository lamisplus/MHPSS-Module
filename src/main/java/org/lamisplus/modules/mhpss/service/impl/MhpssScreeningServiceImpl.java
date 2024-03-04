package org.lamisplus.modules.mhpss.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.mhpss.service.MhpssConfirmationService;
import org.lamisplus.modules.mhpss.service.MhpssScreeningService;
import org.lamisplus.modules.mhpss.service.utility.CommonLogic;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.mhpss.domain.dto.*;
import org.lamisplus.modules.mhpss.domain.entity.*;
import org.lamisplus.modules.mhpss.repository.MhpssScreeningRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.lamisplus.modules.patient.service.VisitService;
import org.lamisplus.modules.patient.utility.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    private final PersonService personService;
    private final VisitService visitService;
    private final CommonLogic commonLogic;
    private MhpssConfirmationService confirmationService;

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
    public Page<MhpssClient> findAllPersonPage(String searchValue, int pageNo, int pageSize) {
        Long facilityId = currentUserOrganizationServiceImpl.getCurrentUserOrganization();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        if(!String.valueOf(searchValue).equals("null") && !searchValue.equals("*")){
            searchValue = searchValue.replaceAll("\\s", "");
            String queryParam = "%"+searchValue+"%";
            return mhpssScreeningRepository
                    .findAllPersonBySearchParam(UN_ARCHIVED, facilityId,  queryParam, pageable);
        }
        return mhpssScreeningRepository
                .findAllPerson(UN_ARCHIVED, currentUserOrganizationServiceImpl.getCurrentUserOrganization(),pageable);
    }

    @Override
    public List<PatientActivity> getMhpssPatientActivitiesById(String id) {
        return patientActivityServiceImpl.getActivities(id);
    }

    @Override
    public ScreeningResponseDto getMhpss(String id) {
        MhpssScreening mhpssScreening =  mhpssScreeningRepository.findById(id).orElseThrow(()->new EntityNotFoundException(MhpssScreening.class, "id", id));
        return convertEntityToResponseDto(mhpssScreening);

    }

    @Override
    public ScreeningResponseDto create(ScreeningRequestDto requestDto){
        log.info("Creating MHPSS Screening");
        Person person = personService.findPersonByUuid(requestDto.getPersonUuid()).
                orElseThrow(()->new EntityNotFoundException(Person.class, "id", requestDto.getPersonUuid()));

        Optional<Visit> existingVisit = visitService.findByVisitStartDateAndPerson(requestDto.getEncounterDate().atTime(LocalTime.MIDNIGHT), person);

        Visit visitToSave = commonLogic.getVisit(existingVisit, person, requestDto.getEncounterDate());

        MhpssScreening mhpssScreening = convertDtoToEntity(requestDto);
        mhpssScreening.setPerson(person);
        mhpssScreening.setPatientVisit(visitToSave);
        mhpssScreening.setCreatedBy(SecurityUtils.getCurrentUserLogin ().orElse (""));
        mhpssScreening.setUpdatedBy(SecurityUtils.getCurrentUserLogin ().orElse (""));
        mhpssScreening.setReferred(shouldRefer(requestDto));
        mhpssScreening.setEncounterDate(requestDto.getEncounterDate());

        return convertEntityToResponseDto(mhpssScreeningRepository.save(mhpssScreening));

    }

    public MhpssScreening convertDtoToEntity(ScreeningRequestDto screeningDto){
        MhpssScreening mhpssScreening = new MhpssScreening();
        mhpssScreening.setId(screeningDto.getId());
        mhpssScreening.setRecentActivityChallenge(screeningDto.getRecentActivityChallenge());
        mhpssScreening.setRecentCalmness(screeningDto.getRecentCalmness());
        mhpssScreening.setSleepIssues(screeningDto.getSleepIssues());
        mhpssScreening.setSubstanceAbuse(screeningDto.getSubstanceAbuse());
        mhpssScreening.setSuicidalThoughts(screeningDto.getSuicidalThoughts());
        mhpssScreening.setEncounterDate(screeningDto.getEncounterDate());
        mhpssScreening.setScreenedBy(screeningDto.getScreenedBy());

        return  mhpssScreening;
    }

    public ScreeningResponseDto convertEntityToResponseDto(MhpssScreening mhpssScreening){
        ScreeningResponseDto responseDto = new ScreeningResponseDto();
        responseDto.setId(mhpssScreening.getId());
        responseDto.setEncounterDate(mhpssScreening.getEncounterDate());
        responseDto.setPersonUuid(mhpssScreening.getPerson().getUuid());
        responseDto.setRecentActivityChallenge(mhpssScreening.getRecentActivityChallenge());
        responseDto.setRecentCalmness(mhpssScreening.getRecentCalmness());
        responseDto.setSleepIssues(mhpssScreening.getSleepIssues());
        responseDto.setSubstanceAbuse(mhpssScreening.getSubstanceAbuse());
        responseDto.setSuicidalThoughts(mhpssScreening.getSuicidalThoughts());
        responseDto.setReferred(mhpssScreening.isReferred());
        responseDto.setScreenedBy(mhpssScreening.getScreenedBy());

        return responseDto;
    }

    @Override
    public boolean shouldRefer(ScreeningRequestDto screeningDto){
        if(screeningDto.getSuicidalThoughts().equalsIgnoreCase("yes")){
            return true;
        }

        String[] fieldsToCheck = {
                screeningDto.getSubstanceAbuse(),
                screeningDto.getRecentCalmness(),
                screeningDto.getSleepIssues(),
                screeningDto.getRecentActivityChallenge()
        };

        return  (int) Arrays.stream(fieldsToCheck)
                .filter("yes"::equalsIgnoreCase)
                .count() >= 2;
    }

    @Override
    public ScreeningResponseDto update(ScreeningRequestDto requestDto) {
        personService.findPersonByUuid(requestDto.getPersonUuid()).
                orElseThrow(()->new EntityNotFoundException(Person.class, "id", requestDto.getPersonUuid()));

        MhpssScreening existingMhpssScreening = mhpssScreeningRepository.findById(requestDto.getId())
                .orElseThrow(() -> new EntityNotFoundException(MhpssScreening.class, "id", requestDto.getId()));

        //TODO: Use Model mapper for this
        existingMhpssScreening.setRecentActivityChallenge(requestDto.getRecentActivityChallenge());
        existingMhpssScreening.setRecentCalmness(requestDto.getRecentCalmness());
        existingMhpssScreening.setSleepIssues(requestDto.getSleepIssues());
        existingMhpssScreening.setSubstanceAbuse(requestDto.getSubstanceAbuse());
        existingMhpssScreening.setSuicidalThoughts(requestDto.getSuicidalThoughts());
        existingMhpssScreening.setEncounterDate(requestDto.getEncounterDate());
        existingMhpssScreening.setUpdatedBy(SecurityUtils.getCurrentUserLogin ().orElse (""));
        existingMhpssScreening.setScreenedBy(requestDto.getScreenedBy());
        //if it was previously referred and now not with the update, the confirmation will be deleted
        boolean shouldRefer = shouldRefer(requestDto);
        if(existingMhpssScreening.isReferred() && !shouldRefer){
            List<MhpssConfirmation> confirmations = confirmationService.getConfirmationsByScreening(existingMhpssScreening.getId());
            confirmationService.deleteConfirmations(confirmations);
        }
        existingMhpssScreening.setReferred(shouldRefer);

        return convertEntityToResponseDto(mhpssScreeningRepository.save(existingMhpssScreening));
    }

    @Override
    public void delete(String id) {
        log.info("Deleting MHPSS {}", id);
        mhpssScreeningRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException(MhpssScreening.class, "id", id));

        mhpssScreeningRepository.deleteById(id);

        log.info("MHPSS Screening successfully deleted {}", id);

    }

    @Override
    public Optional<MhpssScreening> findById(String id) {
        return mhpssScreeningRepository.findById(id);
    }


}
