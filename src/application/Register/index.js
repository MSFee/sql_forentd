import React, { useState } from "react";
import {  Icon, Tabs } from "antd";

import history from "../../util/history";
import {getRegister} from '../../api/index'

import Logo from "../../asserts/logo.png";
import IndexLogo from "../../asserts/index_logo.png";
import StudentRegisterForm from '../../components/Register/StudentRegisterForm';
import TeacherRegisterForm from '../../components/Register/TeacherRegisterForm';

import "./index.css";   

const { TabPane } = Tabs;
export default ()=> {
const [status, setStatus] = useState(0)
   
    
  function TabChange(key){
   setStatus(key)
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
                    学生注册
                  </span>
                }
                key="0"
              >
              {
                <StudentRegisterForm status={status}/>
              }
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="android" />
                    教师注册
                  </span>
                }
                key="1"
              >
                <TeacherRegisterForm status={status}/>
              </TabPane>
            </Tabs>

          </div>
        </div>
      </div>
    );
  }

