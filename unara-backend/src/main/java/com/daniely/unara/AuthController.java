package com.daniely.unara;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="*")
public class AuthController {
    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkAuthentication(HttpServletRequest request) {
        boolean isAuthenticated = request.getUserPrincipal() != null;
        Map<String, Boolean> response = new HashMap<>();
        response.put("isAuthenticated", isAuthenticated);
        return ResponseEntity.ok(response);
    }
}
