package com.example.jiaoji_app_back.controller;

import com.example.jiaoji_app_back.entity.User;
import com.example.jiaoji_app_back.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;


}