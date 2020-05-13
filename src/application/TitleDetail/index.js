import React from 'react'
import { useState, useEffect } from 'react'
import { Input, Button, message, Modal, Result, Spin, Drawer, Table } from 'antd'

import history from '../../util/history'
import {
  getAllTitleID,
  getTitleDetailInfo,
  completeTitle,
  getTitleStatus,
  completePaper,
  submitPaper,
  getResultContrast
} from '../../api/index'
import './index.css'

const { TextArea } = Input
export default () => {
  const [titleList, setTitleList] = useState([])
  const [titleIdList, setTitleIdList] = useState([])
  const [titleName, setTitleName] = useState(null)
  const [paperName, setPaperName] = useState(null)
  const [answer, setAnswer] = useState('')
  const [isLast, setIsLast] = useState(false)
  const [isRight, setIsRight] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [submitStatus, setSubmitStaus] = useState(false)
  const [isSubmitCompleted, setIsSubmitCompleted] = useState(false)
  const [visible, setVisible] = useState(false)

  const [truePerform, setTruePerform] = useState(true);
  const [student_columns, setStudentColumns] = useState([])
  const [student_tableList, setStudentTableList] = useState([])
  const [true_columns, setTrueColumns] = useState([])
  const [true_tableList, setTrueTableList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [score, setScore] = useState(null)

  let params = window.location.href
  let hrefArr = params.split('?').pop()
  hrefArr = hrefArr.split('&')
  const paperId = hrefArr[0]
  const currentTitleId = hrefArr[1]
  const values = {
    paperId
  }
  const values2 = {
    titleId: currentTitleId
  }
  function getAllTitle () {
    getAllTitleID(values).then(res => {
      setTitleList(res.titleList)
      const temTitleArr = []
      res.titleList.map(item => {
        temTitleArr.push(item.titleId)
      })
      const index = temTitleArr.indexOf(Number(currentTitleId))
      if (index === temTitleArr.length - 1) {
        setIsLast(false)
      } else {
        setIsLast(true)
      }
      setTitleIdList(temTitleArr)
    })
    getTitleDetailInfo(values2).then(res => {
      const info = res.info

      setTitleName(info.titleName)
      setPaperName(info.paperName)
    })
    getTitleStatus(values2).then(res => {
      if (res.isComplate) {
        setAnswer(res.submitAnswer)
        setIsRight(res.isRight)
        setIsSubmit(true)
      }
    })
  }
  function getSubjectInfor (titleId) {
    if (currentTitleId == titleId) {
      return
    }
    history.replace(`/main/titleDetail?${paperId}&${titleId}`)
  }
  function renderSheet () {
    return (
      <div className='sheet'>
        {titleList.map(item => {
          return (
            <div
              key={item.titleId}
              className='sheet_item'
              style={{
                backgroundColor:
                  item.titleId == currentTitleId ? 'rgb(37,187,155)' : null,
                color:
                  item.isComplate && item.titleId != currentTitleId
                    ? 'rgb(37,187,155)'
                    : '#ccc'
              }}
              onClick={() => getSubjectInfor(item.titleId)}
            >
              {item.index}
            </div>
          )
        })}
      </div>
    )
  }
  function onChange ({ target: { value } }) {
    setAnswer(value)
  }
  function submitTitle () {
    if (!answer) {
      message.warning('答案不能为空')
      return
    }
    const obj = {
      titleId: currentTitleId,
      answer,
      paperId
    }
    completeTitle(obj).then(res => {
      setIsRight(res.isRight)
      setIsSubmit(true)
      message.success('提交成功')
    })
  }
  function nextTitle () {
    const index = titleIdList.indexOf(Number(currentTitleId))
    history.replace(`/main/titleDetail?${paperId}&${titleIdList[index + 1]}`)
  }
  function modelOk (close) {
    submitPaper(values).then(res => {
      setScore(res.score)
      close()
      setSubmitStaus(true)
      setTimeout(() => {
        setIsSubmitCompleted(true)
      }, 3000)
    })
  }
  function theirPapers () {
    completePaper(values).then(res => {
      if (res.canSubmit) {
        Modal.confirm({
          title: '提示',
          content: '您已完成所有题目，是否交卷?',
          okText: '确认',
          onOk: modelOk,
          cancelText: '取消'
        })
      } else {
        Modal.warning({
          title: '提示',
          content: '您还有题目尚未完成，无法交卷!',
          okText: '确认'
        })
      }
    })
  }
  function toHome () {
    history.replace('/main/student')
  }
  function onClose () {
    setVisible(false)
  }
  function setColumnsAndTableList(info, setColumns, setTableList, kind) {
    if(info.truePerform) {
      const resultList = info.resultList;
      const temColumns = [];
      kind === 'student' && setTruePerform(true)
      if(resultList.length) {
        const obj = resultList[0];
        for(let key in obj) {
         const temObj = {};
         temObj.title = key;
         temObj.dataIndex = key;
         temObj.key = obj[key];
         temColumns.push(temObj);
        }
        setColumns(temColumns);
        setTableList(resultList);
      }
    }else {
      kind === 'student' && setTruePerform(false)
      kind === 'student' && setErrorMessage(info.message)
    }
  }
  function resultContrast () {
    getResultContrast(values2).then(res => {
        setColumnsAndTableList(res.studentInfo, setStudentColumns, setStudentTableList,'student');
        setColumnsAndTableList(res.trueInfo, setTrueColumns, setTrueTableList);
    })
    setVisible(true)
  }
  function openDrawer() {
    return (
      <Drawer
        title='结果比较'
        placement='right'
        closable={false}
        width={1400}
        onClose={onClose}
        visible={visible}
      >
        <div className="drawer_main">
          <div className="drawer_main_student">
            <header>我的执行结果</header>
           { truePerform ? <Table columns={student_columns}
              dataSource={student_tableList} pagination={false}/>
              : <div style={{color:'red', marginTop: '50px'}}>{errorMessage}</div>}
          </div>
          <div className="drawer_main_teacher">
            <header >正确执行结果</header>
            <Table columns={true_columns}
              dataSource={true_tableList} pagination={false}/>
          </div>
        </div>
      </Drawer>
    )
  }
  useEffect(() => {
    getAllTitle()
  }, [])
  return (
    <div className='title_body'>
      {submitStatus ? (
        <main className='success_submit'>
          {!isSubmitCompleted ? (
            <Spin tip='试卷提交中..............' size='large' />
          ) : (
            <Result
              status='success'
              title='提交成功!'
              extra={[
              <div>
                <div style={{marginBottom: "20px", fontSize: "20px"}}>我的分数: {score}分</div>
                <Button type='primary' key='console' onClick={toHome}>
                  返回首页
                </Button>
              </div>

              ]}
            />
          )}
        </main>
      ) : (
        <main className='title_body_main'>
          <div className='title_body_paperName'>{paperName}</div>
          <div className='titile_body_content'>
            <div className='title_body_header'>题目描述：{titleName}</div>
            <div className='title_body_answer'>
              <span className='title_answer'>请输入你的答案:</span>
              <TextArea value={answer} onChange={onChange} rows={3} />
            </div>
            <div className='title_body_foolter'>
              {isSubmit ? (
                <div className='title_result'>
                  <div>
                    答题结果:{' '}
                    {isRight ? (
                      <span style={{ color: 'rgb(82,196,26)' }}>答案正确!</span>
                    ) : (
                      <span style={{ color: 'red' }}>答案错误!</span>
                    )}
                  </div>
                  <Button
                    onClick={resultContrast}
                    style={{ width: '120px' }}
                    type='primary'
                  >
                    结果对比
                  </Button>
                </div>
              ) : null}
              <div className='title_submitPaper'>
                <Button
                  style={{}}
                  onClick={theirPapers}
                  className='title_nextTitle'
                  type='primary'
                >
                  交卷
                </Button>
              </div>
              <div className='title_foolter_btn'>
                <Button
                  onClick={submitTitle}
                  className='title_submit'
                  type='primary'
                >
                  提交本题
                </Button>
                {isLast ? (
                  <Button
                    style={{}}
                    onClick={nextTitle}
                    className='title_nextTitle'
                    type='primary'
                  >
                    下一题
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
          {renderSheet()}
          {openDrawer()}
        </main>
      )}
    </div>
  )
}
