package org.lamisplus.modules.mhpss.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.domain.dto.PageDTO;
import org.lamisplus.modules.base.util.PaginationUtil;
import org.lamisplus.modules.mhpss.domain.dto.*;
import org.lamisplus.modules.mhpss.domain.entity.MhpssClient;
import org.lamisplus.modules.mhpss.domain.entity.MhpssScreening;
import org.lamisplus.modules.mhpss.exception.EncounterDateExistsException;
import org.lamisplus.modules.mhpss.service.MhpssScreeningService;
import org.lamisplus.modules.mhpss.service.impl.PatientActivityServiceImpl;
import org.lamisplus.modules.patient.domain.entity.Encounter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.audit4j.core.util.Log;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MhpssScreeningController {
    private final MhpssScreeningService mhpssScreeningService;
    private final PatientActivityServiceImpl patientActivityServiceImpl;
    private final String MHPSS_URL_VERSION_ONE = "/api/v1/mhpss-screening";


    @PostMapping(MHPSS_URL_VERSION_ONE)
    @ApiOperation("Save MHPSS Screening")
    public ResponseEntity<?> create(@RequestBody ScreeningRequestDto mhpss){
        try {
            return new ResponseEntity<>(mhpssScreeningService.create(mhpss), HttpStatus.CREATED);
        }catch (EncounterDateExistsException encounterDateExistsException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(encounterDateExistsException.getMessage());
        }

    }

    @PutMapping(MHPSS_URL_VERSION_ONE)
    @ApiOperation("Update MHPSS Screening")
    public ResponseEntity<?> update(@RequestBody ScreeningRequestDto mhpss){
        try {
            return new ResponseEntity<>(mhpssScreeningService.update(mhpss), HttpStatus.OK);
        }catch (EncounterDateExistsException encounterDateExistsException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(encounterDateExistsException.getMessage());
        }
    }

    @GetMapping(MHPSS_URL_VERSION_ONE + "/persons")
    @ApiOperation("Get Persons with optimized api")
    public ResponseEntity<PageDTO> getAllPersons(@RequestParam (required = false, defaultValue = "*")  String searchValue,
                                                @RequestParam (required = false, defaultValue = "20")int pageSize,
                                                @RequestParam (required = false, defaultValue = "0") int pageNo) {
        Page<MhpssClient> page = mhpssScreeningService.findAllPersonPage(searchValue, pageNo, pageSize);
        Log.info(page);
        return new ResponseEntity<>(PaginationUtil.generatePagination(page, page.getContent()), HttpStatus.OK);
    }

    @GetMapping(MHPSS_URL_VERSION_ONE + "/activities/patients/{patientId}")
    @ApiOperation("Get MHPSS Activities by patient Id")
    public List<TimelineVm> getActivities(@PathVariable String patientId, @RequestParam(required = false, defaultValue = "false") Boolean full) {
        return patientActivityServiceImpl.getTimelineVms (patientId, full);
    }

    @GetMapping(MHPSS_URL_VERSION_ONE + "/general-activities/patients/{patientId}")
    @ApiOperation("Get all MHPSS Activities by patient Id")
    public List<PatientActivity> getActivitiesFor(@PathVariable String patientId) {
        return patientActivityServiceImpl.getActivitiesFor (patientId);
    }

    @GetMapping(MHPSS_URL_VERSION_ONE + "/{id}")
    @ApiOperation("Get MHPSS by ID")
    public ResponseEntity<ScreeningResponseDto> getMhpss(@PathVariable String id){
        return new ResponseEntity<>(mhpssScreeningService.getMhpss(id), HttpStatus.OK);
    }

    @DeleteMapping(MHPSS_URL_VERSION_ONE + "/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id){
        mhpssScreeningService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
