import React, { useState } from "react";
import {  Input,Icon, Modal, message } from "antd";

import {createTeacherPaper} from '../../api/index'
export default props=> {
  const { query }=props;
  const [visible, setVisible] = useState(false);
  const [paperTitle,setPaperTitle]=useState("")
  function showModal() {
    setVisible(true);
  }
  function handleCancel() {
    setVisible(false);
  }
  function handleSubmit(e) {
      createTeacherPaper({paperName:paperTitle}).then(res=>{
        if(res.error==0){
          message.success(res.message);
          query();
        }else{
          message.error(res.message)
        }
      })
      setVisible(false);
      setPaperTitle("");
  }
  function handleChangePaperTitle(e){
    setPaperTitle(e.target.value);
  }

  return (
    <div className="project-header">
      <div className="project-addproject-item" onClick={showModal}>
        <Icon type="plus-circle" />
        <div>新建试卷</div>
      </div>
      <Modal
        title="请输入试卷名称"
        visible={visible}
        okText="添加"
        cancelText="取消"
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
       <Input value={paperTitle} onChange={handleChangePaperTitle}/>
      </Modal>
    </div>
  );
}
