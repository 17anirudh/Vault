package edu.project.ledgar.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(
    name = "auth", 
    indexes = {
        @Index(name = "idx_auth_profile_id", columnList = "profile_id")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
        name = "profile_id",
        foreignKey = @ForeignKey(
            name = "FK_PROFILE_AUTH",
            value = ConstraintMode.PROVIDER_DEFAULT
        ),
        nullable = false
    )
    private ProfileModel profile;   

    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Column(nullable = true)
    private String ip;
    
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String refreshToken;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp    
    @Column(nullable = false)
    private Instant updatedAt;
}
