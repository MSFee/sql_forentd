import React, { useState, useEffect } from "react";
import { Form, Input, Modal, message, Button, Drawer, Table } from "antd";
import {updateTitle, getTestAnswer} from '../../../api/index';
const { TextArea } = Input;
const NormalLoginForm = props => {
  const {titleName,answer,score,titleId,queryPaperDetail}=props;
  const { getFieldDecorator,setFieldsValue } = props.form;
  const [visible, setVisible] = useState(false);
  const [sqlTestVisible, setSqlTestVisible] = useState(false)
  const [columns, setColumns] = useState([])
  const [tableList, setTableList] = useState([])
  function showModal() {
    setFieldsValue({
      titleName:titleName,
      answer:answer,
      score,
  })
    setVisible(true);
  }
  function handleCancel() {
    setVisible(false);
  }
  const checkScore = (rule, value) => {
    if (!value) {
      return Promise.reject('分数不能为空')
    }
    if (typeof Number(value) === 'number') {
      if (Number(value) > 100 || Number(value) <= 0) {
        return Promise.reject('分数大小为1-99')
      } else {
        return Promise.resolve()
      }
    } else {
      return Promise.reject('只能填写数字')
    }
  }
  function answerTest () {
    const answer =  props.form.getFieldValue("answer")
    if(!answer) {
      message.warning("请输入sql语句")
      return
    }
    const postValue = {
      answer,
    }
    getTestAnswer(postValue).then(res => {
      if(res.normalOperation) {
        const resultList = res.resultList;
        const temColumns = [];
        if(resultList.length) {
          const obj = resultList[0];
          for(let key in obj) {
           const temObj = {};
           temObj.title = key;
           temObj.dataIndex = key;
           temObj.key = obj[key];
           temColumns.push(temObj);
          }
        }
        setColumns(temColumns);
        setTableList(resultList);
      }else {
 
      }
    });
    setSqlTestVisible(true)
   }
   function onClose () {
    setSqlTestVisible(false)
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
            {getFieldDecorator('score', {
              rules: [{ validator: checkScore }]
            })(<Input placeholder='请输入分数' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("answer", {
              rules: [{ required: true, message: "答案不能为空" }]
            })(<TextArea placeholder="请输入题目答案" rows={4} />)}
          </Form.Item>
          <Button type='primary' onClick={answerTest}>
            答案测试
          </Button>
        </Form>
        <Drawer
          title='结果测试'
          placement='right'
          width={820}
          closable={false}
          onClose={onClose}
          visible={sqlTestVisible}
        >
          <Table columns={columns}
        dataSource={tableList} pagination={false}/>
        </Drawer>
      </Modal>
    </div>
  );
};
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
export default WrappedNormalLoginForm;
