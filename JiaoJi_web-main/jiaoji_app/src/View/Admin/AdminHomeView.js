import { Layout, Menu, Input } from "antd";
import React, {useState} from "react";
import PersonView from "../PersonView";
import ManageView from "./ManageView";
import AdminHistoryView from "./AdminHistoryView";

/**
 * 管理员页面
 * 实现管理活动和个人中心的切换
 * edit by yhx 0513
 */

const { Header, Content } = Layout;

const items = [
    {
        label: "管理活动",
        key: "manage",
        content:<ManageView/>,
    },
    {
        label: "审核记录",
        key: "history",
        content: <AdminHistoryView/>,
    },
    {
        label: "个人中心",
        key: "person",
        content: <PersonView/>,
    },

];


const AdminHomeView = () => {
    const [selectedKey, setSelectedKey] = useState("manage");

    const handleMenuClick = ({ key }) => {
        setSelectedKey(key);
    };
    return (
        <div>
            <Layout>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[selectedKey]}
                        onClick={handleMenuClick}
                        defaultSelectedKeys={["manage"]}
                        style={{ lineHeight: "64px" }}
                    >
                        {items.map((item) => (
                            <Menu.Item key={item.key}>{item.label}</Menu.Item>
                        ))}
                    </Menu>
                </Header>
                <Content style={{ padding: 10 }} className="home-content">
                    <div className="home-content">
                        {items.map((item) =>
                            item.key === selectedKey ? item.content : null
                        )}
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default AdminHomeView;