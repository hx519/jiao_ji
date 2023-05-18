import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState } from 'react';
import {postRequest} from "../../utils/ajax";
import {submitPhoto} from "../../Services/MomentService";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

/*
* @brief: 上传图片组件,用于朋友圈功能或发布活动功能
* @autor: dxm
* */
const PhotoUpload = ({onUpload}) => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange =  ({ fileList: newFileList }) => {
        // const base64Files = await Promise.all(
        //     newFileList.map(async (file) => ({
        //         name: file.name,
        //         base64: await getBase64(file.originFileObj),
        //     }))
        // );
        setFileList(newFileList);
        // const formData = new FormData();
        // newFileList.forEach((file) => {
        //     formData.append('file', file.originFileObj);
        // });
        // postRequest('http://localhost:8003/uploadphoto', formData, null);
    }
    const handleUpload = () => {
        submitPhoto(fileList).then(r => {
            console.log(r);
        })
        const newFileList = fileList.map( (file) => ({
                status: 'done',
            }))
        setFileList(newFileList);
        onUpload(newFileList);
    }
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传照片
            </div>
        </div>
    );
    return (
        <>
            <Upload
                // action="http://localhost:8003/uploadphoto"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={handleUpload}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
export default PhotoUpload;