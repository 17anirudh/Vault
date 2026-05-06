package edu.project.ledgar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.project.ledgar.models.AuthModel;
import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<AuthModel, String> {
    Optional<AuthModel> findByEmail(String email);
}
