package com.www.sphtn.SPH.configuration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.www.sphtn.SPH.DTO.Errors.ErrorType;
import com.www.sphtn.SPH.DTO.Errors.ErrorsReader;
import com.www.sphtn.SPH.service.JwtService;
import com.www.sphtn.SPH.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthentificationFilter extends OncePerRequestFilter {
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtService jwtService;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;


                //if it's not in the white list
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    filterChain.doFilter(request, response);
                    return;
                }
        try {
                jwt = authHeader.substring(7);
                username = jwtService.extractUsername(jwt);
                //SecurityContextHolder.getContext().getAuthentication() == null means the user is not connected yet
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null)
                {
                    UserDetails userDetails_ProvidedByTheService = userDetailsService.loadUserByUsername(username);
                    //Test if the token is valid
                    if (jwtService.isTokenValid(jwt, userDetails_ProvidedByTheService)) {
                        //this Object is needed in order to update our Security Context
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails_ProvidedByTheService,
                                null,
                                userDetails_ProvidedByTheService.getAuthorities()
                        );
                        //Adding more details to our AuthToken such ass their IP address,Time stamp
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        //Updating the Security Context with our connected User.
                        SecurityContextHolder.getContext().setAuthentication(authToken);

                    }
                }
                filterChain.doFilter(request, response);
        }


        catch(ExpiredJwtException e)
        {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR10"));
            response.getWriter().write(json);

        }
        catch(UnsupportedJwtException e)
        {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR011"));
            response.getWriter().write(json);
        }
        catch(MalformedJwtException e)
        {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR08"));

            response.getWriter().write(json);

        }
        catch(SignatureException e)
        {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(ErrorsReader.GetErrors(ErrorType.AUTH_ERRORS).get("AUTH_ERROR09"));
            response.getWriter().write(json);

        }
    }
}