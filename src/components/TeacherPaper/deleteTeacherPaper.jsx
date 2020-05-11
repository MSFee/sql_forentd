import React,{Fragment} from 'react';

import {Icon,Modal,Tooltip, message} from 'antd';

import {deleteTeacherPaper} from '../../api/index'
const text = <span>删除试卷</span>;
export default props => {
  const { index, query } = props;
  function onMadal(index) {
    return () => {
      Modal.confirm({
        content: "你确定是否删除吗",
        okText: "删除",
        cancelText: "取消",
        onOk: deleteProductFun(index)
      });
    };
  }
  function deleteProductFun(index) {
    return  ()=> {
       deleteTeacherPaper(index).then(res=>{
         if(res.error==0){
           message.success(res.message)
           query();
         }else{
           message.error(res.message);
         }
       })
    };
  }
  return (
    <Fragment>
      <Tooltip placement="bottom" title={text}>
        <Icon
          className="delete"
          type="delete"
          key="delete"
          onClick={onMadal(index)}
          className="delete"
        />
      </Tooltip>
    </Fragment>
  );
};
