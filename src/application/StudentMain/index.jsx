import React, { useState, useEffect } from "react";

import { Table, Button, Form, Input, Icon, Radio, List, Card  } from "antd";

import history from "../../util/history";

import { getStudentPaper } from "../../api/index";

import "./index.css";
const { Meta } = Card;
const obj = {
  page: 1,
  size: 10
}
function toAnswer(paperId) {
  history.push(`/main/answerTitle/${paperId}`)
}

let StudentMainNormal = (props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const [current, setCurrent] = useState(1);
  const [currentSelect, setCurrentSelect] = useState(null)
  const {form} = props;
  const { getFieldDecorator } = props.form;

  useEffect(() => {
    getData({})
  }, []);
  const onReset = () => {
    form.resetFields();
  };
  function getData(values) {
    values.page = obj.page;
    values.size = obj.size;
    getStudentPaper(values).then((res) => {
      if (res.error == 0) {
        setData(res.list);
        setTotal(res.total);
        setPageSize(res.size);
        setCurrent(res.page);
      }
    });
  }
  function handleSubmit(e) {
    e && e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if(currentSelect === 1) {
           latest()
        }else if(currentSelect === 2) {
          hottest()
        }else {
          getData(values)
        }
      }
    });
  }
  function screening(obj) {
    const school = form.getFieldValue('school');
    const userName = form.getFieldValue("userName");
    if(school) {
       obj.school = school;
    }
    if(userName) {
      obj.userName = userName;
    }
    getData(obj);
  }
  function latest() {
    screening({accordHeat: 1})
    setCurrentSelect(1)
  }
  function hottest() {
    screening({accordTime: 1})
    setCurrentSelect(2)
  }
  return (
    <div className="studentmain-main">
      <div className="studentmain-sub">
        <div >
           <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="1" onClick={latest}>最新</Radio.Button>
                  <Radio.Button value="2" onClick={hottest}>最热</Radio.Button>
                </Radio.Group>
          <Form className="studentmain-form" onSubmit={handleSubmit}>

            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  {
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
            <Form.Item>
              <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="display_card">
      {/* <Table
        columns={columns}
        dataSource={data}
        pagination={{ total: total, pageSize: pageSize, current: current }}
      /> */}
      <List
          pagination={{
            onChange: page => {
              if(page === obj.page) {
                return;
              }
              obj.page = page
              handleSubmit()
            },
            total,
            current,
            pageSize: obj.size,
          }}
          grid={{
            gutter: 290,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
            xl: 5,
            xxl: 4,
          }}
        dataSource={data}
        renderItem = {item => (
          <List.Item
            key={item.paperId}
          >
             <Card
             onClick={() => toAnswer(item.paperId)}
              hoverable
              style={{ width: 250 }}
              cover={<img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyvOogWrVUxtF7GI-3-vefoqS8dHAiERkPkXc3Q2txyvlFkNuv&usqp=CAU" />}
            >
              <Meta title={item.paperName} description={`${item.school}-${item.userName}`} />
            </Card>
          </List.Item>
        )} 
      />
      </div>
    </div>
  );
};
const StudentMainFormNormal = Form.create({ name: "student_main" })(
  StudentMainNormal
);
export default StudentMainFormNormal;
