package org.lamisplus.modules.mhpss.repository;

import org.lamisplus.modules.mhpss.domain.entity.MhpssConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MhpssConfirmationRepository extends JpaRepository<MhpssConfirmation, String>, JpaSpecificationExecutor<MhpssConfirmation> {

}
