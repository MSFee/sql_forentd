import React, { useState, useEffect, Fragment } from "react";

import { Form, Icon, Input, Button, Checkbox, Tabs, message } from "antd";

import StudentForm from "../../components/Login/StudentForm";
import TeacherForm from "../../components/Login/TeacherForm";

import history from "../../util/history";
import { getLogin } from "../../api/index";

import IndexLogo from "../../asserts/index_logo.png";

import "./index.css";

const { TabPane } = Tabs;
export default () => {
  const [status, setStatus] = useState(0);

  function TabChange(key) {
    
    setStatus(key);
  }
  return (
    <div className="login-main">
      <div className="login-banner">
        <img src={IndexLogo} />
      </div>

      <div className="login">
        <div className="login-form">
          <div className="login-title">SQL训练测试平台</div>
          <Tabs defaultActiveKey="0" onChange={TabChange}>
            <TabPane
              tab={
                <span>
                  <Icon type="apple" />
                  学生登录
                </span>
              }
              key="0"
            >
              <StudentForm status={status}/>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="android" />
                  教师登录
                </span>
              }
              key="1"
            >
              <TeacherForm status={status}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
              
    </div>
  );
};
