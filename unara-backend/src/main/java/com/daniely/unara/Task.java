package com.daniely.unara;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.sql.Time;

@Entity // This tells Hibernate to make a table out of this class
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;
    private String description;
    private boolean completed;
    private Time time;
    private Time completedTime;
    private Time lastEditedTime;


    public Task() {
        this.completed = false;
        this.time = new Time(System.currentTimeMillis());
        this.completedTime = null;
    }

    @ManyToOne  // Many tasks belong to one user
    @JoinColumn(name = "userId",nullable = false)  // Foreign key
    @JsonBackReference
    private User user;

    public void setId(Integer id) {
        this.id = id;
    }

    public Time getLastEditedTime() {
        return lastEditedTime;
    }

    public void setLastEditedTime(Time lastEditedTime) {
        this.lastEditedTime = lastEditedTime;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public void setCompletedTime(Time completedTime) {
        this.completedTime = completedTime;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public Time getTime() {
        return time;
    }

    public Time getCompletedTime() {
        return completedTime;
    }

    public User getUser() {
        return user;
    }
}