package com.example.jiaoji_app_back.dao;

import com.example.jiaoji_app_back.entity.ActivityDetails;
import com.example.jiaoji_app_back.entity.ActivityResponse;
import com.example.jiaoji_app_back.entity.ActivitySignup;

import java.util.ArrayList;
import java.util.List;

public interface ActivityDao {

    public List<ActivityDetails> getAllActivities();

    public List<ActivityResponse> getMyActivities(int userId) ;

    public  List<ActivityDetails> getPassedActivity();

    public  ActivityDetails changeStatus(Long id, String status, String comments);

    public  void updateActivityRemainingNumber(Long activityId,Long remainingNumber);

    public ActivityDetails getActivityById(Long activityId);

}