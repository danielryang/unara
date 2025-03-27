package com.daniely.unara;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.daniely.unara.User;
import org.springframework.data.repository.query.Param;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {
    @Query(value = "SELECT * FROM user WHERE user_id = :userId", nativeQuery = true)
    User findByUserIdNative(@Param("userId") Integer userId);

    User findByUserId(Integer userId);
}