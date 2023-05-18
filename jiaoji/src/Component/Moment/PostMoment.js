import {Button, Drawer, message, Radio, Space} from 'antd';
import React, { useState } from 'react';
import PhotoUpload from "./PhotoUpload";
import {InboxOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {submitMoment} from "../../Services/MomentService";
const PostMoment = () => {
    const [open, setOpen] = useState(false);
    const [placement] = useState('top');
    const [moment, setMoment] = useState({
        text: '',
        images: []
    });
    const handleImageUpload = fileList => {
        setMoment({
            ...moment,
            images: [fileList]
        });
    };


    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onCommit = () => {

        // 发送moment对象到后端进行保存
        submitMoment([this.state.text, this.states.images])
        //     .then(r => {
        //     if (r.code === 200) {
        //         message.success('发布成功');
        //     } else {
        //         message.error('发布失败');
        //     }
        // });
        // 清空moment对象
        setMoment({ text: '', images: [] });
        setOpen(false);
    };
    return (
        <>
            <Space style={{
                padding: 10,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Button style={{backgroundColor:"rgba(255,255,255,0.5)"}} type="default" shape="circle" icon={<InboxOutlined />} size={'middle'} />

                <Button style={{backgroundColor:"rgba(255,255,255,0.5)"}} type="default" shape="circle" icon={<PlusOutlined />} size={'middle'}
                        onClick={showDrawer}/>
                {/*<Button type="primary" onClick={showDrawer}>*/}
                {/*    Open*/}
                {/*</Button>*/}
            </Space>
            <Drawer
                title=" "
                placement={placement}
                width={500}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button type="primary" onClick={onCommit}>
                            发布
                        </Button>
                    </Space>
                }
            >
                <TextArea rows={4} placeholder="发布新的朋友圈吧~"
                          value={moment.text}
                          onChange={e => setMoment({ ...moment, text: e.target.value })}/>
                <br/>  <br/> <br/>
               <PhotoUpload onUpload={handleImageUpload}/>
            </Drawer>
        </>
    );
};
export default PostMoment;