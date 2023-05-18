import React from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const CreateUserForm = ({ onFinish }) => {
    const [form] = Form.useForm();

    const onGenderChange = (value) => {
        switch (value) {
            case "male":
                form.setFieldsValue({ gender: 0 });
                return;
            case "female":
                form.setFieldsValue({ gender: 1 });
                return;
            default:
                form.setFieldsValue({ gender: null });
                return;
        }
    };

    return (
        <Form name="create_user" form={form} onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
                name="user_type"
                rules={[{ required: true, message: "Please select user type!" }]}
            >
                <Select placeholder="Select user type">
                    <Option value={0}>普通用户</Option>
                    <Option value={1}>管理员</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="gender"
                rules={[{ required: true, message: "Please select gender!" }]}
            >
                <Select placeholder="Select gender" onChange={onGenderChange}>
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="nickname"
                rules={[{ required: true, message: "Please input your nickname!" }]}
            >
                <Input placeholder="Nickname" />
            </Form.Item>

            <Form.Item
                name="tel"
                rules={[{ required: true, message: "Please input your phone number!" }]}
            >
                <Input placeholder="Phone number" />
            </Form.Item>

            <Form.Item
                name="avatar"
                rules={[{ required: true, message: "Please input your avatar link!" }]}
            >
                <Input placeholder="Avatar link" />
            </Form.Item>

            <Form.Item
                name="college"
                rules={[{ required: true, message: "Please input your college name!" }]}
            >
                <Input placeholder="College" />
            </Form.Item>

            <Form.Item
                name="student_id"
                rules={[{ required: true, message: "Please input your student ID!" }]}
            >
                <Input placeholder="Student ID" />
            </Form.Item>

            <Form.Item
                name="mail"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: "Please input a valid email address!"
                    }
                ]}
            >
                <Input placeholder="Email address" />
            </Form.Item>

            <Form.Item name="club">
                <Input placeholder="Club (Optional)" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    确认创建用户
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateUserForm;
