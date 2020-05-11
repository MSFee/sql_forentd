import React, {useState,useEffect,useCallback} from 'react';
import { useLocation } from "react-router";
import {Button} from 'antd';

import {getTitleAll} from '../../api/index';
export default (props)=>{
    const [detailMessage,setDetailMessage]=useState({})
    let location=useLocation();
    const paperId=location.pathname.split("/").pop();
    let queryPaperDetail=useCallback(
        () => {
            getTitleAll(paperId).then(res=>{
                
                
                if(res.error==0){
                    setDetailMessage(res.paperInfo);
                    
                }
            })
        },
        [],
    )
    useEffect(() => {
        queryPaperDetail();
    }, [])
    return (
        <div>
            <div>
            <div className="paperdetail-papername">试卷名称</div>
            <div className="paperdetail-name2">{detailMessage.paperName}</div>
            <div className="paperdetail-creattime">创建时间</div>
            <div className="paperdetail-time2">{detailMessage.createTime}</div>
            <div className="paperdetail-creattime">完成人数</div>
            <div className="paperdetail-time2">{detailMessage.count}人</div>
            </div>
            <div>
                {
                     detailMessage.maxScore?
                <div>
                    <div className="paperdetail-papername">最高分:</div>
                    <div className="detail-maxscore">{detailMessage.maxScore}分</div>
                </div>:<div className="detail-maxscore">暂无最高分</div>
                }
            </div>
            <Button type="primary" className="detail-button">详情统计</Button>
        </div>
    )
}
