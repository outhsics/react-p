import React, { Component } from 'react'

import { Card, Icon, Form, Row, Col, Button, Input, DatePicker, InputNumber } from 'antd';
import { connect } from 'dva';
import styles from './WritingConfig.less';



const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1025319_360iia8jjiu.js', // 在 iconfont.cn 上生成
});


@connect(({ operate }) => ({
    operate,
}))
@Form.create()
class WritingConfig extends Component {


    handleReset = () => {
        this.props.form.resetFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;

        this.props.form.validateFields((err, values) => {
            if (!err) {

                console.log('Received values of form: ', values);
                dispatch({
                    type:'operate/addConfig',
                    payload:values
                })

            };
        })

    }


render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div>
            <Form onSubmit={this.handleSubmit}>


                <Row>

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
                        <Button style={{ marginRight: 8, width: 120 }} onClick={this.handleReset}>
                            取消
                            </Button>
                        <Button style={{ width: 120 }} htmlType="submit" type="primary" onClick={this.save}>
                            保存
                            </Button>

                    </Col>


                </Row>

                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="设置中考日期:"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 11 }}
                        >
                            {getFieldDecorator('examDated', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <DatePicker />
                            )}
                        </Form.Item>

                    </Col>

                    <Col span={15}>
                        <Form.Item
                            label="倒计时文本(不超过12个字):"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 11 }}
                        >
                            {getFieldDecorator('timerTitle', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input placeholder='距离2019年福建中考' />
                            )}
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
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input placeholder='回复“1”' />
                            )}
                        </Form.Item>

                    </Col>

                    <Col span={15}>
                        <Form.Item
                            label="引流文本（不超过12个字):"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 11 }}
                        >
                            {getFieldDecorator('attractTitle', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input placeholder='领福利， 免费领取历年真题' />
                            )}
                        </Form.Item>

                    </Col>
                </Row>
            </Form>
        </div>

    )
}
}

export default WritingConfig;