package org.lamisplus.modules.mhpss.service;

import org.lamisplus.modules.mhpss.domain.dto.ConfirmationRequestDto;
import org.lamisplus.modules.mhpss.domain.dto.ConfirmationResponseDto;
import org.lamisplus.modules.mhpss.domain.entity.MhpssConfirmation;

import java.util.List;

public interface MhpssConfirmationService {
    List<MhpssConfirmation> getConfirmationsByScreening(String mhpssScreeningId);

    ConfirmationResponseDto create(ConfirmationRequestDto confirmationRequestDto);

    ConfirmationResponseDto getConfirmationById(String id);

    void deleteConfirmations(List<MhpssConfirmation> confirmations);

    ConfirmationResponseDto update(ConfirmationRequestDto confirmationRequestDto);

    void delete(String id);
}
