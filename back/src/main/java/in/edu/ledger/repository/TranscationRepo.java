package in.edu.ledger.repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import in.edu.ledger.models.TranscationModel;

public interface TranscationRepo extends JpaRepository<TranscationModel, String> {
     @Query("""
        SELECT t
        FROM TranscationModel t
        WHERE
            (t.debitProfile.id = :profileId
             OR
             t.creditProfile.id = :profileId)
        AND
            t.createdAt BETWEEN :start AND :end
    """)
    List<TranscationModel> findForPeriod(
            @Param("profileId") UUID profileId,
            @Param("start") Instant start,
            @Param("end") Instant end
    );
}