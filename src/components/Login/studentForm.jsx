import React, { Fragment } from "react";

import { Form, Icon, Input, Button, message } from "antd";

import {getLogin} from '../../api/index';
import history from "../../util/history";

let StudentLoginForm = (props) => {
  const {status, form}=props
  const { getFieldDecorator } = form;
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        values.status=status;
        getLogin(values).then(res=>{
          if(res.error==0){
              message.success(res.message);
              localStorage.setItem("token",res.token);
              localStorage.setItem("status", res.status);
              localStorage.setItem("userName", res.userName);
              history.push('/main/student')
          }else{
              message.error(res.message);
          }
      })
      }
    });
  }
  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator("studentId", {
            rules: [
              {
                required: true,
                message: "请输入你的学号",
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="学生学号"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入你的密码",
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
        <div className="change-button">
          <a
            onClick={() => {
              history.push("/register");
            }}
          >
            没有账号？去注册
          </a>
          <a
            onClick={() => {
              history.push("/forgetPassword");
            }}
          >
            忘记密码？
          </a>
        </div>
      </Form>
    </Fragment>
  );
};
const StudentNormalLoginForm = Form.create({ name: "student_login" })(
  StudentLoginForm
);
export default StudentNormalLoginForm;
