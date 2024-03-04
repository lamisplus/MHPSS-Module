package org.lamisplus.modules.mhpss.repository;

import org.lamisplus.modules.mhpss.domain.dto.ScreeningResponseDto;
import org.lamisplus.modules.mhpss.domain.entity.MhpssConfirmation;
import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MhpssConfirmationRepository extends JpaRepository<MhpssConfirmation, String>, JpaSpecificationExecutor<MhpssConfirmation> {

    List<MhpssConfirmation> findByMhpssScreeningOrderByEncounterDateDesc(MhpssScreening mhpssScreening);

}
