import React, { useEffect, useState } from 'react'
import { Collapse, Pagination, Button } from 'antd'

import { getAllComplatePaper } from '../../api/index'
import history from '../../util/history'
import './index.css'

const { Panel } = Collapse

const obj = {
  page: 1
}
export default () => {
  const [paperList, setPaperList] = useState([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  function onChange () {}
  function callback (key) {
    console.log(key)
  }
  useEffect(() => {
    getPaperList()
  }, [])
  function getPaperList () {
    const values = {
      page: obj.page
    }
    getAllComplatePaper(values).then(res => {
      setPaperList(res.list)
      setTotal(res.total)
    })
  }
  return (
    <div className='record'>
      <div className='record_main'>
        <header className='record_header'>
          <div className='record_header_title'>已完成的试卷</div>
          <Button onClick={() => history.goBack(-1)} type='primary'>
            返回
          </Button>
        </header>

        <div className='record_content'>
          <Collapse defaultActiveKey={['1']} onChange={callback}>
            {paperList.map(item => {
              return (
                <Panel header={item.paperName} key={item.paperId}>
                  <p>完成时间：{item.complateTime}</p>
                  <p>最高分：{item.maxScore}分</p>
                  <p>我的排名：第{item.ranking}名</p>
                  <p>我的分数：{item.score}分</p>
                </Panel>
              )
            })}
          </Collapse>
        </div>
        <Pagination
          style={{ float: 'right', marginTop: '20px' }}
          onChange={page => {
            setCurrent(page)
            obj.page = page
            getPaperList()
          }}
          current={current}
          total={total}
          pageSize={5}
        />
      </div>
    </div>
  )
}
