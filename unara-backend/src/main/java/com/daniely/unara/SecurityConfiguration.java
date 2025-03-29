package com.daniely.unara;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;


@Configuration
@EnableWebSecurity
@CrossOrigin
public class SecurityConfiguration  {

    private final String allowedOrigin;
    private final UserAuthService customOAuth2UserService;


    public SecurityConfiguration(UserAuthService customOAuth2UserService) {
        this.customOAuth2UserService = customOAuth2UserService;
        io.github.cdimascio.dotenv.Dotenv dotenv = io.github.cdimascio.dotenv.Dotenv.load();
        this.allowedOrigin = dotenv.get("ALLOWED_ORIGIN");
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/public").permitAll() // Allow public access
                        .anyRequest().authenticated() // Secure everything else
                )
                .oauth2Login(oauth2Login -> oauth2Login
                        .defaultSuccessUrl(allowedOrigin, true) // Redirect after successful authentication
                        .userInfoEndpoint(userInfo ->
                                userInfo
                                        .userService(customOAuth2UserService)
                ))
                .logout(logout -> logout
                        .logoutSuccessUrl("/")
                        .deleteCookies("SESSION") // Clears session on logout
                        .permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

        return http.build();
    }
    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList(allowedOrigin));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
