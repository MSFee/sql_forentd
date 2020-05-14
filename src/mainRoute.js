import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { Popover, Avatar, message } from 'antd'

//教师端
import TeacherMain from './application/TeacherMain'
import PaperDetail from './application/PaperDetail'

//学生端
import StudentMain from './application/StudentMain'
import TitleMain from './application/TitleMain'
import TitleDetail from './application/TitleDetail'
import PaperStatistical from './application/PaperStatistical'

import HisrotyRecord from './application/HisrotyRecord'

import history from './util/history'

const content = (
  <div className='header_menu' style={{ cursor: 'pointer' }}>
    {localStorage.getItem('status') == 0 ? (
      <p onClick={historyRecord}>历史记录</p>
    ) : null}
    <p onClick={loginOutFunc}>退出登录</p>
  </div>
)

function historyRecord () {
  history.push('/main/hisrotyRecord')
}

function loginOutFunc () {
  localStorage.clear()
  message.success('退出登录成功', 3)
  history.push('/login')
}
export default () => {
  return (
    <div>
      <div className='main-navbar'>
        <span style={{color: "#ccc",marginRight: "20px"}}>欢饮您：{localStorage.getItem('userName')}</span>
        <Popover placement='bottomRight' content={content} trigger='hover'>
          <Avatar className='loginout' size='large' icon='user' />
        </Popover>
      </div>
      <Switch>
        <Route exact path='/main/teacher' component={TeacherMain} />
        <Route
          path='/main/teacher/paperdetail/:paperId'
          component={PaperDetail}
        />
        <Route path='/main/student' component={StudentMain} />
        <Route path='/main/answerTitle' component={TitleMain} />
        <Route path='/main/titleDetail' component={TitleDetail} />
        <Route path='/main/paperStatistical' component={PaperStatistical} />
        <Route path='/main/hisrotyRecord' component={HisrotyRecord} />
      </Switch>
    </div>
  )
}
