import React, { useState } from 'react'
import { Form, Input, Button, Modal, message, Drawer, Table } from 'antd'
import { useLocation } from 'react-router'

import { createTitle, getTestAnswer } from '../../../api/index'
const { TextArea } = Input
const NormalLoginForm = props => {
  const { queryPaperDetail } = props
  let location = useLocation()
  const paperId = location.pathname.split('/').pop()
  const { getFieldDecorator, setFieldsValue } = props.form
  const [visible, setVisible] = useState(false)
  const [sqlTestVisible, setSqlTestVisible] = useState(false)
  const [columns, setColumns] = useState([])
  const [tableList, setTableList] = useState([])
  const [answerTrue, setAnswerTrue] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  function showModal () {
    setFieldsValue({
      titleName: '',
      answer: '',
      score: ''
    })
    setVisible(true)
  }
  function handleCancel () {
    setVisible(false)
  }
  function handleSubmit (e) {
    e.preventDefault()
    props.form.validateFields(async (err, values) => {
      if (!err) {
        values.paperId = paperId

        createTitle(values).then(res => {
          if (res.error == 0) {
            message.success(res.message)
            queryPaperDetail()
            setVisible(false)
          } else {
            message.error(res.message)
          }
        })
      }
    })
  }
  const checkScore = (rule, value) => {
    if (!value) {
      return Promise.reject('分数不能为空')
    }
    if (typeof Number(value) === 'number') {
      if (Number(value) > 100 || Number(value) <= 0) {
        return Promise.reject('分数大小为1-99')
      } else {
        return Promise.resolve()
      }
    } else {
      return Promise.reject('只能填写数字')
    }
  }
  function answerTest () {
    const answer = props.form.getFieldValue('answer')
    if (!answer) {
      message.warning('请输入sql语句')
      return
    }
    const postValue = {
      answer
    }
    getTestAnswer(postValue).then(res => {
      if (res.normalOperation) {
        const resultList = res.resultList
        const temColumns = []
        if (resultList.length) {
          const obj = resultList[0]
          for (let key in obj) {
            const temObj = {}
            temObj.title = key
            temObj.dataIndex = key
            temObj.key = obj[key]
            temColumns.push(temObj)
          }
        }
        setColumns(temColumns)
        setTableList(resultList)
        setAnswerTrue(true)
      } else {
        setErrMessage(res.message)
        setAnswerTrue(false)
      }
    })
    setSqlTestVisible(true)
  }
  function onClose () {
    setSqlTestVisible(false)
  }
  return (
    <div className='product-header'>
      <div style={{ textAlign: 'right', marginRight: '10px' }}>
        <Button icon='plus-square' type='primary' onClick={showModal}>
          添加题目
        </Button>
      </div>
      <Modal
        title='增加题目详细信息'
        visible={visible}
        okText='添加'
        cancelText='取消'
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form className='login-form'>
          <Form.Item>
            {getFieldDecorator('titleName', {
              rules: [{ required: true, message: '题目不能为空' }]
            })(<Input placeholder='输入题目描述' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('score', {
              rules: [{ validator: checkScore }]
            })(<Input placeholder='请输入分数' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('answer', {
              rules: [{ required: true, message: '答案不能为空' }]
            })(<TextArea placeholder='请输入题目答案' rows={4} />)}
          </Form.Item>
          <Button type='primary' onClick={answerTest}>
            答案测试
          </Button>
        </Form>
        <Drawer
          title='结果测试'
          placement='right'
          width={820}
          closable={false}
          onClose={onClose}
          visible={sqlTestVisible}
        >
          {answerTrue ? (
            <Table
              columns={columns}
              dataSource={tableList}
              pagination={false}
            />
          ) : (
            <div style={{ color: 'red' }}>{errMessage}</div>
          )}
        </Drawer>
      </Modal>
    </div>
  )
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
)
export default WrappedNormalLoginForm
