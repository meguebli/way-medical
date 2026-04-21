package fr.wayup.medical.api.common.exception;

import fr.wayup.medical.api.common.api.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(BusinessException.class)
  public ResponseEntity<ApiErrorResponse> handleBusinessException(
      BusinessException exception,
      HttpServletRequest request
  ) {
    return buildResponse(exception.getStatus(), exception.getMessage(), request.getRequestURI(), List.of());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorResponse> handleValidationException(
      MethodArgumentNotValidException exception,
      HttpServletRequest request
  ) {
    List<String> details = exception.getBindingResult()
        .getFieldErrors()
        .stream()
        .map(this::toDetail)
        .toList();

    return buildResponse(HttpStatus.BAD_REQUEST, "Validation failed", request.getRequestURI(), details);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiErrorResponse> handleConstraintViolation(
      ConstraintViolationException exception,
      HttpServletRequest request
  ) {
    List<String> details = exception.getConstraintViolations()
        .stream()
        .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
        .toList();

    return buildResponse(HttpStatus.BAD_REQUEST, "Validation failed", request.getRequestURI(), details);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ApiErrorResponse> handleAccessDenied(
      AccessDeniedException exception,
      HttpServletRequest request
  ) {
    return buildResponse(HttpStatus.FORBIDDEN, "Access denied", request.getRequestURI(), List.of());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleUnexpectedException(
      Exception exception,
      HttpServletRequest request
  ) {
    return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected internal error", request.getRequestURI(), List.of());
  }

  private String toDetail(FieldError fieldError) {
    return fieldError.getField() + ": " + fieldError.getDefaultMessage();
  }

  private ResponseEntity<ApiErrorResponse> buildResponse(
      HttpStatus status,
      String message,
      String path,
      List<String> details
  ) {
    return ResponseEntity.status(status).body(new ApiErrorResponse(
        OffsetDateTime.now(),
        status.value(),
        status.getReasonPhrase(),
        message,
        path,
        details
    ));
  }
}

