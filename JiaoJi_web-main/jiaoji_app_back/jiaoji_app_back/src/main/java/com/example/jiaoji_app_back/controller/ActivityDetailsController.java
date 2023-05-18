/*author: qyl*/
package com.example.jiaoji_app_back.controller;

import com.example.jiaoji_app_back.constant.Constant;
import com.example.jiaoji_app_back.entity.ActivityDetails;
import com.example.jiaoji_app_back.entity.ActivityResponse;
import com.example.jiaoji_app_back.utils.msgutils.Message;
import com.example.jiaoji_app_back.repository.ActivityDetailsRepository;
import com.example.jiaoji_app_back.service.ActivityService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityDetailsController {
    @Autowired
    private ActivityService activityService;
    private final ActivityDetailsRepository activityDetailsRepository;

    public ActivityDetailsController(ActivityDetailsRepository activityDetailsRepository) {
        this.activityDetailsRepository = activityDetailsRepository;
    }

    @RequestMapping("/activity")
    public ActivityDetails getActivityById(@RequestParam("id") Long id) {
        return  activityService.getActivityById(id);
    }
    @RequestMapping("/activities")
    public List<ActivityDetails> getList(){
        return activityService.getActivityList();
    }

    @RequestMapping("/my_activities")
    public List<ActivityResponse> getMyActivities(@RequestParam("userId") int userId) {
        return activityService.getMyActivityList(userId);
    }


    @GetMapping("/getPassedActivities")
    public Message getPassedList2(){
        return activityService.getPassedActivity();
    }

    @PostMapping("/changeStatus")
    public Message changeStatus(@RequestBody Map<String,Object> body){
        Long id = Long.valueOf(body.get("id").toString());
        String status = (String) body.get("status");
        String comments = (String) body.get("comments");
        return activityService.changeStatus(id, status,comments);
    }
//    @PostMapping("/handleSignup")
//    public Message handleSignup(@RequestBody Map<String,Object> body){
//        Long userId = Long.valueOf(body.get("userId").toString());
//        String college = (String) body.get("college");
//        String grade = (String) body.get("grade");
//        String club = (String) body.get("club");
//        Long activityId = Long.valueOf(body.get("activityId").toString());
//        ActivityDetails activityDetails = activityService.getPassedActivitiesByAId(activityId);
//        //剩余名额减一
//        if(activityDetails.getRemainingNumber()>0){
//
//            if(activityDetails.getCollege() !=null){
//                if(!Objects.equals(college, activityDetails.getCollege())){
//                    return new Message("学院不符合要求",false,null);
//                }
//            }
//            if(activityDetails.getClub() !=null){
//                if(!Objects.equals(club, activityDetails.getClub())){
//                    return new Message("社团不符合要求",false,null);
//                }
//            }
//            if(activityDetails.getGrade() !=null){
//                if(!Objects.equals(grade, activityDetails.getGrade())){
//                    return new Message("年级不符合要求",false,null);
//                }
//            }
//            activityDetails.setRemainingNumber(activityDetails.getRemainingNumber()-1);
//            Message message = activityService.updateActivityRemainingNumber(activityId,activityDetails.getRemainingNumber() -1);
//            System.out.println(message.getOk());
//            return new Message("报名成功",true,activityDetails);
//        }else
//            return new Message("报名失败",false,null);
//
//    }


}