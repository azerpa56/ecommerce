package com.gorazer.ecommerceGorazer.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {

    @Value("${newsapi.key}")
    private String newsApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/tech")
    @Cacheable("techNews")
    public ResponseEntity<String> getTechNews() {
        try {
            // Intentar primero con noticias en español
            String urlEs = UriComponentsBuilder.fromHttpUrl("https://newsapi.org/v2/top-headlines")
                    .queryParam("category", "technology")
                    .queryParam("language", "es")
                    .queryParam("pageSize", 10)
                    .queryParam("apiKey", newsApiKey)
                    .toUriString();

            ResponseEntity<String> response = restTemplate.getForEntity(urlEs, String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            // Si no hay artículos en español, intentar con inglés
            if (jsonNode.get("totalResults").asInt() == 0) {
                String urlEn = UriComponentsBuilder.fromHttpUrl("https://newsapi.org/v2/top-headlines")
                        .queryParam("category", "technology")
                        .queryParam("language", "en")
                        .queryParam("pageSize", 10)
                        .queryParam("apiKey", newsApiKey)
                        .toUriString();

                response = restTemplate.getForEntity(urlEn, String.class);
                jsonNode = objectMapper.readTree(response.getBody());

                // Si aún no hay resultados, intentar búsqueda global de tech
                if (jsonNode.get("totalResults").asInt() == 0) {
                    String urlGlobal = UriComponentsBuilder.fromHttpUrl("https://newsapi.org/v2/everything")
                            .queryParam("q", "technology OR tech")
                            .queryParam("sortBy", "publishedAt")
                            .queryParam("pageSize", 10)
                            .queryParam("apiKey", newsApiKey)
                            .toUriString();

                    response = restTemplate.getForEntity(urlGlobal, String.class);
                }
            }

            return response;

        } catch (Exception e) {
            // Si algo falla, devolver error estructurado usando ObjectMapper para evitar errores de formato
            try {
                ObjectMapper mapper = new ObjectMapper();
                java.util.Map<String, Object> errorMap = new java.util.HashMap<>();
                errorMap.put("status", "error");
                errorMap.put("message", e.getMessage());
                errorMap.put("articles", new java.util.ArrayList<>());
                String errorJson = mapper.writeValueAsString(errorMap);
                return ResponseEntity.ok(errorJson);
            } catch (Exception ex) {
                // Fallback si falla la serialización
                return ResponseEntity.ok("{\"status\":\"error\",\"message\":\"Error inesperado\",\"articles\":[]}");
            }
        }
    }
}
