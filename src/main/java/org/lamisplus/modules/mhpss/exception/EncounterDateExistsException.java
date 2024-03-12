package org.lamisplus.modules.mhpss.exception;

public class EncounterDateExistsException extends RuntimeException{
    public static final long serialVersionUID = 1L;
    public EncounterDateExistsException(String message){
        super(message);
    }
}
