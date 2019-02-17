import React, { Component } from 'react';
import moment from 'moment';
import { message, Card, Icon, Form, Row, Col, Button, Input, DatePicker, InputNumber } from 'antd';
import { connect } from 'dva';
import styles from './WritingConfig.less';
// import cloneDeep from 'lodash/cloneDeep';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1025319_360iia8jjiu.js', // 在 iconfont.cn 上生成
});
function onChange(date, dateString) {
  console.log(date, dateString);
}

const validator12 = (rule, value, callback) => {
  if (value.length > 12) {
    callback('字数不得超过12');
  }
  callback();
};

const validator5 = (rule, value, callback) => {
  if (value.length > 5) {
    callback('字数不得超过5');
  }
  callback();
};

@connect(({ operate }) => ({
  operate,
}))
@Form.create({ name: 'writ_config_form' })
class WritingConfig extends Component {
  cbSuccess = () => {
    message.success('保存成功');
    this.handleReset();
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        examDate: fieldsValue['examDate'].toDate().getTime(),
      };
      // debugger;
      // console.log('Received values of form: ', values);

      dispatch({
        type: 'operate/addConfig',
        payload: values,
        callback: this.cbSuccess,
      });
    });
  };

  initForm = operateInfo => {
    if (operateInfo) {
      this.props.form.setFieldsValue({
        id: operateInfo.id,
        examDate: moment(operateInfo.examDate),
        timerTitle: operateInfo.timerTitle,
        attractButton: operateInfo.attractButton,
        attractTitle: operateInfo.attractTitle,
      });
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operate/fetchConfigInfo',
      callback: this.initForm,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { operate } = this.props;
    const { operateInfo } = operate;

    return (
      <div>
        {operateInfo && (
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={18}>
                <MyIcon className={styles.blue} type="icon-number1" />
                <span className={styles.title}>文案管理</span>
                <div>倒计时文本及时间&引流文案</div>
              </Col>
              <Col span={6} className={styles.row1_right}>
                <Button style={{ marginRight: 8, width: 120 }} onClick={this.handleReset}>
                  取消
                </Button>
                <Button style={{ width: 120 }} htmlType="submit" type="primary">
                  保存
                </Button>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <Form.Item label="设置中考日期:" labelCol={{ span: 12 }} wrapperCol={{ span: 11 }}>
                  {getFieldDecorator('examDate', {
                    rules: [{ required: true, message: '请选择时间!' }],
                  })(<DatePicker showTime placeholder="请选择" format="YYYY-MM-DD" />)}
                </Form.Item>

                <Form.Item>{getFieldDecorator('id', {})(<Input hidden />)}</Form.Item>
              </Col>

              <Col span={15}>
                <Form.Item
                  label="倒计时文本(不超过12个字):"
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 11 }}
                >
                  {getFieldDecorator('timerTitle', {
                    rules: [
                      { required: true, message: '(不超过12个字)!' },
                      { validator: validator12 },
                    ],
                  })(<Input placeholder="距离2019年福建中考" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <Form.Item
                  label="引流按钮文本（不超过5个字）:"
                  labelCol={{ span: 16 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('attractButton', {
                    rules: [
                      { required: true, message: '（不超过5个字)' },
                      { validator: validator5 },
                    ],
                  })(<Input placeholder="回复“1”" />)}
                </Form.Item>
              </Col>

              <Col span={15}>
                <Form.Item
                  label="引流文本（不超过12个字):"
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 11 }}
                >
                  {getFieldDecorator('attractTitle', {
                    rules: [
                      { required: true, message: '（不超过12个字)' },
                      { validator: validator12 },
                    ],
                  })(<Input placeholder="领福利， 免费领取历年真题" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    );
  }
}

export default WritingConfig;
