/*author: qyl*/
package com.example.jiaoji_app_back.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor

@Table(name ="activity_details")
public class ActivityDetails {
    public enum Status {
        NOT_RELEASE("notRelease"),
        TODO("todo"),
        PASS("pass"),
        REJECTED("rejected"),
        SIGN("sign"),
        PROCESS("process"),
        OVER("over");

        private final String value;

        Status(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static Status fromValue(String value) {
            for (Status status : Status.values()) {
                if (status.getValue().equalsIgnoreCase(value)) {
                    return status;
                }
            }
            throw new IllegalArgumentException("Invalid Status value: " + value);
        }
    }


    @Id
    private Long id;
    private String name;
    private String content;
    private String location;
    private String signupTime;
    private String activityTime;
    private String departments;
    private String signupRestriction;
    private String college;
    private String grade;
    private String club;
    private Long recruitmentNumber;
    private Long remainingNumber;
    private String organizer;
    private Long suScore;
    private Long laborHour;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String comments;
    private String photo;

    public ActivityDetails(Long id, String name, String content, String location, String signupTime, String activityTime, String departments, String signupRestriction, String college, String grade, String club, Long recruitmentNumber, Long remainingNumber,String organizer, Long suScore, Long laborHour, String status, String comments, String photo) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.location = location;
        this.signupTime = signupTime;
        this.activityTime = activityTime;
        this.departments = departments;
        this.signupRestriction = signupRestriction;
        this.college = college;
        this.grade = grade;
        this.club = club;
        this.recruitmentNumber = recruitmentNumber;
        this.remainingNumber = remainingNumber;
        this.organizer = organizer;
        this.suScore = suScore;
        this.laborHour = laborHour;
        this.status = Status.valueOf(status.toUpperCase());
        this.comments = comments;
        this.photo = photo;
    }


}