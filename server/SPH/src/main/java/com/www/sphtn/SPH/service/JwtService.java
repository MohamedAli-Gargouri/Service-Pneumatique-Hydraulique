package com.www.sphtn.SPH.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${spring.jwt.accessTokenSecretKey}")
    private String SECRET_KEY;
    @Value("${spring.jwt.accessShortTokenExpirationInHour}")
     private Integer shortAccessTokenExpirationHr;

    @Value("${spring.jwt.accessLongTokenExpirationInHour}")
    private Integer longAccessTokenExpirationHr;

    public String extractUsername(String token)throws ExpiredJwtException, UnsupportedJwtException,MalformedJwtException,SignatureException
    {
        return extractClaim(token,Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver) throws ExpiredJwtException, UnsupportedJwtException,MalformedJwtException,SignatureException
    {
        final Claims claims=extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) throws ExpiredJwtException, UnsupportedJwtException,MalformedJwtException,SignatureException
    {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

    public String generateToken(UserDetails userDetails,Boolean isLongLived)
    {

        return generateToken(new HashMap<>(),userDetails,isLongLived);
    }
    public boolean isTokenvalid(String token,UserDetails userDetails)
    {
        final String username=extractUsername(token);
        boolean a=isTokenExpired(token);
        return(username.equals(userDetails.getUsername())&& !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) throws UnsupportedJwtException,MalformedJwtException,SignatureException {

        try
        {
            extractExpiration(token);
            return true;
        }
        catch(ExpiredJwtException e)
        {
            return false;
        }

    }

    private Date extractExpiration(String token) throws ExpiredJwtException, UnsupportedJwtException,MalformedJwtException,SignatureException {

        return extractClaim(token,Claims::getExpiration);
    }

    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails,Boolean isLongLived)
    {
        //If validation is for long
        if(isLongLived)
        {
            return Jwts.builder()
                    .setClaims(extraClaims)
                    .setSubject(userDetails.getUsername())
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis()+longAccessTokenExpirationHr*60*60*1000))
                    .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                    .compact();
        }
        //If validation is for short access
        else
        {
            return Jwts.builder()
                    .setClaims(extraClaims)
                    .setSubject(userDetails.getUsername())
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis()+shortAccessTokenExpirationHr*60*60*1000+1))
                    .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                    .compact();
        }
    }
    private Key getSignInKey() {

        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}
