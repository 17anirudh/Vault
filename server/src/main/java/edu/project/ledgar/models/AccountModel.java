package edu.project.ledgar.models;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(
    name = "account", 
    indexes = {
        @Index(name = "idx_account_profile_id", columnList = "profile_id")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
        name = "profile_id",
        foreignKey = @ForeignKey(
            name = "FK_PROFILE_ACCOUNT",
            value = ConstraintMode.PROVIDER_DEFAULT
        ),
        nullable = false
    )
    private ProfileModel profile_id; 

    @Column(nullable = false)
    @Min(value = 1000, message = "PIN must be at least 4 digits")
    @Max(value = 9999, message = "PIN must be at most 4 digits")
    private int pin;

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
