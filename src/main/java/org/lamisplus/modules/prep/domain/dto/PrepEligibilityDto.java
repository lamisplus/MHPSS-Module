package org.lamisplus.modules.prep.domain.dto;

import lombok.*;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;

import java.io.Serializable;
import java.time.LocalDate;

@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PrepEligibilityDto implements Serializable {
    private Long id;
    private String uuid;
    private Object hivRisk;
    private Object stiScreening;
    private Object drugUseHistory;
    private Object personalHivRiskAssessment;
    private Object sexPartnerRisk;
    private String personUuid;
    private String sexPartner;
    private String counselingType;
    private Boolean firstTimeVisit;
    private Integer numChildrenLessThanFive;
    private Integer numWives;
    private String targetGroup;
    private String uniqueId;
    private Integer score;

    private Object extra;
    private String prepStatus;
    private Integer prepEligibilityCount;

    //private PersonResponseDto personResponseDto;

    private LocalDate visitDate;
}