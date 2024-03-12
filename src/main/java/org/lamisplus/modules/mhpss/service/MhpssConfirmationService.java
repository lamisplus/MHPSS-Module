package org.lamisplus.modules.mhpss.service;

import org.lamisplus.modules.mhpss.domain.dto.ConfirmationRequestDto;
import org.lamisplus.modules.mhpss.domain.dto.ConfirmationResponseDto;
import org.lamisplus.modules.mhpss.domain.entity.MhpssConfirmation;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.List;

public interface MhpssConfirmationService {
    List<MhpssConfirmation> getConfirmationsByScreening(String mhpssScreeningId);

    ConfirmationResponseDto create(ConfirmationRequestDto confirmationRequestDto);

    ConfirmationResponseDto getConfirmationById(String id);

    void deleteConfirmations(List<MhpssConfirmation> confirmations);

    ConfirmationResponseDto update(ConfirmationRequestDto confirmationRequestDto);

    void delete(String id);

    boolean encounterDateExists(String mhpss_screening_id, LocalDate encounterDate);

    boolean encounterDateExistsForUpdate(String mhpss_screening_id, LocalDate encounterDate, String confirmation_id);
}
