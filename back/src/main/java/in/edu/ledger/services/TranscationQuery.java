package in.edu.ledger.services;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import in.edu.ledger.repository.TranscationRepo;
import lombok.AllArgsConstructor;
import lombok.Data;

enum TransactionStatus {
    PENDING,
    COMPLETED,
    FAILED
}

record Response(
    UUID creditId,
    UUID debitId,
    Long amount,
    TransactionStatus status,
    String description,
    Instant createdAt,
    Instant completedAt
){}

@Component
@Data
@AllArgsConstructor
public class TranscationQuery {
    public final TranscationRepo transcationRepo;
    private final int dayInSeconds = 24 * 60 * 60;

    public List<Response> getDataForDay(UUID inp) {
        Instant start = Instant.now().minusSeconds(dayInSeconds);
        Instant end = Instant.now();
        return transcationRepo.findForPeriod(inp, start, end);
    }

    public List<Response> getDataForWeek(UUID inp) {
        Instant start = Instant.now().minusSeconds(dayInSeconds * 7);
        Instant end = Instant.now();
        return transcationRepo.findForPeriod(inp, start, end);
    }

    public List<Response> getDataForMonth(UUID inp) {
        Instant start = Instant.now().minusSeconds(dayInSeconds * 30);
        Instant end = Instant.now();
        return transcationRepo.findForPeriod(inp, start, end);
    }

    public List<Response> getDataForQuarter(UUID inp) {
        Instant start = Instant.now().minusSeconds(dayInSeconds * 90);
        Instant end = Instant.now();
        return transcationRepo.findForPeriod(inp, start, end);
    }

    public List<Response> getDataForHalfYear(UUID inp) {
        Instant start = Instant.now().minusSeconds(dayInSeconds * 180);
        Instant end = Instant.now();
        return transcationRepo.findForPeriod(inp, start, end);
    }

    public List<Response> getDataForYear(UUID inp) {
        Instant start = Instant.now().minusSeconds(dayInSeconds * 365);
        Instant end = Instant.now();
        return transcationRepo.findForPeriod(inp, start, end);
    }
}
