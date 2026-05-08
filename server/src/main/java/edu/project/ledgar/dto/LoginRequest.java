package edu.project.ledgar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record LoginRequest (
    @NotBlank(message = "Identity (email or username) is required")
    String identity,

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 25, message = "Password must be between 8 and 25 characters")
    String password
){}
