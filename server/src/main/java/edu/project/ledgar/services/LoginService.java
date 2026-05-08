
package edu.project.ledgar.services;

import java.time.Duration;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.project.ledgar.dto.LoginRequest;
import edu.project.ledgar.models.AuthModel;
import edu.project.ledgar.models.ProfileModel;
import edu.project.ledgar.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
    // NOTE: Verify the expiration of tokens
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public ResponseEntity<?> login(LoginRequest request) {
        try {
            boolean email = request.identity().contains("@");

            if (email) {
                Optional<ProfileModel> profile = profileRepository.findByEmail(request.identity());
                if (profile.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
                } 
                AuthModel auth = new AuthModel();
                auth.setProfile(profile.get());
                passwordMatcher(request.password(), auth.getPassword());
                String accessToken = jwtService.getAccessTokenFromEmail(request.identity());
                String refreshToken = jwtService.getRefreshTokenFromEmail(request.identity());
                return responseHelper(accessToken, refreshToken);
            }
            else {
                Optional<ProfileModel> profile = profileRepository.findByUsername(request.identity());
                if (profile.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
                } 
                AuthModel auth = new AuthModel();
                auth.setProfile(profile.get());
                passwordMatcher(request.password(), auth.getPassword());
                String accessToken = jwtService.getAccessTokenFromUserName(request.identity());
                String refreshToken = jwtService.getRefreshTokenFromUserName(request.identity());
                return responseHelper(accessToken, refreshToken);
            }          
        }
        catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Invalid credentials"
            );
        }
    }

    private ResponseEntity<?> responseHelper(String access, String refresh) {
        ResponseCookie accessCookie = ResponseCookie
                                        .from("access_token", access)
                                        .httpOnly(true)
                                        .secure(true)
                                        .path("/")
                                        .maxAge(Duration.ofMinutes(18))
                                        .sameSite("Strict")
                                        .build();

        ResponseCookie refreshCookie = ResponseCookie
                                        .from("refresh_token", refresh)
                                        .httpOnly(true)
                                        .secure(true)
                                        .path("/")
                                        .maxAge(Duration.ofDays(27))
                                        .sameSite("Strict")
                                        .build();

        return ResponseEntity
            .ok()
            .header("Set-Cookie", accessCookie.toString())
            .header("Set-Cookie", refreshCookie.toString())
            .body("User Logged In Successfully"); 
    }

    private void passwordMatcher(String password, String dbPassword) {
        if(!passwordEncoder.matches(password, dbPassword)) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Invalid credentials"
            );
        }
    }
}
