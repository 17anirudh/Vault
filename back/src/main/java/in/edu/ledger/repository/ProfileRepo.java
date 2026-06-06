package in.edu.ledger.repository;

import java.util.UUID;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import in.edu.ledger.models.ProfileModel;

public interface ProfileRepo extends JpaRepository<ProfileModel, String> {
    Optional<byte[]> getProfilePicture(UUID id);
    Optional<String> getUsername(UUID id);
    Optional<String> getEmail(UUID id);

    Optional<byte[]> getProfilePictureByEmail(String email);
    Optional<String> getUsernameByEmail(String email);
    Optional<String> getEmailByEmail(String email);

    Optional<byte[]> getProfilePictureByUsername(String username);
    Optional<String> getUsernameByUsername(String username);
    Optional<String> getEmailByUsername(String username);
    
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
