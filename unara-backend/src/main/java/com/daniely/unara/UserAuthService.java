package com.daniely.unara;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserAuthService.class);

    @Autowired
    public UserAuthService(UserRepository userRepository) {
        System.out.println("CustomOAuth2UserService has been instantiated!");
        logger.info("CustomOAuth2UserService is now active");
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        try {
            logger.info("OAuth2 authentication started");
            OAuth2User oauth2User = super.loadUser(userRequest);
            logger.info("OAuth2 user loaded successfully");

            // Extract attributes safely
            String username = extractAttribute(oauth2User, "login");
            String name = extractAttribute(oauth2User, "name");
            String email = extractAttribute(oauth2User, "email");

            logger.info("Extracted user details: username={}, name={}, email={}", username, name, email);

            if (username == null) {
                logger.error("Username is null, cannot create user");
                return oauth2User;
            }

            User user = userRepository.findByUsername(username);
            if (user == null) {
                logger.info("Creating new user with username: {}", username);
                user = new User();
                user.setUsername(username);
                user.setName(name);
                user.setEmail(email);
                userRepository.save(user);
                logger.info("New user saved successfully");
            } else {
                logger.info("User already exists: {}", username);
            }

            return oauth2User;
        } catch (Exception e) {
            logger.error("Error in OAuth2 authentication process", e);
            throw new OAuth2AuthenticationException(new OAuth2Error("user_creation_error"), e.getMessage());
        }
    }

    private String extractAttribute(OAuth2User oauth2User, String attribute) {
        return oauth2User.getAttribute(attribute);
    }
}
