package org.lamisplus.modules.mhpss.domain.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class ScreeningRequestDto {
    private String id;
    private String personUuid;
    private String recentActivityChallenge;
    private String recentCalmness;
    private String sleepIssues;
    private String substanceAbuse;
    private String suicidalThoughts;
    private LocalDate encounterDate;
    private String patientVisit;
    private String screenedBy;
}
