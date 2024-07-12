package org.lamisplus.modules.mhpss.domain.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@RequiredArgsConstructor
public class ConfirmationRequestDto {

    private String id;
    private String personUuid;
    private String screeningId;
    private List<String> interventionsRendered;
    private List<String> risksConfirmed;

    private String sessionModality;
    private String currentLevelOfInsight;
    private String confirmationOutcome;
    private String confirmedBy;
    private String gad7;
    private String auditC;
    private String pcl5;
    private String phq9;
    private String dast10;
    private String diagnosis;
    private String diagnosedBy;
    private String clinicianName;
    private String comment;
    private LocalDate encounterDate;
    private String patientVisit;
}
