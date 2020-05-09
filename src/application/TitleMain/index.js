import React from 'react';
import {useState, useEffect} from 'react';
import { useLocation } from "react-router";
import {Button} from 'antd';
import './index.css';

import history from "../../util/history";
import { getPaperInfo } from "../../api/index";

export default () => {
    const [paperName, setPaperName] = useState(null);
    const [createTime, setCreateTime] = useState(null);
    const [count, setCount] = useState(0);
    const [maxScore, setMaxScore] = useState(null);
    const [titleTotal, setTitleTotal] = useState(0);

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
        });
    }
    useEffect(() => {
        getPaperDetail();
    }, []);
    function toTitleDetail(){
        history.push(`/main/titleDetail?pid = ${paperId}&tid = 12135`)
    }
    return (
        <div className="paper_main">
            <div className="paper_body">
                <header className="paper_body_header">{paperName}</header>
                <main>
                    <div className="paper_body_createTime">创建时间：{createTime}</div>
                    <div className="paper_body_count">总完成次数：{count}</div>
                    <div className="paper_body_maxScore">最高分：{maxScore}</div>
                    <div className="paper_body_titleTotal">题目总数：{titleTotal}</div>
                </main>
                <Button className="paper_body_btn" type="primary" onClick={toTitleDetail}>开始答题</Button>
            </div>
        </div>
    )
}