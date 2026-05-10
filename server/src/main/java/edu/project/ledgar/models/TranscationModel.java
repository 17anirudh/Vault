package edu.project.ledgar.models;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

enum TranscationStatus {
    PENDING,
    COMPLETED,
    FAILED,
    CANCELLED
}

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "transcations", indexes = {
    @Index(
        name = "idx_transcation_initiator_id",
        columnList = "initiator_id"
    ),
    @Index(
        name = "idx_transcation_credit_id",
        columnList = "credit_id"
    )
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TranscationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
        name = "debit_account_id",
        foreignKey = @ForeignKey(
            name = "FK_DEBIT_ACCOUNT_TRANSACTION",
            value = ConstraintMode.PROVIDER_DEFAULT
        ),
        nullable = false
    )
    private ProfileModel debit_account_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
        name = "credit_account_id",
        foreignKey = @ForeignKey(
            name = "FK_CREDIT_ACCOUNT_TRANSACTION",
            value = ConstraintMode.PROVIDER_DEFAULT
        ),
        nullable = false
    )
    private ProfileModel credit_account_id;

    @Column(nullable = false)
    @Min(value = 0, message = "Amount cannot be negative")
    private int amount;
    
    @Column(nullable = false)
    private TranscationStatus status;

    @Column(nullable = true)
    private String reason;

    @Column(nullable = true)
    private String nickname;
    
    @Column(nullable = true)
    private String notes;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant completedAt;
}
