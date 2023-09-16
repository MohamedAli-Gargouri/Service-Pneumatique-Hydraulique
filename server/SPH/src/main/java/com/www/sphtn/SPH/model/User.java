package com.www.sphtn.SPH.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Document(collection = "Users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    private String id;
    @Indexed(unique = true)
    private String userName;
    private String firstName;
    private String lastName;
    private String internationalDialingCode;
    @Indexed(unique = true)
    private Integer phoneNumber;
    public Integer internationalDialNumber;
    @Indexed(unique = true)
    private String email;
    private Role role;
    private String password;
    private Date createDateTime;
    private Date deleteDateTime;
    private boolean isEnabled;
    private Date lockDateTime;
    private boolean isAccountNonLocked;
    @Indexed(unique = false)
    @DBRef
    private dbFile profileImage;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
