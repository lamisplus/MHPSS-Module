package org.lamisplus.modules.mhpss.domain.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class ScreeningResponseDto {
    private String id;
    private String personUuid;
    private String sleepIssues;
    private String recentCalmness;
    private String suicidalThoughts;
    private String recentActivityChallenge;
    private String substanceAbuse;
    private boolean referred;
    private LocalDate encounterDate;
    private String patientVisit;
    private String screenedBy;
    private Long facilityId;
}
