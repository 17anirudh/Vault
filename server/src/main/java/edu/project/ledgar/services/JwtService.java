package edu.project.ledgar.services;

import org.springframework.stereotype.Service;

import edu.project.ledgar.config.JwtConfiguration;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import javax.crypto.SecretKey;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final JwtConfiguration jwtConfiguration;

    public String generateAccessToken(String username, String email) {
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(username)
                .claims(Map.of("email", email, "username", username))
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(jwtConfiguration.getAccessExpiration())))
                .signWith(jwtConfiguration.getAccessKey())
                .compact();
    }

    public String generateRefreshToken(String username, String email) {
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(username)
                .claims(Map.of("email", email, "username", username))
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(jwtConfiguration.getRefreshExpiration())))
                .signWith(jwtConfiguration.getRefreshKey())
                .compact();
    }

    public String getAccessTokenFromUserName(String username) {
        return Jwts.parser()
                .verifyWith((SecretKey) jwtConfiguration.getAccessKey())
                .build()
                .parseSignedClaims(username)
                .getPayload()
                .get("username", String.class);
    } 
    public String getRefreshTokenFromUserName(String username) {
        return Jwts.parser()
                .verifyWith((SecretKey) jwtConfiguration.getRefreshKey())
                .build()
                .parseSignedClaims(username)
                .getPayload()
                .get("username", String.class);
    } 
    public String getRefreshTokenFromEmail(String email) {
        return Jwts.parser()
                .verifyWith((SecretKey) jwtConfiguration.getRefreshKey())
                .build()
                .parseSignedClaims(email)
                .getPayload()
                .get("email", String.class);
    } 
    public String getAccessTokenFromEmail(String email) {
        return Jwts.parser()
                .verifyWith((SecretKey) jwtConfiguration.getAccessKey())
                .build()
                .parseSignedClaims(email)
                .getPayload()
                .get("email", String.class);
    }   
}
