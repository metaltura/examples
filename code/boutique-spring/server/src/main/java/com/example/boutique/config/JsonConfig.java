package com.example.boutique.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JsonConfig {

    private static final DateTimeFormatter ISO_MILLIS = DateTimeFormatter
        .ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        .withZone(ZoneOffset.UTC);

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer asTheNodeServer() {
        return builder -> builder
            .serializationInclusion(JsonInclude.Include.NON_NULL)
            .serializerByType(Instant.class, new InstantSerializer())
            .serializerByType(Double.class, new DoubleSerializer());
    }

    private static class InstantSerializer extends JsonSerializer<Instant> {
        @Override
        public void serialize(Instant value, JsonGenerator json,
                SerializerProvider provider) throws IOException {
            json.writeString(ISO_MILLIS.format(value));
        }
    }

    private static class DoubleSerializer extends JsonSerializer<Double> {
        @Override
        public void serialize(Double value, JsonGenerator json,
                SerializerProvider provider) throws IOException {
            boolean whole = value == Math.rint(value)
                && Math.abs(value) < 9007199254740992d;
            if (whole) {
                json.writeNumber(value.longValue());
            } else {
                json.writeNumber(value);
            }
        }
    }
}
