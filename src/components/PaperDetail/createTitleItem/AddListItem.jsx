import React, { useState } from "react";
import { Form, Input, Button, Modal, Select, message, Icon } from "antd";
import {useLocation} from 'react-router'
import {createTitle} from '../../../api/index';
const { TextArea } = Input;
const NormalLoginForm = props => {
    const {queryPaperDetail}=props;
    let location = useLocation();
  const paperId = location.pathname.split("/").pop();
  const { getFieldDecorator } = props.form;
  const [visible, setVisible] = useState(false);
  function showModal() {
    setVisible(true);
  }
  function handleCancel() {
    setVisible(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
          values.paperId=paperId
          console.log(values);
          createTitle(values).then(res=>{
              console.log("开始打印");
              console.log(res);
              if(res.error==0){
                  message.success(res.message);
                  queryPaperDetail();
              }else{
                  message.error(res.message);
              }
          })
        setVisible(false);
      }
    });
  }
  return (
    <div className="product-header">
      <div style={{ textAlign: "right",marginRight:"10px" }}>
        <Button icon="plus-square" type="primary" onClick={showModal}>
          添加题目
        </Button>
      </div> 
      <Modal
        title="增加题目详细信息"
        visible={visible}
        okText="添加"
        cancelText="取消"
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator("titleName", {
              rules: [{ required: true, message: "题目不能为空" }]
            })(<Input placeholder="输入题目描述" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("answer", {
              rules: [{ required: true, message: "答案不能为空" }]
            })(<TextArea placeholder="请输入题目答案" rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
export default WrappedNormalLoginForm;
