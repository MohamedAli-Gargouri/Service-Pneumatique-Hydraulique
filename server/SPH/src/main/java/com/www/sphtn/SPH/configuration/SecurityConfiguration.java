package com.www.sphtn.SPH.configuration;

import com.www.sphtn.SPH.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    @Autowired
    private JwtAuthentificationFilter jwtAuthentificationFilter;
    @Autowired
    private AuthenticationProvider authentificationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
                //http.cors(AbstractHttpConfigurer::disable);
                http.csrf(AbstractHttpConfigurer::disable);
                http.authorizeHttpRequests(auth->{
                    auth.requestMatchers("/api/v1/auth/**").permitAll();
                    auth.requestMatchers("/api/v1/admin/**").hasRole(Role.ADMIN.toString());
                    auth.anyRequest().authenticated();
                });
                http.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
                http.authenticationProvider(authentificationProvider).addFilterBefore(jwtAuthentificationFilter, UsernamePasswordAuthenticationFilter.class);
                return http.build();
    }
}
