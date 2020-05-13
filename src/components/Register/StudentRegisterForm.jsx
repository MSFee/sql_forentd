import React, { useState, Fragment } from "react";
import { Form, Icon, Input, Button, message } from "antd";

import {getRegister} from '../../api/index';
import history from "../../util/history";
let StudentRegisterForm = (props) => {
    const {status,form}=props;
    const [confirmDirty, setConfirmDirty] = useState(false)
   const { getFieldDecorator } = form;
   form.resetFields();
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        
        values.status=status
        getRegister(values).then(res=>{
            
            if(res.error==0){
                message.success(res.message);
                history.push('/login');
            }else{
                message.error(res.message)
            }
        })

      }
    });
  }

  function compareToFirstPassword(rule, value, callback) {
      const { form } = props;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码不一致!');
      } else {
        callback();
      }
    };
    function validateToNextPassword (rule, value, callback) {
      const { form } = props;
      if (value && confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
    function   handleConfirmBlur (e){
        const { value } = e.target;
        setConfirmDirty(confirmDirty||!!value)
      };
  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator("studentId", {
            rules: [
              {
                required: true,
                message: "请输入学号",
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
          {getFieldDecorator("userName", {
            rules: [
              {
                required: true,
                message: "请输入姓名!",
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="学生姓名"
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
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="学校"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("professional", {
            rules: [
              {
                required: true,
                message: "请输入专业!",
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="专业"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("class", {
            rules: [
              {
                required: true,
                message: "请输入班级!",
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="班级"
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
             type='password'
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
              type="password"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="确认密码"
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
const StudentNormalRegisterForm = Form.create({ name: "student_register" })(
  StudentRegisterForm
);
export default StudentNormalRegisterForm;
