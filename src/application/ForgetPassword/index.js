import React, { useState, useEffect } from 'react'
import { Steps, Form, Input, Icon, Radio, Button, message, Result } from 'antd'
import './index.css'

import { checkInfo, getValideImg, checkEmail, getChangePassword } from '../../api/index'
import history from "../../util/history";
const { Step } = Steps
let ForgetPassword = props => {
  const { form } = props

  const [value, setValue] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [step, setStep] = useState(0)
  const [current, setCurrent] = useState(0)
  const [imgUrl, setImgUrl] = useState('')
  const [validateCode, setValidateCode] = useState('')
  const [codeValue, setCodeValue] = useState('')
  const [password, setPassword] = useState('')
  const [confimPassword, setConfimPassword] = useState('')
  const [id, setId] = useState('asdasa')

  const { getFieldDecorator } = form
  function getValidate () {
    getValideImg().then(res => {
      setImgUrl(res.url)
      setValidateCode(res.value)
    })
  }

  useEffect(() => {
    getValidate()
  }, [])
  function submit () {
    form.validateFields((err, values) => {
      if (!err) {
        values.status = value
        if (values.valideCode !== validateCode) {
          message.error('验证码错误')
          return
        }
        setId(values.status === 0 ? values.studentId : values.workNumber)
        checkInfo(values).then(res => {
          if (res.error === 0) {
            setStep(step + 1)
            setCurrent(current + 1)
          } else {
            message.error(res.message)
          }
        })
      }
    })
  }
  function showHidden () {
    if (value === 0) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }
  function handleChange (e) {
    setValue(e.target.value)
    form.resetFields()
    getValidate()
    showHidden()
  }
  function validateSubmit () {
    const values = {
      code: codeValue
    }
    checkEmail(values).then(res => {
      if (res.error === 0) {
        setStep(step + 1)
        setCurrent(current + 1)
      } else {
        message.error('验证码不正确')
      }
    })
  }
  function onInputChange (e) {
    setCodeValue(e.target.value)
  }
  function passwordChange(e) {
    setPassword(e.target.value)
  }
  function confirmPasswordChange(e) {
    setConfimPassword(e.target.value)
  }
  function submitPassword() {
      if(!password || !confimPassword) {
        message.error("密码不能为空")  
        return
      }
      if(password !== confimPassword) {
          message.error('两次密码不一致')
          return
      }
      const values = {
          id: id,
          status: value,
          password: password
      }
      getChangePassword(values).then(res => {
          if(res.error === 0) {
            setStep(step + 1)
            setCurrent(current + 1)
          }else {
            message.error(res.message)
          }
      })
  }
  function render () {
    if (current === 0) {
      return (
        <Form>
          <Form.Item>
            <Radio.Group value={value} onChange={handleChange}>
              <Radio value={0}>我是学生</Radio>
              <Radio value={1}>我是教师</Radio>
            </Radio.Group>
          </Form.Item>
          {!isShow ? (
            <Form.Item>
              {getFieldDecorator('studentId', {
                rules: [
                  {
                    required: true,
                    message: '学号不能为空!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='请输入学号'
                />
              )}
            </Form.Item>
          ) : (
            <Form.Item>
              {getFieldDecorator('workNumber', {
                rules: [
                  {
                    required: true,
                    message: '工号不能为空!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='请输入工号'
                />
              )}
            </Form.Item>
          )}
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '请输入合法的邮箱!'
                },
                {
                  required: true,
                  message: '请输入邮箱!'
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='邮箱'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('valideCode', {
              rules: [
                {
                  required: true,
                  message: '请输入验证码!'
                }
              ]
            })(
              <div className='valideCode'>
                <div className='valideCodeInput'>
                  <Input
                    prefix={
                      <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='请输入验证码'
                  />
                </div>
                <div
                  onClick={() => {
                    getValidate()
                  }}
                  className='valideCodeImg'
                  dangerouslySetInnerHTML={{ __html: imgUrl }}
                ></div>
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={submit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      )
    } else if (current === 1) {
      return (
        <div>
          <div>
            <span> 验证码已经发送到您的邮箱</span>
            <Input
              value={codeValue}
              onChange={onInputChange}
              style={{ marginTop: '20px' }}
              placeholder='请输入邮箱中的校验码'
            ></Input>
          </div>
          <Button
            type='primary'
            style={{ marginTop: '20px' }}
            onClick={validateSubmit}
          >
            提交
          </Button>
        </div>
      )
    } else if (current === 2) {
      return (
        <div className="passwordForm">
          <Input.Password value={password} onChange={passwordChange} placeholder="请输入新密码" />
          <Input.Password value={confimPassword} onChange={confirmPasswordChange} placeholder="确认密码"/>
          <Button type="primary" onClick={submitPassword}>确定</Button>
        </div>
      )
    }else {
        return (
            <Result
            status="success"
            title="密码重置成功!"
            extra={[
              <Button type="primary" key="console" onClick={() => history.push('/login')}>
                去登陆
              </Button>,
            ]}
          />
        )
    }
  }
  return (
    <div className='forgetPassword'>
      <div className='forgetPassword_main'>
        <Steps current={step}>
          <Step title='验证信息' />
          <Step title='验证邮箱' />
          <Step title='重置密码' />
          <Step title='重置成功' />
        </Steps>
        <div className='forget_form'>{render()}</div>
      </div>
    </div>
  )
}

const ForgetPasswordForm = Form.create({ name: 'forget_password' })(
  ForgetPassword
)
export default ForgetPasswordForm
