import React, { Component, Fragment } from 'react';
import {
    Icon, Tabs, Table, Button, Modal, Breadcrumb, Form, Row, Col, Input,
    InputNumber,
    Radio,
    Card
} from 'antd';
import { connect } from 'dva';
import NavLink from 'umi/navlink';

import moment from 'moment';

import styles from './List.less';
import { create } from 'domain';
const { TabPane } = Tabs;
const confirm = Modal.confirm;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;





const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};


@Form.create()
class NewExam extends Component {

    onSubmitExam = () => {

    }


    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;



        return (
            <div className={styles.container}>

                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to="/exam/list">试卷管理</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/exam/newexam" activeStyle={{
                            color: "#1890FF"
                        }}>试卷管理</NavLink>

                    </Breadcrumb.Item>
                </Breadcrumb>

                <Form layout="horizontal" className={styles.examForm} >

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item   {...formItemLayout} label={'试卷名称'}>
                                {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: '请输入名称' },
                                    ],
                                })(<Input placeholder="
                                因果题型训练                     
                                6/18" />)}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item
                                labelCol={{ span: 12 }}
                                wrapperCol={{ span: 8 }}
                                label="难度系数*（顶级5分）"
                            >
                                {getFieldDecorator('input-number',
                                    {
                                        rules: [
                                            { required: true, message: '请输入名称' },
                                        ], initialValue: 3
                                    })(
                                        <InputNumber min={1} max={10} />
                                    )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item   {...formItemLayout} label={'专项选择'}>

                                <RadioGroup size="default" defaultValue="a">
                                    <RadioButton value="a">听力专项挑战</RadioButton>
                                    <RadioButton value="b">仿真模拟练习</RadioButton>
                                    <RadioButton value="c">历年真题闯关</RadioButton>
                                </RadioGroup>
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item>
                                <span style={{ marginRight: 20 }}>

                                    试卷总分：暂无
                                        </span>
                                该试卷音频总长：暂无
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" onClick={this.onSubmitExam}>
                                提交试卷
                            </Button>
                        </Col>

                    </Row>
                </Form>
                <Row gutter={24}>
                    <Col lg={11} md={24}>
                        <h2>
                            试卷预览
                        </h2>
                     {/* <div className={styles.examLeft}>


                        </div> */}
                        <Card className={styles.examLeft}>

                        </Card>
                    </Col>

                    <Col lg={12} md={24}>
                        <h2>
                            新增题目
                        </h2>
                        <div className={styles.examRight}>
                        <Form>

                        </Form>

                        </div>

                    </Col>
                </Row>
            </div>

        )
    }
}

export default NewExam;