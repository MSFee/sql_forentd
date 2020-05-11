import React from 'react';
import {message,Modal} from 'antd';

import {deleteTitle} from '../../../api/index'
export default (props)=>{
    const {titleId,queryPaperDetail}=props;
    
    function onMadal(index){
        return ()=>{
            Modal.confirm({
                content: "你确定是否删除吗",
                okText: "删除",
                cancelText: "取消",
                onOk: deleteListItem(index)
            })
        }
    }
    function deleteListItem(id){
        return ()=>{
          deleteTitle(id).then(res=>{
              if(res.error==0){
                  message.success(res.message);
                  queryPaperDetail();
              }else{
                  message.error(res.message)
              }
              
          })
        }
    }
    return (
        <div>
            <a key="list-loadmore-more" onClick={onMadal(titleId)}>删除</a>
        </div>
    )
}