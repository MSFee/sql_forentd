import React, { useState, useEffect } from "react";

import { Table, Button, Form, Input, Icon, Radio, message } from "antd";

import history from "../../util/history";

import { getStudentPaper } from "../../api/index";

import "./index.css";

const columns = [
  {
    title: "试卷名称",
    dataIndex: "paperName",
    key: "paperName",
    width: "30%",
  },
  {
    title: "创建老师",
    dataIndex: "userName",
    key: "userName",
    width: "20%",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: "20%",
  },
  {
    title: "操作",
    dataIndex: "paperId",
    key: "paperId",
    width: "10%",
    render: (text, record) => {
      return <a key={text} onClick={() => toAnswer(record.paperId)}>开始答题</a>;
    },
  },
];

function toAnswer(paperId) {
  history.push(`/main/answerTitle/${paperId}`)
}

let StudentMainNormal = (props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [current, setCurrent] = useState(0);
  const { getFieldDecorator } = props.form;

  useEffect(() => {
    getStudentPaper().then((res) => {
      if (res.error == 0) {
        setData(res.list);
        setTotal(res.page);
        setPageSize(res.size);
        setCurrent(res.page);
      }
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        if (values.accordSelect == 1) {
          values.accordTime = 1;
          delete values.accordSelect;
          getStudentPaper(values).then((res) => {
            console.log(res);
            if (res.error == 0) {
              setData(res.list);
              setTotal(res.total);
              setPageSize(res.size);
              setCurrent(res.page);
            }
          });
        } else if (values.accordSelect == 2) {
          values.accordHeat = 1;
          delete values.accordSelect;
          getStudentPaper(values).then((res) => {
            console.log(res);
            if (res.error == 0) {
              setData(res.list);
              setTotal(res.total);
              setPageSize(res.size);
              setCurrent(res.page);
            }
          });
        } else {
          delete values.accordSelect;
          getStudentPaper(values).then((res) => {
            console.log(res);
            if (res.error == 0) {
              setData(res.list);
              setTotal(res.total);
              setPageSize(res.size);
              setCurrent(res.page);
            }
          });
        }
      }
    });
  }

  return (
    <div className="studentmain-main">
      <div className="studentmain-sub">
        <div>
          <Form className="studentmain-form" onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator("accordSelect", { valuePropName: "checked" })(
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  {/* <Radio.Button value="">正常</Radio.Button> */}
                  <Radio.Button value="1">最新</Radio.Button>
                  <Radio.Button value="2">最热</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  {
                    required: true,
                    message: "请输入你筛选的老师",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="筛选老师"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("school", {
                rules: [
                  {
                    required: true,
                    message: "请输入你要筛选的学校",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="筛选学校"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                筛选
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ total: total, pageSize: pageSize, current: current }}
      />
    </div>
  );
};
const StudentMainFormNormal = Form.create({ name: "student_main" })(
  StudentMainNormal
);
export default StudentMainFormNormal;
