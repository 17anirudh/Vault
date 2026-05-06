package edu.project.ledgar.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import edu.project.ledgar.dto.RegisterRequest;
import edu.project.ledgar.services.RegisterService;

@RestController
public class AuthController {
    private final RegisterService registerService;
    
    public AuthController(RegisterService registerService) {
        this.registerService = registerService;
    }
    
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        return registerService.register(request);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok().build();
    }
}
