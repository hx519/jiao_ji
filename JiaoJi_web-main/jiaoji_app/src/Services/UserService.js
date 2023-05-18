import { postRequest, postRequest_v2 } from "../utils/ajax";
import { history } from "../utils/history";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

/**
 * avatar :
 * club:
 * college:
 * mail:
 * gender:
 * nickname :
 * phone:
 * stu_id:
 * userId:
 * userType:
 * username:
 * */
export const login = (data) => {
    const url = `/api/login`;
    const callback = (data) => {
        if (data.status >= 0) {
            localStorage.setItem("user", JSON.stringify(data.data));
            history.push("/");
            window.location.reload();
            // navigate("/Homepage");
            // console.log(useHistory())
            message.success(data.msg);
        } else {
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
};

export const createUser = (data, callback) => {
    return null;
};