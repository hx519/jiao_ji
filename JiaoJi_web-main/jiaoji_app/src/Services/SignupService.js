// signupService.js

import {history} from "../utils/history";
import {message} from "antd";
import {postRequest} from "../utils/ajax";

export function postSignupData(requestData) {
    const url = `/api/signup`;
    const callback = (data) => {
        if (data.status >= 0) {
            message.success(data.msg);
        } else {
            message.error("请勿重复报名");
        }
    };
    postRequest(url, requestData, callback);

}
