package edu.project.ledgar.models;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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

enum TransactionStatus {
    PENDING,
    COMPLETED,
    FAILED,
    CANCELLED
}

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "transcations", indexes = {
    @Index(
        name = "idx_transcation_debit_account",
        columnList = "debit_account"
    ),
    @Index(
        name = "idx_transcation_credit_account",
        columnList = "credit_account"
    )
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(
        name = "debit_account",
        foreignKey = @ForeignKey(
            name = "FK_DEBIT_ACCOUNT_TRANSACTION",
            value = ConstraintMode.PROVIDER_DEFAULT
        ),
        nullable = false
    )
    private ProfileModel debitAccount;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(
        name = "credit_account",
        foreignKey = @ForeignKey(
            name = "FK_CREDIT_ACCOUNT_TRANSACTION",
            value = ConstraintMode.PROVIDER_DEFAULT
        ),
        nullable = false
    )
    private ProfileModel creditAccount;

    @Column(nullable = false)
    @Min(value = 0, message = "Amount cannot be negative")
    private int amount;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;

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
