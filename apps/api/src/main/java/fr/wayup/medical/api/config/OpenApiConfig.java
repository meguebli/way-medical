package fr.wayup.medical.api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

  @Bean
  public OpenAPI openAPI() {
    final String securitySchemeName = "basicAuth";

    return new OpenAPI()
        .info(new Info()
            .title("WAY-MEDICAL API")
            .description("Backend API for the WAY-MEDICAL platform")
            .version("v1")
            .contact(new Contact().name("WAY-MEDICAL Team").email("contact@wayupit.fr")))
        .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
        .components(new Components()
            .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("basic")));
  }
}

