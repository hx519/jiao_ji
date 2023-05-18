import {message} from "antd";
import {postRequest} from "../utils/ajax";

export const submitMoment = async ([text,imageFile]) => {
    // event.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', imageFile);
    console.log(formData)
    // try {
    //     const response = await fetch('/api/post', {
    //         method: 'POST',
    //         body: formData,
    //     });
    //
    //     if (response.ok) {
    //         console.log('Post successfully submitted.');
    //     } else {
    //         console.error('Failed to submit post.');
    //     }
    // } catch (error) {
    //     console.error(error);
    // }
};

export const submitPhoto = async (data) => {
    const url = ` http://localhost:8003/uploadphoto`;
    const callback = (data) => {
        if (data.status >= 0) {
            message.success(data.msg);
            return data;
        } else {
            message.error(data.msg);
            return null;
        }
    };
    const result = await postRequest(url, data, callback);
    return result;
    // localStorage.setItem("user", JSON.stringify(data.data));
    // history.push("/HomeView");
}
