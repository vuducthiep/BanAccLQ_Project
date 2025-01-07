package com.BanAccLQ.BanAccLQ.Util;

import io.jsonwebtoken.*;

import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class JwtUtil {
    public static String generateToken(String username) {
        // Tạo khóa với kích thước bảo mật đủ cho HS256
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        // Tiến hành tạo JWT với khóa này
        String token = Jwts.builder()
                .setSubject(username)
                .signWith(key)
                .compact();

        return token;
    }
}
