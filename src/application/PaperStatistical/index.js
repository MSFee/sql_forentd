import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import { useLocation } from "react-router";


import './index.css'
import history from "../../util/history";
import { getPaperComplateInfo } from "../../api/index";
const columns = [
    {
        title: '学生姓名',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: '完成时间',
        dataIndex: 'complateTime',
        key: 'complateTime',
    },
    {
        title: '分数',
        dataIndex: 'score',
        key: 'score',
    },
    {
        title: '学校',
        dataIndex: 'school',
        key: 'school',
    },
    {
        title: '专业',
        dataIndex: 'professional',
        key: 'professional',
    }
]
export default () => {
    const [rank, setRank] = useState(null)
    const [tableList, setTableList] = useState([])
    let location = useLocation();
    const paperId = location.pathname.split("/").pop(); 
    const values = {
        paperId,
    }
    function getData() {
        getPaperComplateInfo(values).then(res => {
            setRank(res.pass)
            setTableList(res.studentList)
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="paperStatistical">
            <div className="paperStatistical_main">
                 <header className="paperStatistical_main_pass">

                {rank ?  <span>及格率: {rank}%</span>:  <span>及格率:暂无</span>}
                 <Button onClick={() => {history.goBack(-1)}} type="primary">返回</Button>
                 </header>
                 <div>
                     <h1 className="topTen">前十学生信息</h1>
                 <Table dataSource={tableList} columns={columns} />
                 </div>
            </div>
        </div>
    )
}