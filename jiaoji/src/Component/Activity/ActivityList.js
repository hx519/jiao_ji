import React, {useEffect, useState} from 'react';
import { Avatar, List, Card } from 'antd';
import { Link } from "react-router-dom";
import {getAllActivities} from "../../Services/ActivitySevice";

const default_url = "https://th.bing.com/th/id/R.785580b0aa9cce1c7e016db5ee2e078e?rik=ebpuQj03uKxGQg&riu=http%3a%2f%2fphotos.tuchong.com%2f255820%2ff%2f2852945.jpg&ehk=8sZ0LLnnaIXhdwT1M5Zk2xrfIMFcE%2bV45Nc1839Gj7Y%3d&risl=&pid=ImgRaw&r=0";
/*
* @Description: 改成了class，因为用function的时候，在activities没有fetch到的时候页面报错
* */
class ActivityList  extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { books: booksData };
        this.state = { activities: [] };
    }

    async componentDidMount() {
        const fetchedActivities = await getAllActivities();
        this.setState({activities: fetchedActivities});
        console.log(this.state.activities)
    }
    render() {
        return(
            <List
                style={{margin: "20px"}}
                grid={{gutter: 16, column: 4}}
                dataSource={this.state.activities}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 16,
                }}
                renderItem={(activity) => (
                    <List.Item>
                        <Link to={`/activity/${activity.id}`}>
                            <Card
                                cover={<img alt={default_url}
                                        src={activity.photo? activity.photo: default_url}
                                            style={{width: "95%", margin: "0 auto"}}/>}
                                title={activity.name}

                            >
                                <Card.Meta description={activity.description}/>
                                活动时间：{activity.activityTime}
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
        )
    }

};

// const ActivityList = () => {
//     const [activities, setActivities] = useState(null);
//     useEffect(() => {
//         const fetchData = async () => {
//             const fetchedActivities = await getAllActivities();
//             setActivities(fetchedActivities);
//         };
//         fetchData();
//     });
//     return(
//         <List
//             grid={{gutter: 16, column: 4}}
//             dataSource={Activities}
//             pagination={{
//                 onChange: page => {
//                     console.log(page);
//                 },
//                 pageSize: 16,
//             }}
//             renderItem={(activity) => (
//                 <List.Item>
//                     <Link to={`/activity/${activity.id}`}>
//                         <Card
//                             cover={<img alt="example" src={activity.avatarUrl}/>}
//                             title={activity.title}
//                         >
//                             <Card.Meta description={activity.description}/>
//                             报名截止日期：{activity.date}
//                         </Card>
//                     </Link>
//                 </List.Item>
//             )}
//         />
//     )
//
// };

export default ActivityList;
