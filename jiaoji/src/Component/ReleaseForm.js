import React, {useState} from "react";
import {Form, Input, Button, Row, Col, Modal, message} from "antd";
import { Card as AntCard } from "antd";
import "../css/SignUp.css";
import {getUser} from "../Services/UserService";
import {postSignupData} from "../Services/SignupService";

const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 17,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 7,
        span: 17,
    },
};



const ReleaseForm = ({ ActivityId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleConfirmSignUp = (formData) => {
        console.log(ActivityId);
        const requestData = {
            userId: 1,
            activityId: ActivityId,
            ...formData,
        };
        console.log(requestData);

        // 发送请求等其他逻辑...
        fetch('/api/handleSignup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // 处理报名成功的逻辑
                    console.log(data.msg);
                    console.log(data.data);
                    alert("报名表单已提交，报名成功！")
                } else {
                    // 处理报名失败的逻辑
                    console.error(data.msg);
                    alert(data.msg)
                }
            })
            .catch(error => {
                // 处理错误信息
                console.error(error);
            });

    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const user = getUser();
        if(user == null){
            message.error("请先登录");
            setIsModalOpen(false);
            return;
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onRelease = () => {
        setIsModalOpen(false);
    };
    const onSave = () => {
            setIsModalOpen(false);
    };


    return (
        <div className="card-container">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Button type="primary"  onClick={showModal}>发布活动</Button>
                <Modal title="报名确认" open={isModalOpen} footer={null} onOk={handleOk}  onCancel={handleCancel}>

                        <div className="ant-card-body">
                            <Form {...layout}  name="basic" onFinish={handleConfirmSignUp}>
                                <Form.Item
                                    label="姓名"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入姓名！",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="学号"
                                    name="studentId"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入学号！",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="学院"
                                    name="college"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入学院！",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="年级"
                                    name="grade"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入年级！",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="社团"
                                    name="club"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入所属社团！",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="手机号码"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入手机号码！",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="邮箱"
                                    name="mail"
                                    rules={[
                                        {
                                            type: "email",
                                            message: "请输入正确的邮箱地址！",
                                        },
                                        {
                                            required: true,
                                            message: "请输入邮箱地址！",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Button type="primary" htmlType="submit" onClick={onRelease}>
                                                确认发布
                                            </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button onClick={onSave}>保存草稿</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </div>
                </Modal>
            </div>

        </div>
    );
};

export default ReleaseForm;