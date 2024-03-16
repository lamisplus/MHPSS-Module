package org.lamisplus.modules.mhpss.service.activity;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.lamisplus.modules.mhpss.repository.MhpssScreeningRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.mhpss.domain.dto.PatientActivity;
import org.lamisplus.modules.mhpss.service.PatientActivityProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MhpssScreeningActivityProvider implements PatientActivityProvider {
	
	private final MhpssScreeningRepository mhpssScreeningRepository;
	
	
	@Override
	public List<PatientActivity> getActivitiesFor(Person person) {
		return mhpssScreeningRepository.findAllByPerson(person)
				.stream().map(this::buildPatientActivity).collect(Collectors.toList());
	}
	
	@NotNull
	private PatientActivity buildPatientActivity(MhpssScreening mhpssScreening) {
		String name = "MHPSS Screening";
		assert mhpssScreening.getId() != null;

		return new PatientActivity(mhpssScreening.getId(), name, mhpssScreening.getEncounterDate(), "", "mhpss-screening");
	}
}
