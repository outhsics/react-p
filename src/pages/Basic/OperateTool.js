import React, { Component } from 'react';

import { Card, Icon, Form, Row, Col, Button, Input, DatePicker, InputNumber } from 'antd';
import { connect } from 'dva';
import styles from './OperateTool.less';

const { RangePicker } = DatePicker;
const { Meta } = Card;



const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1025319_360iia8jjiu.js', // 在 iconfont.cn 上生成
});


@connect(({ operate }) => ({
  operate,
}))
@Form.create()
class OperateTool extends Component {


  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'operate/fetch'
    // })
  }

  save = () => {
    console.log('save');
  }
  cancel = () => {
    console.log('cancel');
  }
  add = () => {
    console.log('add');
  }
  handleSubmit = () => {
    console.log('handleSubmit');
  }

  render() {
    const { getFieldDecorator } = this.props.form;


    return (
      <div className="container">
        <div className={styles.section1}>

          <Row className={styles.row1}>

            <Col span={18}>
              <MyIcon
                className={styles.blue}
                type="icon-number1" />
              <span className={styles.title}>
                文案管理
              </span>
              <div>
                倒计时文本及时间&引流文案

              </div>

            </Col>
            <Col span={6} className={styles.row1_right}>
              <Button style={{ marginRight: 8, width: 120 }} onClick={this.cancel}>
                取消
                    </Button>
              <Button style={{ width: 120 }} type="primary" onClick={this.save}>
                保存
              </Button>

            </Col>


          </Row>
          <Row className={styles.row1}>

            <Col span={8}>
              <Row>
                <Col span={8}>
                  <span styles={{ marginRight: 30 }}>
                    设置中考日期:
              </span>

                </Col>
                <Col span={16}>
                  <DatePicker />


                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={8}>
                  <span styles={{ marginRight: 30 }}>
                    倒计时文本(不超过12个字)：
              </span>

                </Col>
                <Col span={16}>
                  <Input
                    className={styles.input}
                    placeholder="Enter "
                  />

                </Col>
              </Row>
            </Col>


          </Row>

          <Row >

            <Col span={11}>
              <Row>
                <Col span={10}>
                  <span styles={{ marginRight: 30 }}>
                    引流按钮文本(不超过5个字)
              </span>

                </Col>
                <Col span={5}>
                  <Input placeholder={'回复1'} />


                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row>
                <Col span={11}>
                  <span styles={{ marginRight: 30 }}>
                    引流文本(不超过12个字)：
              </span>

                </Col>
                <Col span={13}>
                  <Input
                    className={styles.input}
                    placeholder="  领福利， 免费领取历年真题 "
                  />

                </Col>
              </Row>
            </Col>


          </Row>
        </div>
        <div className={styles.section2}>
          <Row className={styles.row1}>

            <Col span={18}>
              <MyIcon
                className={styles.blue}
                type="icon-number2" />
              <span className={styles.title}>
                专项类型
              </span>
              <div>
                试卷分类显示

              </div>

            </Col>
            <Col span={6} className={styles.row1_right}>

              <Button style={{ width: 120 }} type="primary" onClick={this.add}>

                新增专项
              </Button>

            </Col>


          </Row>
        </div>
        <Row gutter={16} className={styles.cardList}>
          <Col span={8}>
            <Card
              hoverable
              className={styles.card}
              title="听力专项挑战"
              extra={<a href="#">编辑</a>}
            >
              <Meta
                description="slogan:每天20分钟，听清中考英语"
              />
              <div className={styles.card_content}>

                说明文本：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate,

              </div>
              <p>
                按钮：快来挑战吧！
              </p>
              <p>
                人数基础：1234人
              </p>
            </Card>

          </Col>
          <Col span={8}>
            <Card
              hoverable
              className={styles.card}
              title="听力专项挑战"
              extra={<a href="#">编辑</a>}
            >
              <Meta
                description="slogan:每天20分钟，听清中考英语"
              />
              <div className={styles.card_content}>

                说明文本：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate,

              </div>
              <p>
                按钮：快来挑战吧！
              </p>
              <p>
                人数基础：1234人
              </p>
            </Card>

          </Col>
          <Col span={8}>
            <Card
              hoverable
              className={styles.card}
              title="听力专项挑战"
              extra={<a href="#">编辑</a>}
            >
              <Meta
                description="slogan:每天20分钟，听清中考英语"
              />
              <div className={styles.card_content}>

                说明文本：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate,

              </div>
              <p>
                按钮：快来挑战吧！
              </p>
              <p>
                人数基础：1234人
              </p>
            </Card>

          </Col>

        </Row>

        <div className={styles.editContent}>

          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>

                <Form.Item
                  label="专项名称"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 17 }}
                >
                  {getFieldDecorator('note', {
                    rules: [{ required: true, message: 'Please input your note!' }],
                  })(
                    <Input placeholder={'专项训练名称（不超过10个字）'} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="slogon"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 17 }}
                >
                  {getFieldDecorator('gender', {
                    rules: [{ required: true, message: 'Please select your gender!' }],
                  })(
                    <Input placeholder={'输入该专项训练的slogan（不超过12个字）'} />

                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="专项说明文本"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 17 }}
                >
                  {getFieldDecorator('note', {
                    rules: [{ required: true, message: 'Please input your note!' }],
                  })(
                    <Input.TextArea placeholder={'专项说明文本（0/180）'} rows={8} />
                  )}
                </Form.Item>

              </Col>
              <Col span={12}>
                <Row>
                  <Form.Item
                    label="按钮"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                  >
                    {getFieldDecorator('note', {
                      rules: [{ required: true, message: 'Please input your note!' }],
                    })(
                      <Input placeholder={'输入该专项训练的按钮文本（不超过12个字）!'} />
                    )}
                  </Form.Item>

                </Row>
                <Row>

                  <Form.Item
                    label="该专项练习人数基数:"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 14 }}

                  // wrapperCol={{ span: 12 }}
                  >
                    {getFieldDecorator('note', {
                      rules: [{ required: true, message: 'Please input your note!' }],
                    })(
                      <InputNumber min={1} max={100000} />
                    )}
                  </Form.Item>

                </Row>
                <Row style={{ paddingRight: '45px', textAlign: 'right' }}>
                  <Button style={{ width: 120 }} onClick={this.add} style={{ marginRight: '30px' }}>
                    取消
                  </Button>
                  <Button style={{ width: 120 }} type="primary" onClick={this.add}>
                    新增专项
                  </Button>
                </Row>
              </Col>


            </Row>
          </Form>

        </div>
      </div>
    )
  }
}


export default OperateTool;