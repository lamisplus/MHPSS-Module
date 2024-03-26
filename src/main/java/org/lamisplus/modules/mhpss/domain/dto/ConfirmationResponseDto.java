package org.lamisplus.modules.mhpss.domain.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@RequiredArgsConstructor
public class ConfirmationResponseDto {

    private String id;
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
    private LocalDate encounterDate;
    private String patientVisit;
    private String screeningId;
    private Long facilityId;
}
