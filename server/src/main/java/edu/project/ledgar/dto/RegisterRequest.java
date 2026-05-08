package edu.project.ledgar.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest (
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    String email,

    @NotBlank
    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters long")
    String username,

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 25, message = "Password must be between 8 and 25 characters long")
    String password
){}
