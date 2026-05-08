package edu.project.ledgar.models;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "profile", indexes = {
        @Index(name = "idx_profile_username", columnList = "username")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email format")
    private String email;

    @Column(nullable = true)
    @Size(min = 4 , max = 20, message = "Name must be between 4 and 20 characters")
    @Pattern(
        regexp = "^[a-zA-Z. ]+$", 
        message = "Only letters, dots, and spaces are allowed"
    )
    private String name;

    @Column(nullable = true, unique = true)
    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
    @Pattern(
        regexp = "^[a-zA-Z. ]+$", 
        message = "Only letters, dots, and spaces are allowed"
    )
    private String username;

    @Column(nullable = false)
    @Min(value = 0, message = "Balance cannot be negative")
    private int balance = 0;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;
}
