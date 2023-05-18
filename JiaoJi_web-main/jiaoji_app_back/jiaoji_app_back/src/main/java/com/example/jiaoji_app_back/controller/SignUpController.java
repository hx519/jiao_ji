package com.example.jiaoji_app_back.controller;

import com.example.jiaoji_app_back.constant.Constant;
import com.example.jiaoji_app_back.entity.UserAuth;
import com.example.jiaoji_app_back.service.SignUpService;
import com.example.jiaoji_app_back.utils.msgutils.Msg;
import com.example.jiaoji_app_back.utils.msgutils.MsgCode;
import com.example.jiaoji_app_back.utils.msgutils.MsgUtil;
import com.example.jiaoji_app_back.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SignUpController {

    @Autowired
    private SignUpService signUpService;
    @PostMapping
    @RequestMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    public Msg login(@RequestBody Map<String, String> params){
        String userId = params.get(Constant.USER_ID);
        String actId = params.get(Constant.ACT_ID);

        if(signUpService.SignUp(Integer.parseInt(userId),Integer.parseInt(actId))){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SIGNUP_SUCCESS_MSG);
        }else{
            return MsgUtil.makeMsg(MsgCode.ERROR);
        }
    }
}
