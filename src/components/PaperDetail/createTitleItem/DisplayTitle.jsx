import React, { Fragment } from 'react';

import {Button, message} from 'antd';

import {displayTitle, getQueryPaperHaveCompalte, getQueryPaperCanPublic} from '../../../api/index';
export default (props) => {
    let {paperId,issue,queryPaperDetail}=props;
    const value = {
        paperId,
    }
    function release(){
        getQueryPaperCanPublic(value).then(res => {
            if(!res.canPublic) {
                message.warning('不能发布空试卷')
            }else {
                issue = 1;
                queryData();
            }
        })
    }
    function publication() {
        getQueryPaperHaveCompalte(value).then(res => {
            if(res.hasComplate) {
                message.warning(res.message)
            }else {
                issue = 0;
                queryData();
            }
        })
    }
    function queryData() {
        displayTitle({
            paperId:paperId,
            issued:issue
        }).then(res=>{
            if(res.error==0){
                message.success(res.message);
                queryPaperDetail();
            }else{
                message.error(res.message);
            }
        })
    }
    function setNation(){
        if(issue){
            return (<Button icon="download" type="primary" onClick={publication}>
            撤销发布
          </Button>)
        }else{
            return (<Button icon="upload" type="primary" onClick={release}>
            发布试卷
          </Button>)
    }
}
  return (
      <Fragment>
        {setNation()}
    </Fragment>
  );
}
