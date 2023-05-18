import {getUser} from "../Services/UserService";
import HomeView from "./User/HomeView";
import AdminHomeView from "./Admin/AdminHomeView";


const BasicView = () => {
    const user = getUser();
    console.log(user)
    if(user == null ){
       return (
           <div >
               <HomeView/>
           </div>
       )
    }
    if(user.userType === 0) {
        console.log("userType = 0")
        return (
            <div>
                <HomeView />
            </div>
        )
    }
    console.log("userType = 1")
    return (
        <div>
            <AdminHomeView/>
        </div>
    )
    // return (
    //     <div>
    //         <HomeView/>
    //     </div>
    // )
}

export default BasicView;