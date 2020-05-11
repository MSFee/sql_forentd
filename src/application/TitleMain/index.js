import React from 'react';
import {useState, useEffect} from 'react';
import { useLocation } from "react-router";
import {Button} from 'antd';
import './index.css';

import history from "../../util/history";
import { getPaperInfo, getPaperBeenCompleted } from "../../api/index";

export default () => {
    const [paperName, setPaperName] = useState(null);
    const [createTime, setCreateTime] = useState(null);
    const [count, setCount] = useState(0);
    const [maxScore, setMaxScore] = useState(null);
    const [titleTotal, setTitleTotal] = useState(0);
    const [firstTitleId, setFirstTitleId] = useState(0);
    const [isComplate, setIsComplate] = useState(false);
    let location = useLocation();
    const paperId = location.pathname.split("/").pop(); 
    const values = {
        paperId,
    }
    function getPaperDetail() {
        getPaperInfo(values).then(res => {
            const info = res.info;
            setPaperName(info.paperName);
            setCreateTime(info.createTime);
            setCount(info.count);
            setMaxScore(info.maxScore);
            setTitleTotal(info.titleTotal);
            setFirstTitleId(info.firstTitleId);
        });
        getPaperBeenCompleted(values).then(res => {
            if(res.isComplate) {
                setIsComplate(true)
            }
        })
    }
    useEffect(() => {
        getPaperDetail();
    }, []);
    function toTitleDetail(){
        history.push(`/main/titleDetail?${paperId}&${firstTitleId}`)
    }
    return (
        <div className="paper_main">
            <div className="paper_body">
                <header className="paper_body_header">{paperName}</header>
                <main>
                    <div className="paper_body_createTime">创建时间：{createTime}</div>
                    <div className="paper_body_count">总完成次数：{count ? count : 0}次</div>
                    <div className="paper_body_maxScore">最高分：{maxScore ? maxScore : '暂无最高'}分</div>
                    <div className="paper_body_titleTotal">题目总数：{titleTotal}</div>
                </main>
               { !isComplate ? <Button className="paper_body_btn" type="primary" onClick={toTitleDetail}>开始答题</Button>: 
               <div className="paper_body_complate">您已完成本试卷 <Button onClick={() => history.goBack(-1)} width="50" type="primary">返回</Button>   </div>}
            </div>
        </div>
    )
}