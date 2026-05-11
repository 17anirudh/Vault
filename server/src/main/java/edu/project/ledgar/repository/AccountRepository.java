package edu.project.ledgar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.project.ledgar.models.AccountModel;
import edu.project.ledgar.models.ProfileModel;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<AccountModel, String> {
    Optional<AccountModel> findByProfile(ProfileModel profile);
}
