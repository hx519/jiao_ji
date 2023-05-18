package com.example.jiaoji_app_back.controller;

import com.example.jiaoji_app_back.constant.Constant;
import com.example.jiaoji_app_back.dao.UserDao;
import com.example.jiaoji_app_back.daoimpl.UserDaoImpl;
import com.example.jiaoji_app_back.entity.UserAuth;
import com.example.jiaoji_app_back.repository.UserRepository;
import com.example.jiaoji_app_back.service.UserService;
import com.example.jiaoji_app_back.serviceimpl.UserServiceImpl;
import com.example.jiaoji_app_back.utils.msgutils.Msg;
import com.example.jiaoji_app_back.utils.msgutils.MsgCode;
import com.example.jiaoji_app_back.utils.msgutils.MsgUtil;
import net.sf.json.JSONObject;
import net.sf.json.test.JSONAssert;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class LoginControllerTest {

    @Mock
    private UserService userService;
    @InjectMocks
    private LoginController loginController;

    @Test
    void testLogin() {
        // 构造请求参数
        Map<String, String> params1 = new HashMap<>();
        params1.put(Constant.USERNAME, "root");
        params1.put(Constant.PASSWORD, "root");

        // 模拟 UserService.checkUser() 方法的行为
        Mockito.when(userService.checkUser("root", "root")).thenReturn(new UserAuth());

        // 调用登录接口
        Msg msg1 = loginController.login(params1);

        // 判断返回结果是否符合预期
        assertEquals(MsgCode.SUCCESS.getStatus(), msg1.getStatus(), "test1 failed");

        Map<String, String> params2 = new HashMap<>();
        params2.put(Constant.USERNAME, "root");
        params2.put(Constant.PASSWORD, "wrongPassword");

        // 模拟 UserService.checkUser() 方法的行为
        Mockito.when(userService.checkUser("root", "wrongPassword")).thenReturn(null);

        // 调用登录接口
        Msg msg2 = loginController.login(params2);

        // 判断返回结果是否符合预期
        assertEquals(MsgCode.LOGIN_USER_ERROR.getStatus(), msg2.getStatus(), "test2 failed");

        Map<String, String> params3 = new HashMap<>();
        params3.put(Constant.USERNAME, "wrongName");
        params3.put(Constant.PASSWORD, "root");

        // 模拟 UserService.checkUser() 方法的行为
        Mockito.when(userService.checkUser("wrongName", "root")).thenReturn(null);

        // 调用登录接口
        Msg msg3 = loginController.login(params3);

        // 判断返回结果是否符合预期
        assertEquals(MsgCode.LOGIN_USER_ERROR.getStatus(), msg3.getStatus(), "test3 failed");
    }
    @Test
    void logout() {
        loginController.logout();
        Msg msg = loginController.logout();
        assertEquals(MsgCode.SUCCESS.getStatus(), msg.getStatus(), "test1 failed");
    }

    @Test
    void checkSession() {
        Msg msg = loginController.checkSession();
        assertEquals(MsgCode.NOT_LOGGED_IN_ERROR.getStatus(), msg.getStatus(), "test1 failed");
    }
}