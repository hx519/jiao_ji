// export function getActivityDetails(callback) {
//     fetch('/api/activityDetails')
//         .then(response => response.json())
//         .then(data => {
//             if (data.ok) {
//                 // 如果成功获取数据，将数据传递给回调函数
//                 callback(data.data);
//             } else {
//                 // 如果获取数据失败，将错误信息传递给回调函数
//                 callback(null, data.msg);
//             }
//         })
//         .catch(error => {
//             // 如果出现错误，将错误信息传递给回调函数
//             callback(null, error);
//         });
// }
/*
* @Brief: 获取单个活动详情
* @Param: id 活动id
* */
export const getActivityByID = async (id) => {
    let activity = null;
    console.log("id",id);
    try {
        const response = await fetch(`/api/activity?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        activity = await response.json();
        console.log("get_activity", activity);
    } catch (error) {
        console.error("Error fetching activity:", error);
    }
    return activity;
}
export function changeStatus(id, status, comment, callback) {
    fetch('/changeStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": id,
            "status": status,
            "comments": comment,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // 如果成功获取数据，将数据传递给回调函数
                callback(data.data);
            } else {
                // 如果获取数据失败，将错误信息传递给回调函数
                callback(null, data.msg);
            }
        })
        .catch(error => {
            // 如果出现错误，将错误信息传递给回调函数
            callback(null, error);
        });
}
/*
* @Brief: 获取所有活动
* */
export const getAllActivities = async () => {
    let activities = null;
    try {
        const response = await fetch(`/api/activities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        activities = await response.json();
    } catch (error) {
        console.error("Error fetching activity:", error);
    }
    return activities;
}

/*
* @Brief: 获取我报名的活动
* @Param: userId 用户id
* */
export const getMyActivities = async (userId) => {
    let activities = null;
    console.log("userId",userId);
    try {
        const response = await fetch(`/api/my_activities?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        activities = await response.json();
        console.log("My activities", activities);
    } catch (error) {
        console.error("Error fetching activity:", error);
    }
    return activities;
}