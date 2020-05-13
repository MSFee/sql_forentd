import React, { useState, Fragment } from "react";
import { Form, Icon, Button, Input, message } from "antd";

import { getRegister } from "../../api/index";
import history from "../../util/history";
let TeacherRegisterForm = (props) => {
  const { status } = props;
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator } = props.form;

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        
        values.status = status;
        
        getRegister(values).then((res) => {
          
          if (res.error == 0) {
            message.success(res.message);
            history.push("/login");
          } else {
            message.error(res.message);
          }
        });
      }
    });
  }

  function compareToFirstPassword(rule, value, callback) {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码不一致!");
    } else {
      callback();
    }
  }
  function validateToNextPassword(rule, value, callback) {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  }
  function validateCode(rule, value) {
    if(value !== "SWPU") {
      return Promise.reject('邀请码不正确');
    }
    return Promise.resolve()
  }
  function handleConfirmBlur(e) {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  }
  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator("workNumber", {
            rules: [
              {
                required: true,
                message: "请输入教师工号!",
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="教师工号"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("userName", {
            rules: [
              {
                required: true,
                message: "请输入用户名!",
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="教师姓名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "请输入合法的邮箱!",
              },
              {
                required: true,
                message: "请输入邮箱!",
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="邮箱"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("school", {
            rules: [
              {
                required: true,
                message: "请输入学校!",
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="学校"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入密码!",
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "请确认你的密码!",
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input
              onBlur={handleConfirmBlur}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="确认密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("inviteCode", {
            rules: [
              {
                required: true,
                message: "请输入邀请码!",
              },{
                validator: validateCode
              }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="邀请码"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
      <div className="change-button">
        <a
          onClick={() => {
            history.push("/login");
          }}
        >
          已有账号？去登录
        </a>
      </div>
    </Fragment>
  );
};
const TeacherNormalRegisterForm = Form.create({ name: "teacher_register" })(
  TeacherRegisterForm
);
export default TeacherNormalRegisterForm;
