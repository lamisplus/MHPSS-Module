package org.lamisplus.modules.mhpss.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.mhpss.domain.dto.ConfirmationRequestDto;
import org.lamisplus.modules.mhpss.domain.dto.ConfirmationResponseDto;
import org.lamisplus.modules.mhpss.domain.entity.MhpssConfirmation;
import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.lamisplus.modules.mhpss.repository.MhpssConfirmationRepository;
import org.lamisplus.modules.mhpss.service.MhpssConfirmationService;
import org.lamisplus.modules.mhpss.service.MhpssScreeningService;
import org.lamisplus.modules.mhpss.service.utility.CommonLogic;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.service.VisitService;
import org.lamisplus.modules.patient.utility.SecurityUtils;
import org.postgresql.shaded.com.ongres.scram.common.ScramAttributes;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MhpssConfirmationServiceImpl implements MhpssConfirmationService {

    private final MhpssConfirmationRepository mhpssConfirmationRepository;
    private final MhpssScreeningService mhpssScreeningService;
    private final VisitService visitService;
    private final CommonLogic commonLogic;

    @Override
    public List<MhpssConfirmation> getConfirmationsByScreening(String mhpssScreeningId) {
        MhpssScreening mhpssScreening = mhpssScreeningService.findById(mhpssScreeningId)
                .orElseThrow(() -> new EntityNotFoundException(MhpssScreening.class, "id", mhpssScreeningId));

        return mhpssConfirmationRepository.findByMhpssScreeningOrderByEncounterDateDesc(mhpssScreening);
    }

    @Override
    public ConfirmationResponseDto create(ConfirmationRequestDto confirmationRequestDto) {
        log.info("Creating MHPSS Confirmation");

        MhpssScreening mhpssScreening = mhpssScreeningService.findById(confirmationRequestDto.getScreeningId()).
                orElseThrow(()->new EntityNotFoundException(Person.class, "id", confirmationRequestDto
                        .getScreeningId()));

        Optional<Visit> existingVisit = visitService.findByVisitStartDateAndPerson(confirmationRequestDto.getEncounterDate().atTime(LocalTime.MIDNIGHT), mhpssScreening.getPerson());

        Visit visitToSave = commonLogic.getVisit(existingVisit, mhpssScreening.getPerson(), confirmationRequestDto.getEncounterDate());

        MhpssConfirmation mhpssConfirmation = convertConfirmationDtoToEntity(confirmationRequestDto);
        mhpssConfirmation.setPatientVisit(visitToSave);
        mhpssConfirmation.setMhpssScreening(mhpssScreening);
        mhpssConfirmation.setCreatedBy(SecurityUtils.getCurrentUserLogin ().orElse (""));
        mhpssConfirmation.setUpdatedBy(SecurityUtils.getCurrentUserLogin ().orElse (""));
        mhpssConfirmation.setEncounterDate(confirmationRequestDto.getEncounterDate());

        return convertEntityToResponseDto(mhpssConfirmationRepository.save(mhpssConfirmation));
    }

    @Override
    public ConfirmationResponseDto getConfirmationById(String id) {
        MhpssConfirmation mhpssConfirmation =  mhpssConfirmationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(MhpssConfirmation.class, "id", id));
        return convertEntityToResponseDto(mhpssConfirmation);
    }

    @Override
    public void deleteConfirmations(List<MhpssConfirmation> confirmations) {
        mhpssConfirmationRepository.deleteAll(confirmations);
    }

    @Override
    public ConfirmationResponseDto update(ConfirmationRequestDto confirmationRequestDto) {

        MhpssConfirmation existingConfirmation = mhpssConfirmationRepository.findById(confirmationRequestDto.getId())
                .orElseThrow(() -> new EntityNotFoundException(MhpssConfirmation.class, "id", confirmationRequestDto.getId()));

        MhpssScreening mhpssScreening = mhpssScreeningService.findById(confirmationRequestDto.getScreeningId())
                .orElseThrow(() -> new EntityNotFoundException(ScramAttributes.class, "id", confirmationRequestDto.getScreeningId()));

        //TODO: Use Model mapper for this
        existingConfirmation.setEncounterDate(confirmationRequestDto.getEncounterDate());
        existingConfirmation.setInterventionsRendered(confirmationRequestDto.getInterventionsRendered());
        existingConfirmation.setSessionModality(confirmationRequestDto.getSessionModality());
        existingConfirmation.setRisksConfirmed(confirmationRequestDto.getRisksConfirmed());
        existingConfirmation.setCurrentLevelOfInsight(confirmationRequestDto.getCurrentLevelOfInsight());
        existingConfirmation.setConfirmationOutcome(confirmationRequestDto.getConfirmationOutcome());
        existingConfirmation.setConfirmedBy(confirmationRequestDto.getConfirmedBy());
        existingConfirmation.setDiagnosedBy(confirmationRequestDto.getDiagnosedBy());
        existingConfirmation.setClinicianName(confirmationRequestDto.getClinicianName());
        existingConfirmation.setDiagnosis(confirmationRequestDto.getDiagnosis());
        existingConfirmation.setGad7(confirmationRequestDto.getGad7());
        existingConfirmation.setAuditC(confirmationRequestDto.getAuditC());
        existingConfirmation.setPhq9(confirmationRequestDto.getPhq9());
        existingConfirmation.setDast10(confirmationRequestDto.getDast10());
        existingConfirmation.setPcl5(confirmationRequestDto.getPcl5());
        existingConfirmation.setUpdatedBy(SecurityUtils.getCurrentUserLogin ().orElse (""));

        return convertEntityToResponseDto(mhpssConfirmationRepository.save(existingConfirmation));
    }


    public MhpssConfirmation convertConfirmationDtoToEntity(ConfirmationRequestDto confirmationRequestDto){
        MhpssConfirmation mhpssConfirmation = new MhpssConfirmation();

        mhpssConfirmation.setId(confirmationRequestDto.getId());
        mhpssConfirmation.setInterventionsRendered((confirmationRequestDto.getInterventionsRendered()));
        mhpssConfirmation.setRisksConfirmed((confirmationRequestDto.getRisksConfirmed()));
        mhpssConfirmation.setSessionModality((confirmationRequestDto.getSessionModality()));
        mhpssConfirmation.setCurrentLevelOfInsight((confirmationRequestDto.getCurrentLevelOfInsight()));
        mhpssConfirmation.setConfirmationOutcome((confirmationRequestDto.getConfirmationOutcome()));
        mhpssConfirmation.setConfirmedBy((confirmationRequestDto.getConfirmedBy()));
        mhpssConfirmation.setGad7((confirmationRequestDto.getGad7()));
        mhpssConfirmation.setAuditC((confirmationRequestDto.getAuditC()));
        mhpssConfirmation.setPcl5((confirmationRequestDto.getPcl5()));
        mhpssConfirmation.setPhq9((confirmationRequestDto.getPhq9()));
        mhpssConfirmation.setDast10((confirmationRequestDto.getDast10()));
        mhpssConfirmation.setDiagnosis((confirmationRequestDto.getDiagnosis()));
        mhpssConfirmation.setDiagnosedBy((confirmationRequestDto.getDiagnosedBy()));
        mhpssConfirmation.setClinicianName((confirmationRequestDto.getClinicianName()));
        mhpssConfirmation.setEncounterDate((confirmationRequestDto.getEncounterDate()));

        return  mhpssConfirmation;
    }

    public ConfirmationResponseDto convertEntityToResponseDto(MhpssConfirmation mhpssConfirmation){
        ConfirmationResponseDto responseDto = new ConfirmationResponseDto();
        responseDto.setId(mhpssConfirmation.getId());
        responseDto.setInterventionsRendered((mhpssConfirmation.getInterventionsRendered()));
        responseDto.setRisksConfirmed((mhpssConfirmation.getRisksConfirmed()));
        responseDto.setSessionModality((mhpssConfirmation.getSessionModality()));
        responseDto.setCurrentLevelOfInsight((mhpssConfirmation.getCurrentLevelOfInsight()));
        responseDto.setConfirmationOutcome((mhpssConfirmation.getConfirmationOutcome()));
        responseDto.setConfirmedBy((mhpssConfirmation.getConfirmedBy()));
        responseDto.setGad7((mhpssConfirmation.getGad7()));
        responseDto.setAuditC((mhpssConfirmation.getAuditC()));
        responseDto.setPcl5((mhpssConfirmation.getPcl5()));
        responseDto.setPhq9((mhpssConfirmation.getPhq9()));
        responseDto.setDast10((mhpssConfirmation.getDast10()));
        responseDto.setDiagnosis((mhpssConfirmation.getDiagnosis()));
        responseDto.setDiagnosedBy((mhpssConfirmation.getDiagnosedBy()));
        responseDto.setClinicianName((mhpssConfirmation.getClinicianName()));
        responseDto.setEncounterDate((mhpssConfirmation.getEncounterDate()));
        responseDto.setPatientVisit(mhpssConfirmation.getPatientVisit().getUuid());
        responseDto.setScreeningId(mhpssConfirmation.getMhpssScreening().getId());

        return responseDto;
    }

    @Override
    public void delete(String id) {
        log.info("Deleting MHPSS Confirmation {}", id);
        mhpssConfirmationRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException(MhpssConfirmation.class, "id", id));

        mhpssConfirmationRepository.deleteById(id);

        log.info("MHPSS Confirmation successfully deleted {}", id);

    }
}
