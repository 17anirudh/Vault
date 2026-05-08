package edu.project.ledgar.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

import lombok.Data;

@ConfigurationProperties(prefix = "jwt")
@Component
@Data

public class JwtConfiguration {
    @Value("${jwt.access-secret}")
    private String accessSecret;
    @Value("${jwt.refresh-secret}")
    private String refreshSecret;
    
    private long accessExpiration = 1000L * 60 * 18;
    private long refreshExpiration = 1000L * 60 * 60 * 24 * 27;
    private Key accessKey = Keys.hmacShaKeyFor(accessSecret.getBytes());
    private Key refreshKey = Keys.hmacShaKeyFor(refreshSecret.getBytes());
}
