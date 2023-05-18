package com.example.jiaoji_app_back.service;

import com.example.jiaoji_app_back.entity.ActivityDetails;
import com.example.jiaoji_app_back.entity.ActivityResponse;
import com.example.jiaoji_app_back.utils.msgutils.Message;

import java.util.List;

public interface ActivityService {
    public List<ActivityDetails> getActivityList();
    public List<ActivityResponse> getMyActivityList(int userId) ;
    public Message getPassedActivity();
    public Message changeStatus(Long id, String status, String comments);
    public Message updateActivityRemainingNumber(Long l,Long remainingNumber);

    public ActivityDetails getActivityById(Long activityId);

}