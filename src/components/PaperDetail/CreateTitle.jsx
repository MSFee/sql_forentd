import React, { useState, useEffect, useCallback } from 'react'

import { useLocation } from 'react-router'
import { Divider, Button, List, message } from 'antd'

import { getTitleAll } from '../../api/index'
import history from '../../util/history'
import DeleteListItem from './createTitleItem/DeleteListItem'
import AddListItem from './createTitleItem/AddListItem'
import UpdateListItem from './createTitleItem/UpdateListItem'
import DisplayTitle from './createTitleItem/DisplayTitle'

export default () => {
  const [titleList, setTitleList] = useState([])
  const [issue, setIssue] = useState(0)
  let location = useLocation()
  const paperId = location.pathname.split('/').pop()
  let queryPaperDetail = () => {
    getTitleAll(paperId).then(res => {
      if (res.error == 0) {
        setTitleList(res.titleList)
        setIssue(res.paperInfo.issued)
        
        
      }
    })
  }
  useEffect(() => {
    queryPaperDetail()
  }, [])
  function goBack () {
    history.goBack(-1)
  }
  function setList () {
   
      return (
        <List
          className='demo-loadmore-list'
          itemLayout='horizontal'
          locale = {{emptyText: '当前还没有题目，快去创建吧'}}
          dataSource={titleList}
          renderItem={item => (
            <List.Item
              key={item.titleId}
              actions={!issue ? [
                <UpdateListItem
                  titleId={item.titleId}
                  titleName={item.titleName}
                  answer={item.answer}
                  queryPaperDetail={queryPaperDetail}
                />,
                <DeleteListItem
                  titleId={item.titleId}
                  queryPaperDetail={queryPaperDetail}
                />
              ] : null}
            >
              <div>
                <div>题目名称：{item.titleName}</div> 
                <div>题目答案：{item.answer}</div> 
                <div>该题分数：{item.score}分</div>
              </div>
            </List.Item>
          )}
        />
      )
  }
  return (
    <div>
      <Button
        style={{ float: 'right', width: '80px' }}
        type='primary'
        onClick={goBack}
      >
        返回
      </Button>
      <Divider className='divider' orientation='left'>
        创建试卷题目
      </Divider>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!issue ? <AddListItem queryPaperDetail={queryPaperDetail} /> : null}
        <DisplayTitle
          issue={issue}
          paperId={paperId}
          queryPaperDetail={queryPaperDetail}
        />
      </div>
      <div className='detail-createtitle'>{setList()}</div>
    </div>
  )
}
