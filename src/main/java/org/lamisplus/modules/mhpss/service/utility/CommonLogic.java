package org.lamisplus.modules.mhpss.service.utility;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.mhpss.domain.dto.ScreeningRequestDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.service.VisitService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommonLogic {
    private final VisitService visitService;

    @SuppressWarnings("OptionalUsedAsFieldOrParameterType")
    public Visit getVisit(Optional<Visit> existingVisit, Person person, LocalDate encounterDate){
        if(existingVisit.isPresent()){
            return existingVisit.get();
        }
        Visit newVisit = new Visit();
        newVisit.setPerson(person);
        newVisit.setVisitStartDate(encounterDate.atTime(LocalTime.MIDNIGHT));
        newVisit.setFacilityId(person.getFacilityId());
        return visitService.saveVisit(newVisit);
    }
}
