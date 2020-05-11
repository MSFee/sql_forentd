import React, { useState, useEffect } from "react";
import { Form, Input, Modal, message } from "antd";
import {updateTitle} from '../../../api/index';
const { TextArea } = Input;
const NormalLoginForm = props => {
    const {titleName,answer,titleId,queryPaperDetail}=props;
  const { getFieldDecorator,setFieldsValue } = props.form;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setFieldsValue({
        titleName:titleName,
        answer:answer
    })
  }, [])
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
          values.titleId=titleId;
          
          
          updateTitle(values).then(res=>{
              
              
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
      <a key="list-loadmore-edit" onClick={showModal}>更新</a>
      <Modal
        title="增加题目详细信息"
        visible={visible}
        okText="更新"
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
