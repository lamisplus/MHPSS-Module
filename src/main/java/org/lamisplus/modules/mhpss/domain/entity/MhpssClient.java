package org.lamisplus.modules.mhpss.domain.entity;

import java.time.LocalDate;

public interface MhpssClient {
    String getPersonUuid();
    String getHospitalNumber();
    String getGender();
    Integer getAge();
    String getFirstName();
    String getSurname();
    String getOtherName();
    LocalDate getDateOfBirth();
    String getAddress();
    String getPhone();

}
