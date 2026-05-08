
package edu.project.ledgar.services;

import java.time.Duration;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.project.ledgar.dto.RegisterRequest;
import edu.project.ledgar.models.AuthModel;
import edu.project.ledgar.models.ProfileModel;
import edu.project.ledgar.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegisterService {
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public ResponseEntity<?> register(RegisterRequest request) {
        try {
            profileRepository.findByEmail(request.email()).ifPresent(auth -> {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, 
                    "Email already exists"
                );
            });

            ProfileModel profile = new ProfileModel();
            AuthModel auth = new AuthModel();

            profile.setEmail(request.email());
            profile.setUsername(request.username());
            auth.setProfile(profile);
            auth.setEmail(request.email());
            auth.setPassword(passwordEncoder.encode(request.password()));

            // JWT production
            String accessToken = jwtService
                                    .generateAccessToken(request.username(), request.email());
            String refreshToken = jwtService
                                    .generateRefreshToken(request.username(), request.email());
            
            auth.setRefreshToken(passwordEncoder.encode(refreshToken));
            profileRepository.save(profile);

            // Creating cookies
            ResponseCookie accessCookie = ResponseCookie
                                        .from("access_token", accessToken)
                                        .httpOnly(true)
                                        .secure(true)
                                        .path("/")
                                        .maxAge(Duration.ofMinutes(18))
                                        .sameSite("Strict")
                                        .build();

            ResponseCookie refreshCookie = ResponseCookie
                                        .from("refresh_token", refreshToken)
                                        .httpOnly(true)
                                        .secure(true)
                                        .path("/")
                                        .maxAge(Duration.ofDays(27))
                                        .sameSite("Strict")
                                        .build();

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .header("Set-Cookie", accessCookie.toString())
                    .header("Set-Cookie", refreshCookie.toString())
                    .body("User Registered Successfully");            
        }
        catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Registration failed"
            );
        }
    }
}
