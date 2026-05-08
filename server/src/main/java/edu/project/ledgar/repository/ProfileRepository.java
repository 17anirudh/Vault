package edu.project.ledgar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.project.ledgar.models.ProfileModel;
import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileModel, String> {
    Optional<ProfileModel> findByEmail(String email);
    Optional<ProfileModel> findByUsername(String username);
    Optional<ProfileModel> findByPassword(String password);
}
