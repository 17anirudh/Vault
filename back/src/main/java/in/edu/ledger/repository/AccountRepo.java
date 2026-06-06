package in.edu.ledger.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.edu.ledger.models.AccountModel;
import in.edu.ledger.models.ProfileModel;

import java.util.UUID;

public interface AccountRepo extends JpaRepository<AccountModel, String> {
    
    Long getPinByProfileId(UUID profileId);
    Long getBalanceByProfileId(UUID profileId);

    AccountModel findByProfileId(ProfileModel profile);
}
