
package edu.project.ledgar.services;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.project.ledgar.dto.RegisterRequest;
import edu.project.ledgar.models.AuthModel;
import edu.project.ledgar.models.ProfileModel;
import edu.project.ledgar.repository.AuthRepository;
import edu.project.ledgar.repository.RegisterRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegisterService {
    private final RegisterRepo registerRepo;
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<?> register(RegisterRequest request) {
        try {
            authRepository.findByEmail(request.getEmail()).ifPresent(auth -> {
                throw new RuntimeException("Email already exists");
            });
            
            // Creating objects
            ProfileModel profile = new ProfileModel();
            AuthModel auth = new AuthModel();
            JwtService jwtService = new JwtService();

            // Create profile
            profile.setEmail(request.getEmail());
            
            // Store sensitive info in auth table
            auth.setProfile_id(profile);
            auth.setEmail(request.getEmail());
            auth.setPassword(passwordEncoder.encode(request.getPassword()));

            // JWT production
            String token = jwtService.generateToken(request.getEmail());
            LocalDateTime expiresAt = LocalDateTime.now().plusDays(1);
            auth.setExpiresAt(expiresAt);
            
            // Persist data
            registerRepo.save(profile);
            authRepository.save(auth);

            // Creating cookie
            ResponseCookie cookie = ResponseCookie
                                        .from("auth_token", token)
                                        .httpOnly(true)
                                        .secure(true)
                                        .path("/")
                                        .maxAge(24 * 60 * 60)
                                        .sameSite("Lax")
                                        .build();

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .header("Set-Cookie", cookie.toString())
                    .body("User Registered Successfully");            
        }
        catch (Exception e) {
            throw new RuntimeException("Registration failed", e);
        }
    }
}
