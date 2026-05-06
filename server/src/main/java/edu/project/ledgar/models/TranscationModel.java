package edu.project.ledgar.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Table(name = "transcations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TranscationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
        name = "debit_account_id",
        foreignKey = @ForeignKey(
            name = "FK_DEBIT_ACCOUNT_TRANSACTION",
            value = ConstraintMode.PROVIDER_DEFAULT
        ),
        nullable = false
    )
    private ProfileModel debit_account_id;

    @OneToOne(cascade = CascadeType.ALL)
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
    private Double amount;
    
    @Column(nullable = false)
    private TranscationStatus status;
}