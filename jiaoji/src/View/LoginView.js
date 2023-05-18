import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../css/LoginView.css";
import * as userService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import CreateUserForm from "../Component/CreateUserForm";
import { Modal } from "antd";

const LoginView = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    userService.login(values);
  };

  const [showCreateUserForm, setShowCreateUserForm] = useState(false);

  const onCreateUserFinish = async (values) => {
    console.log("Received values of form: ", values);
    await userService.createUser(values).then((result) => {
      console.log(result);
    });
  };

  const showCreateUserModal = () => setShowCreateUserForm(true);

  return (
      <div className="login-view-container">
        <div className="login-form-container">
          <h1>Welcome Back</h1>
          <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{ width: 300 }}
          >
            <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your Username!" }]}
            >
              <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
              />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ width: "100%" }}
                  className="login-btn"
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <a href="#" onClick={showCreateUserModal}>
                Create an account
              </a>{" "}
              | <a href="#">Forget password</a>
            </Form.Item>
          </Form>
          <Modal
              title="创建用户"
              visible={showCreateUserForm}
              footer={null}
              onCancel={() => setShowCreateUserForm(false)}
          >
            <CreateUserForm onFinish={onCreateUserFinish} />
          </Modal>
        </div>
      </div>
  );
};

export default LoginView;
