package edu.project.ledgar.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.project.ledgar.models.TranscationModel;

public interface TranscationRepository extends JpaRepository<TranscationModel, String> {
    Optional<TranscationModel> findByDebitId(String debitId);
    Optional<TranscationModel> findByCreditId(String creditId);
    Optional<TranscationModel> findByAmount(int amount);
    Optional<TranscationModel> findByStatus(String status);
    Optional<TranscationModel> findByTime(LocalDateTime time);
    Optional<TranscationModel> findHistory(String id);
}
