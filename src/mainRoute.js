import React from "react";

import { Switch, Route } from "react-router-dom";
import { Popover, Avatar, message} from "antd";

//教师端
import TeacherMain from "./application/TeacherMain";
import PaperDetail from "./application/PaperDetail";

//学生端
import StudentMain from "./application/StudentMain";
import TitleMain from './application/TitleMain';
import TitleDetail from './application/TitleDetail';

import history from './util/history';


const text = <span>个人信息</span>;
const content = (
  <div>
    <p>学号</p>
    <p>邮箱</p>
    <hr/>
    <p onClick={loginOutFunc}>退出登录</p>
  </div>
);

function loginOutFunc(){
    localStorage.clear();
    message.success("退出登录成功",3)
    history.push("/login")
}
export default () => {
  
  return (
    <div>
      <div className="main-navbar">
        <Popover
          placement="bottomRight"
          title={text}
          content={content}
          trigger="click"
        >
          <Avatar className="loginout" size="large" icon="user" />
        </Popover>
      </div>
      <Switch>
        <Route exact path="/main/teacher" component={TeacherMain} />
        <Route
          path="/main/teacher/paperdetail/:paperId"
          component={PaperDetail}
        />
        <Route path="/main/student" component={StudentMain}/>
        <Route path="/main/answerTitle" component={TitleMain}/>
        <Route path="/main/titleDetail" component={TitleDetail}/>
      </Switch>
    </div>
  );
};
