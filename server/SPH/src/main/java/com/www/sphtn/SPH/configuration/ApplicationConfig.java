package com.www.sphtn.SPH.configuration;

import com.www.sphtn.SPH.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository repository;
    @Bean
    public UserDetailsService userDetailsService() {
        // Define a lambda expression to fetch user details by username
        return username -> repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authentificationProvider() {
        // Step 1: Create a new instance of DaoAuthenticationProvider
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        // Step 2: Configure the authentication provider

        // Step 3: Set the user details service
        authProvider.setUserDetailsService(userDetailsService());
        // The userDetailsService() method provides a service to load user details by username.

        // Step 4: Set the password encoder
        authProvider.setPasswordEncoder(passwordEncoder());
        // The passwordEncoder() method provides a password encoder to hash and verify passwords.

        // Step 5: Return the configured authentication provider
        return authProvider;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        // Step 1: Obtain and return the AuthenticationManager from the provided AuthenticationConfiguration.
        return config.getAuthenticationManager();
        // The AuthenticationManager is a core component in Spring Security used for user authentication.
        // By defining it as a bean, we make it accessible in the application's Spring context.
        // This allows us to use it for user authentication in various parts of the application.
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
