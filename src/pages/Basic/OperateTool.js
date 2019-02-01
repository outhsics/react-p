import React, { Component, Fragment } from 'react';

import { Card, Icon, Form, Row, Col, Button, Input, DatePicker, InputNumber } from 'antd';
import { connect } from 'dva';
import styles from './OperateTool.less';
import WritingConfig from './WritingConfig'

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

  constructor(props) {
    super(props);
    this.state = {
      currentSpecial: {}
    };
  }


  componentDidMount() {
    this.loadSpecialList()
  }

  loadSpecialList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'operate/fetchSpecialList'
    })
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }


  handleEdit = (v) => {
    console.log(this)
    console.log(v, 'v')
    this.setState({
      currentSpecial: v
    })
  }

  render() {
    const { operate } = this.props;
    const { specialList } = operate;
    // debugger
    const { getFieldDecorator } = this.props.form;


    return (
      <Fragment>
        <WritingConfig />
        <div className="container">

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

                <Button
                  htmlType="submit"
                  style={{ width: 120 }} type="primary">

                  新增专项
              </Button>

              </Col>


            </Row>
          </div>


          <Row gutter={16} className={styles.cardList}>
            {specialList && specialList.map(item => {
              return <Col span={8} key={item.id}>
                <Card
                  className={styles.card}
                  title={item.title}
                  extra={<a onClick={this.handleEdit.bind(this, item)} >编辑</a>}
                >
                  <Meta
                    description={item.slogan}
                  />
                  <div className={styles.card_content}>

                    {item.content}
                  </div>
                  <p>
                    {item.button}
                  </p>
                  <p>
                    人数基础：{item.peopleBase} 人
                  </p>
                </Card>

              </Col>
            })}
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
                    {getFieldDecorator('name', {
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
                    {getFieldDecorator('content', {
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
                      {getFieldDecorator('button', {
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
                    >
                      {getFieldDecorator('peopleBase', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                      })(
                        <InputNumber min={1} max={100000} />
                      )}
                    </Form.Item>

                  </Row>
                  <Row style={{ paddingRight: '45px', textAlign: 'right' }}>
                    <Button style={{ width: 120 }} onClick={this.handleReset} style={{ marginRight: '30px' }}>
                      取消
                  </Button>
                    <Button
                      htmlType="submit"
                      style={{ width: 120 }} type="primary" >
                      新增专项
                  </Button>
                  </Row>
                </Col>


              </Row>
            </Form>

          </div>
        </div>
      </Fragment>

    )
  }
}


export default OperateTool;