package com.example.boutique.config;

import jakarta.servlet.http.HttpServletRequest;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import java.lang.reflect.RecordComponent;
import java.time.temporal.Temporal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;
import org.springframework.core.NestedExceptionUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> invalid(
            MethodArgumentNotValidException exception) {
        Map<String, String> errors = new LinkedHashMap<>();
        for (String field : fieldsOf(exception.getTarget())) {
            FieldError error = exception.getFieldError(field);
            if (error != null) {
                errors.put(field, reasonOf(error));
            }
        }
        for (FieldError error : exception.getFieldErrors()) {
            errors.putIfAbsent(error.getField(), reasonOf(error));
        }
        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> unreadable(
            HttpMessageNotReadableException exception) {
        if (exception.getCause() instanceof MismatchedInputException input
                && !input.getPath().isEmpty()) {
            String field = input.getPath()
                .get(input.getPath().size() - 1).getFieldName();
            return ResponseEntity.badRequest().body(Map.of("errors",
                Map.of(field, kindOf(input.getTargetType()))));
        }
        return ResponseEntity.badRequest()
            .body(Map.of("error", messageOf(exception)));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> refused(
            DataIntegrityViolationException exception,
            HttpServletRequest request) {
        Map<String, Object> body = "DELETE".equals(request.getMethod())
            ? Map.of("errors", Map.of("id", "referenced"))
            : Map.of("error", messageOf(exception));
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    private static List<String> fieldsOf(Object payload) {
        if (payload == null || !payload.getClass().isRecord()) {
            return List.of();
        }
        return Stream.of(payload.getClass().getRecordComponents())
            .map(RecordComponent::getName)
            .toList();
    }

    private static String reasonOf(FieldError error) {
        String code = error.getCode();
        return "NotNull".equals(code) || "NotEmpty".equals(code)
            ? "required"
            : String.valueOf(code);
    }

    private static String kindOf(Class<?> type) {
        if (type == null) {
            return "type";
        }
        if (Temporal.class.isAssignableFrom(type)) {
            return "date";
        }
        if (Number.class.isAssignableFrom(type)) {
            return "Number";
        }
        return type.getSimpleName();
    }

    private static String messageOf(Exception exception) {
        Throwable cause = NestedExceptionUtils.getMostSpecificCause(exception);
        return String.valueOf(cause.getMessage());
    }
}
