package edu.project.ledgar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.project.ledgar.models.ProfileModel;
import java.util.Optional;

@Repository
public interface RegisterRepo extends JpaRepository<ProfileModel, String> {
    Optional<ProfileModel> findByProfileId(String profileId);
    Optional<ProfileModel> findByEmail(String email);
}
