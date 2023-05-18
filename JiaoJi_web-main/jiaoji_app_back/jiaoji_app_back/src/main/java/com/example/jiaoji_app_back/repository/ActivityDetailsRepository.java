//package com.example.jiaoji_app_back.repository;
//
//import com.example.jiaoji_app_back.entity.ActivityDetails;
//
//import java.util.List;
//
//public interface ActivityDetailsRepository {
//
//    List<ActivityDetails> findAllActivity();
//    List<ActivityDetails> findPassedActivity();
//
//    ActivityDetails changeStatus(Long id, String status, String comments);
//
//    ActivityDetails handleSignup(Long userId, Long activityId);
//
//    ActivityDetails getPassedActivityById(Long activityId);
//    ActivityDetails getActivityById(Long activityId);
//
//    void updateActivityRemainingNumber(Long activityId,Long remainingNumber);
//}

package com.example.jiaoji_app_back.repository;

import com.example.jiaoji_app_back.entity.ActivityDetails;
import com.example.jiaoji_app_back.entity.ActivitySignup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityDetailsRepository extends JpaRepository<ActivityDetails,Integer> {
    ActivityDetails findById(Long activityId);
    List<ActivityDetails> findAll();

    List<ActivityDetails> findAllByStatusGreaterThanAndStatusLessThan(ActivityDetails.Status startStatus, ActivityDetails.Status endStatus);
    List<ActivityDetails> findByStatus(ActivityDetails.Status Status);

}
