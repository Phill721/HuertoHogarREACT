package React.HuertoHogar.service;

import React.HuertoHogar.model.Usuario;
import React.HuertoHogar.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario save(Usuario usuario) {
        // cifrar contraseña antes de guardar
        if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
            String hashed = BCrypt.hashpw(usuario.getPassword(), BCrypt.gensalt());
            usuario.setPassword(hashed);
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario update(Long id, Usuario usuario) {
        return usuarioRepository.findById(id).map(existing -> {
            existing.setNombre(usuario.getNombre());
            existing.setEmail(usuario.getEmail());
            existing.setRol(usuario.getRol());
            if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
                String hashed = BCrypt.hashpw(usuario.getPassword(), BCrypt.gensalt());
                existing.setPassword(hashed);
            }
            return usuarioRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }
}
