package com.example.crawfish.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.server.ResponseStatusException;
import com.fasterxml.jackson.databind.ObjectMapper;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

  private final ObjectMapper objectMapper;

    public RestResponseEntityExceptionHandler(ObjectMapper objectMapper) {
      this.objectMapper = objectMapper;
    }

    @ExceptionHandler(value = { IllegalArgumentException.class, IllegalStateException.class })
    protected ResponseEntity<Object> handleConflict(
      RuntimeException ex, WebRequest request) {
      String bodyOfResponse = "This should be application specific";
      return handleExceptionInternal(ex, bodyOfResponse, 
        new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(value = { ResponseStatusException.class })
    protected ResponseEntity<Object> handleResponseStatusException(
      ResponseStatusException ex, WebRequest request) {
      ErrorResponse errorResponse = new ErrorResponse(HttpStatus.OK, ex.getReason());
      HttpHeaders headers = new HttpHeaders();
      headers.add(HttpHeaders.CONTENT_TYPE, "application/json");
      String jsonBody;
      try {
        jsonBody = objectMapper.writeValueAsString(errorResponse);
      } catch (Exception e) {
        jsonBody = "{ \"status\": \"" + 500 + "\", \"error\": \"" + ex.getReason() + "\" }";
      }
      return new ResponseEntity<>(jsonBody, headers, 500);
    }

    public static class ErrorResponse {
      private int status;
      private String error;

      public ErrorResponse(HttpStatus status, String error) {
          this.status = status.value();
          this.error = error;
      }
    }
}

