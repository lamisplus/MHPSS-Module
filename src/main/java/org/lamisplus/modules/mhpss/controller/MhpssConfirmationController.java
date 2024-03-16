package org.lamisplus.modules.mhpss.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.mhpss.domain.dto.*;
import org.lamisplus.modules.mhpss.domain.entity.MhpssConfirmation;
import org.lamisplus.modules.mhpss.exception.EncounterDateExistsException;
import org.lamisplus.modules.mhpss.service.MhpssConfirmationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MhpssConfirmationController {
    private final String MHPSS_CONFIRMATION_URL_VERSION_ONE = "/api/v1/mhpss-confirmation";
    private final MhpssConfirmationService mhpssConfirmationService;

    @GetMapping(MHPSS_CONFIRMATION_URL_VERSION_ONE + "/screening/{mhpssScreeningId}")
    @ApiOperation("Get All Confirmations By Screening")
    public List<MhpssConfirmation> getScreeningConfirmations(@PathVariable String mhpssScreeningId) {
        return mhpssConfirmationService.getConfirmationsByScreening(mhpssScreeningId);
    }

    @PostMapping(MHPSS_CONFIRMATION_URL_VERSION_ONE)
    @ApiOperation("Save MHPSS Confirmation")
    public ResponseEntity<?> create(@RequestBody ConfirmationRequestDto confirmationRequestDto){
        try {
            return new ResponseEntity<>(mhpssConfirmationService.create(confirmationRequestDto), HttpStatus.CREATED);
        }catch (EncounterDateExistsException encounterDateExistsException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(encounterDateExistsException.getMessage());
        }
    }

    @GetMapping(MHPSS_CONFIRMATION_URL_VERSION_ONE + "/{id}")
    @ApiOperation("Get Confirmation By ID")
    public ResponseEntity<ConfirmationResponseDto> getConfirmationById(@PathVariable String id){
        return new ResponseEntity<>(mhpssConfirmationService.getConfirmationById(id), HttpStatus.OK);
    }

    @PutMapping(MHPSS_CONFIRMATION_URL_VERSION_ONE)
    @ApiOperation("Update MHPSS Screening")
    public ResponseEntity<?> update(@RequestBody ConfirmationRequestDto mhpss){
        try {
            return new ResponseEntity<>(mhpssConfirmationService.update(mhpss), HttpStatus.OK);
        }catch (EncounterDateExistsException encounterDateExistsException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(encounterDateExistsException.getMessage());
        }
    }

    @DeleteMapping(MHPSS_CONFIRMATION_URL_VERSION_ONE + "/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id){
        mhpssConfirmationService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
