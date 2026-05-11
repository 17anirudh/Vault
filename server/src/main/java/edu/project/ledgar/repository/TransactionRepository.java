package edu.project.ledgar.repository;

import java.time.Instant;
import java.util.UUID;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.project.ledgar.models.ProfileModel;
import edu.project.ledgar.models.TransactionModel;

enum TransactionStatus {
    PENDING,
    COMPLETED,
    FAILED,
    CANCELLED
}

public interface TransactionRepository extends JpaRepository<TransactionModel, UUID> {

    List<TransactionModel> findByDebitAccount(ProfileModel debitAccount);
    List<TransactionModel> findByCreditAccount(ProfileModel creditAccount);
    List<TransactionModel> findByAmount(int amount);
    List<TransactionModel> findByStatus(TransactionStatus status);
    List<TransactionModel> findByCompletedAt(Instant completedAt);
    List<TransactionModel> findByDebitAccountOrCreditAccount(
            ProfileModel debitAccount,
            ProfileModel creditAccount
    );
}
