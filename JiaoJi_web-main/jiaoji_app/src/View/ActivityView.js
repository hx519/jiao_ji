import React from "react";
import ActivityList from "../Component/Activity/ActivityList";
import Search from "antd/es/input/Search";

const ActivityView  = () => {

    const handleSearch = (value) => {
        console.log(value);
    };
    return (
        <div>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                style={{ width: 500, height: 60, margin: "20px auto" }}
            />
            <ActivityList />
        </div>
    );
};
export default ActivityView;